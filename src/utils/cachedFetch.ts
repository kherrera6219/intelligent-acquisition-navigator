
/**
 * Cached fetch utility for improved data fetching with caching
 */
import { offlineFetch, setFailedRequest, getFailedRequests } from './offlineFetch';
import { createOptimisticUpdate, updateOptimisticStatus } from './optimisticUpdates';

// Cache storage
const cache = new Map<string, {
  data: any;
  timestamp: number;
  expiresAt: number;
}>();

// Configuration for cache
export interface CacheConfig {
  cacheKey?: string;
  cacheTtl?: number; // Time to live in milliseconds
  forceRefresh?: boolean;
  offlineFallback?: boolean;
  retryCount?: number;
  resourceType?: string;
}

const DEFAULT_CACHE_TTL = 1000 * 60 * 5; // 5 minutes default

/**
 * Enhanced fetch with caching, offline support, and optimistic updates
 */
export async function cachedFetch<T = any>(
  url: string,
  options: RequestInit = {},
  cacheConfig: CacheConfig = {}
): Promise<T> {
  const {
    cacheKey = url,
    cacheTtl = DEFAULT_CACHE_TTL,
    forceRefresh = false,
    offlineFallback = true,
    retryCount = 3,
    resourceType = url.split('/').pop() || 'unknown',
  } = cacheConfig;

  // Check cache first if not forced to refresh
  if (!forceRefresh) {
    const cachedData = cache.get(cacheKey);
    if (cachedData && cachedData.expiresAt > Date.now()) {
      return cachedData.data;
    }
  }

  // For POST/PUT/DELETE operations, create optimistic update
  let optimisticUpdateId;
  const method = (options.method || 'GET').toUpperCase();
  const isWrite = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

  if (isWrite) {
    const action = method === 'POST' 
      ? 'create' 
      : method === 'DELETE' 
        ? 'delete' 
        : 'update';
    
    const resourceId = method !== 'POST' 
      ? url.split('/').pop() 
      : undefined;
    
    const body = options.body ? JSON.parse(options.body as string) : undefined;
    
    const update = createOptimisticUpdate(
      resourceType,
      action,
      resourceId,
      undefined, // Original data not available here
      body
    );
    
    optimisticUpdateId = update.id;
  }

  try {
    // Try to fetch data with offline capability
    const response = await offlineFetch(url, {
      ...options,
      retryCount,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Cache the successful response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + cacheTtl,
    });

    // Update optimistic status if applicable
    if (optimisticUpdateId) {
      updateOptimisticStatus(optimisticUpdateId, 'success');
    }

    return data;
  } catch (error) {
    // If offline and we have cached data, use it
    if (!navigator.onLine && offlineFallback) {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        console.log(`Using cached data for ${cacheKey} while offline`);
        return cachedData.data;
      }
    }

    // Update optimistic status if applicable
    if (optimisticUpdateId) {
      updateOptimisticStatus(optimisticUpdateId, 'error', error as Error);
    }

    // For write operations, queue failed request
    if (isWrite) {
      setFailedRequest(url, options);
    }

    throw error;
  }
}

/**
 * Clear a specific item from cache
 */
export function clearCache(key: string): void {
  cache.delete(key);
}

/**
 * Clear all items from cache
 */
export function clearAllCache(): void {
  cache.clear();
}

/**
 * Clear expired items from cache
 */
export function clearExpiredCache(): void {
  const now = Date.now();
  Array.from(cache.entries()).forEach(([key, value]) => {
    if (value.expiresAt < now) {
      cache.delete(key);
    }
  });
}

/**
 * Prefetch and cache data for a URL
 */
export async function prefetchData(
  url: string,
  options: RequestInit = {},
  cacheTtl = DEFAULT_CACHE_TTL
): Promise<void> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) return;

    const data = await response.json();
    
    cache.set(url, {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + cacheTtl,
    });
  } catch (error) {
    console.error('Prefetch error:', error);
  }
}
