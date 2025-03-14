
import { savePendingRequest, getCachedItem, setCachedItem } from './offlineStorage';

export const offlineFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit & { 
    offlineOptions?: { 
      cacheTTL?: number; 
      allowOfflineStorage?: boolean;
    } 
  }
): Promise<Response> => {
  const request = new Request(input, init);
  const requestUrl = typeof input === 'string' ? input : input instanceof Request ? input.url : input.toString();
  
  try {
    // Try to perform the fetch as normal
    const response = await fetch(request);
    
    // If the fetch is successful, cache it if options allow
    if (response.ok && init?.offlineOptions?.allowOfflineStorage) {
      const clonedResponse = response.clone();
      const responseData = await clonedResponse.json();
      
      await setCachedItem(
        requestUrl,
        {
          data: responseData,
          headers: Object.fromEntries(response.headers.entries()),
          status: response.status,
          statusText: response.statusText
        },
        init.offlineOptions.cacheTTL
      );
    }
    
    return response;
  } catch (error) {
    // If the fetch fails, check if there's a cached response
    const cachedResponse = await getCachedItem(requestUrl);
    
    if (cachedResponse) {
      return new Response(JSON.stringify(cachedResponse.data), {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: new Headers(cachedResponse.headers)
      });
    }
    
    // If it's a POST/PUT/DELETE request, save it for later
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method) && 
        init?.offlineOptions?.allowOfflineStorage) {
      await savePendingRequest({
        url: requestUrl,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
        body: init.body,
        timestamp: Date.now()
      });
    }
    
    // Throw the original error or return an offline response
    throw new Error('Network request failed. The request has been saved and will be sent when online.');
  }
};
