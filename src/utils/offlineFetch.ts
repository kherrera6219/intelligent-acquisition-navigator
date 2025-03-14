
import { addPendingRequest } from './offlineStorage';

// Wrapper around fetch that tracks failed requests when offline
export const offlineFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  try {
    const response = await fetch(input, init);
    return response;
  } catch (error) {
    // If fetch failed and we're offline, store the request for later
    if (!navigator.onLine) {
      // Handle different types of input to get the URL string
      const url = typeof input === 'string' 
        ? input 
        : input instanceof Request 
          ? input.url 
          : input.toString();
      
      await addPendingRequest({
        url,
        method: init?.method || 'GET',
        body: init?.body ? JSON.parse(init.body.toString()) : undefined,
        headers: init?.headers ? Object.fromEntries(new Headers(init.headers).entries()) : undefined
      });
      
      throw new Error('Request failed: you are offline. Request has been saved for later synchronization.');
    }
    
    throw error;
  }
};

// For GET requests that should use cached data when offline
export const fetchWithOfflineSupport = async <T>(
  url: string,
  options?: RequestInit & { 
    cacheKey?: string;
    fallbackData?: T;
  }
): Promise<T> => {
  // Use the URL as the cache key if none is provided
  const cacheKey = options?.cacheKey || url;
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache the successful response
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    
    return data;
  } catch (error) {
    // If we're offline, try to use cached data
    if (!navigator.onLine) {
      const cachedResponse = localStorage.getItem(cacheKey);
      
      if (cachedResponse) {
        const { data } = JSON.parse(cachedResponse);
        return data;
      }
      
      // If we have fallback data, use it
      if (options?.fallbackData) {
        return options.fallbackData;
      }
    }
    
    // Re-throw the error if we can't handle it
    throw error;
  }
};
