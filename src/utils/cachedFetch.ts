
import { cacheResponse, getCachedResponse } from './offlineStorage';

/**
 * Performs a network request with caching capabilities
 */
export const cachedFetch = async <T>(
  url: string,
  options: RequestInit & {
    cacheKey?: string;
    cacheMaxAge?: number; // milliseconds
    bypassCache?: boolean;
  } = {}
): Promise<T> => {
  const {
    cacheKey = url,
    cacheMaxAge = 3600000, // 1 hour default
    bypassCache = false,
    ...fetchOptions
  } = options;

  // Try to get from cache if not bypassing
  if (!bypassCache) {
    const cachedData = await getCachedResponse(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }

  // Perform network request
  const response = await fetch(url, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
  }
  
  // Parse response
  const data = await response.json();
  
  // Cache the response
  await cacheResponse(cacheKey, data, cacheMaxAge);
  
  return data as T;
};
