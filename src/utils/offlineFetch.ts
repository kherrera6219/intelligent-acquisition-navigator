
import { addPendingRequest, getCachedResponse, cacheResponse } from '@/utils/offlineStorage';

interface OfflineOptions {
  cacheKey?: string;
  cacheMaxAge?: number;
  offlinePriority?: number;
  bypassCache?: boolean;
  processOffline?: boolean;
}

/**
 * Enhanced fetch with offline support
 * - Caches successful responses
 * - Returns cached responses when offline
 * - Queues requests for later when offline
 */
export const offlineFetch = async (
  url: RequestInfo,
  options: RequestInit & { offlineOptions?: OfflineOptions } = {}
): Promise<Response> => {
  const {
    offlineOptions = {},
    ...fetchOptions
  } = options;

  const {
    cacheKey = typeof url === 'string' ? url : url.url,
    cacheMaxAge = 3600000, // 1 hour default
    offlinePriority = 0,
    bypassCache = false,
    processOffline = true
  } = offlineOptions;

  // Try to get from cache first (unless bypass is set)
  if (!bypassCache) {
    const cachedData = await getCachedResponse(cacheKey);
    if (cachedData) {
      // Return cached response
      return new Response(JSON.stringify(cachedData.body), {
        status: cachedData.status,
        statusText: cachedData.statusText,
        headers: cachedData.headers
      });
    }
  }

  try {
    // Try the actual network request
    const response = await fetch(url, fetchOptions);
    
    // Only cache successful responses
    if (response.ok) {
      // Clone the response as it can only be consumed once
      const clonedResponse = response.clone();
      
      // Cache the response data
      const responseData = {
        body: await clonedResponse.json(),
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
        headers: Object.fromEntries(clonedResponse.headers.entries())
      };
      
      await cacheResponse(cacheKey, responseData, cacheMaxAge);
    }
    
    return response;
  } catch (error) {
    // Assume it's a network error
    console.error('Network request failed:', error);
    
    // Try to get from cache as a fallback
    const cachedData = await getCachedResponse(cacheKey);
    if (cachedData) {
      // Return cached response with a custom header indicating it's from cache
      return new Response(JSON.stringify(cachedData.body), {
        status: cachedData.status,
        statusText: cachedData.statusText,
        headers: {
          ...cachedData.headers,
          'X-From-Cache': 'true'
        }
      });
    }
    
    // If processOffline is true, queue the request for later processing
    if (processOffline) {
      await addPendingRequest(url, fetchOptions, offlinePriority);
    }
    
    // No cached data and offline, throw error
    throw new Error('Network request failed and no cached data available');
  }
};
