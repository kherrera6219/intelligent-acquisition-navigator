import { globalRateLimiter } from './rateLimit';

type FetchOptions = RequestInit & {
  retries?: number;
  retryDelay?: number;
  offlineFallback?: boolean;
  cacheKey?: string;
};

type CachedResponse = {
  data: any;
  timestamp: number;
  headers: Record<string, string>;
  status: number;
};

const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour
const OFFLINE_STORAGE_KEY = 'offline_data_cache';

// Load the cache from localStorage
const loadCache = (): Record<string, CachedResponse> => {
  try {
    const cache = localStorage.getItem(OFFLINE_STORAGE_KEY);
    return cache ? JSON.parse(cache) : {};
  } catch (error) {
    console.error('Failed to load offline cache:', error);
    return {};
  }
};

// Save the cache to localStorage
const saveCache = (cache: Record<string, CachedResponse>) => {
  try {
    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to save offline cache:', error);
    // If storage is full, clear old items
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      cleanCache();
    }
  }
};

// Clean old or excessive items from cache
const cleanCache = () => {
  const cache = loadCache();
  const now = Date.now();
  const entries = Object.entries(cache);
  
  // Remove expired entries
  const filtered = entries.filter(([_, value]) => now - value.timestamp < CACHE_EXPIRY);
  
  // If still too many entries, keep only the most recent ones
  if (filtered.length > 100) {
    filtered.sort((a, b) => b[1].timestamp - a[1].timestamp);
    filtered.splice(100);
  }
  
  saveCache(Object.fromEntries(filtered));
};

// Cache a response
const cacheResponse = (key: string, response: Response, data: any) => {
  const cache = loadCache();
  
  // Extract headers to store
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  
  cache[key] = {
    data,
    timestamp: Date.now(),
    headers,
    status: response.status
  };
  
  saveCache(cache);
};

// Check if response exists in cache and is valid
const getCachedResponse = (key: string): CachedResponse | null => {
  const cache = loadCache();
  const cachedResponse = cache[key];
  
  if (!cachedResponse) return null;
  
  // Check if cache is expired
  if (Date.now() - cachedResponse.timestamp > CACHE_EXPIRY) {
    // Remove expired entry
    delete cache[key];
    saveCache(cache);
    return null;
  }
  
  return cachedResponse;
};

/**
 * Fetch function with offline support, caching, and retry capability
 */
export async function offlineFetch<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const {
    retries = 3,
    retryDelay = 1000,
    offlineFallback = true,
    cacheKey = url,
    ...fetchOptions
  } = options;
  
  // Apply rate limiting
  if (!globalRateLimiter.check(`fetch:${url}`)) {
    throw new Error('Rate limit exceeded for this request.');
  }
  
  // Check for online status
  const isOnline = navigator.onLine;
  
  // If offline and fallback enabled, try to return cached data
  if (!isOnline && offlineFallback) {
    const cachedResponse = getCachedResponse(cacheKey);
    if (cachedResponse) {
      console.log(`[OfflineFetch] Using cached data for ${url}`);
      return cachedResponse.data as T;
    }
    throw new Error('You are offline and no cached data is available.');
  }
  
  // If we're online, attempt to fetch with retries
  let lastError: Error;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Wait before retrying, except for first attempt
      if (attempt > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
      
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      
      // Clone the response before reading it
      const clonedResponse = response.clone();
      const data = await response.json();
      
      // Cache successful responses for offline use
      if (offlineFallback) {
        cacheResponse(cacheKey, clonedResponse, data);
      }
      
      return data as T;
    } catch (error) {
      console.error(`[OfflineFetch] Attempt ${attempt + 1}/${retries + 1} failed:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // If we're now offline, check cache before continuing retries
      if (!navigator.onLine && offlineFallback) {
        const cachedResponse = getCachedResponse(cacheKey);
        if (cachedResponse) {
          console.log(`[OfflineFetch] Falling back to cached data for ${url}`);
          return cachedResponse.data as T;
        }
      }
    }
  }
  
  // If all retries failed, throw the last error
  throw lastError!;
}

// Function to clear the entire cache (useful for debugging or user-triggered cache clearing)
export function clearOfflineCache(): void {
  localStorage.removeItem(OFFLINE_STORAGE_KEY);
}

// Function to get cache stats for debugging
export function getOfflineCacheStats(): { size: number, entries: number, oldestEntry: Date | null } {
  const cache = loadCache();
  const entries = Object.values(cache);
  
  if (entries.length === 0) {
    return { size: 0, entries: 0, oldestEntry: null };
  }
  
  const oldest = Math.min(...entries.map(e => e.timestamp));
  
  return {
    size: new Blob([JSON.stringify(cache)]).size,
    entries: entries.length,
    oldestEntry: new Date(oldest)
  };
}
