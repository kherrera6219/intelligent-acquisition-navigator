
import { cacheResponse, getCachedResponse } from './offlineStorage';

// Utility function to fetch with caching
export async function cachedFetch<T>(
  url: string,
  options: RequestInit & {
    cacheKey?: string;
    cacheMaxAge?: number;
  } = {}
): Promise<T> {
  const {
    cacheKey = url,
    cacheMaxAge = 3600000, // Default 1 hour
    ...fetchOptions
  } = options;

  // Try to get from cache first
  const cachedData = await getCachedResponse(cacheKey);
  if (cachedData) {
    return cachedData as T;
  }

  // Perform the fetch
  const response = await fetch(url, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  // Parse and cache the response
  const data = await response.json();
  await cacheResponse(cacheKey, data, cacheMaxAge);
  
  return data as T;
}
