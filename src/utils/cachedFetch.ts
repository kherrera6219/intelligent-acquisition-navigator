
import { initOfflineDB, setCachedItem, getCachedItem } from './offlineStorage';

interface CachedFetchOptions {
  cacheKey: string;
  cacheMaxAge?: number;
  bypassCache?: boolean;
  data?: any; // For saving data to cache
}

/**
 * Retrieves or stores data in cache (IndexedDB)
 * Can be used either to get cached data or to store new data
 */
export const cachedFetch = async <T>(
  key: string,
  options: CachedFetchOptions
): Promise<T | null> => {
  const {
    cacheKey,
    cacheMaxAge = 3600000, // 1 hour default
    bypassCache = false,
    data
  } = options;

  // If data is provided, store it in cache
  if (data) {
    await setCachedItem(cacheKey, {
      data,
      timestamp: Date.now()
    });
    return data as T;
  }

  // If we're bypassing cache, return null
  if (bypassCache) {
    return null;
  }

  // Check if we have cached data
  const cached = await getCachedItem(cacheKey);
  if (!cached) {
    return null;
  }

  // Check if cache is still valid
  const now = Date.now();
  if (cached.expires && (now > cached.expires)) {
    return null; // Cache is expired
  }

  return cached.value as T;
};
