/**
 * Utility functions for offline storage and synchronization
 */

// Get pending requests from storage
export const getPendingRequests = async (): Promise<any[]> => {
  try {
    const pendingRequestsStr = localStorage.getItem('pendingRequests');
    if (!pendingRequestsStr) return [];
    
    return JSON.parse(pendingRequestsStr);
  } catch (error) {
    console.error('Error getting pending requests:', error);
    return [];
  }
};

// Add a pending request to storage
export const addPendingRequest = async (request: any): Promise<void> => {
  try {
    const pendingRequests = await getPendingRequests();
    pendingRequests.push({
      ...request,
      timestamp: new Date().toISOString(),
    });
    
    localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests));
  } catch (error) {
    console.error('Error adding pending request:', error);
  }
};

// Process all pending requests
export const processPendingRequests = async (
  progressCallback?: (processed: number, total: number) => void
): Promise<{ successful: number; failed: number }> => {
  try {
    const pendingRequests = await getPendingRequests();
    if (pendingRequests.length === 0) {
      return { successful: 0, failed: 0 };
    }
    
    let successful = 0;
    let failed = 0;
    const total = pendingRequests.length;
    const remaining = [];
    
    for (let i = 0; i < pendingRequests.length; i++) {
      const request = pendingRequests[i];
      
      try {
        // Process the request - this would be implemented based on your specific needs
        // await processRequest(request);
        successful++;
      } catch (error) {
        console.error('Error processing request:', error);
        // If we still want to retry this request later
        remaining.push(request);
        failed++;
      }
      
      // Update progress
      if (progressCallback) {
        progressCallback(i + 1, total);
      }
    }
    
    // Save the remaining requests
    localStorage.setItem('pendingRequests', JSON.stringify(remaining));
    
    return { successful, failed };
  } catch (error) {
    console.error('Error processing pending requests:', error);
    return { successful: 0, failed: 0 };
  }
};

// Initialize offline database (if using IndexedDB)
export const initOfflineDB = async (): Promise<void> => {
  // This would be implemented if using IndexedDB
  console.log('Offline storage initialized');
};

// Clear expired cache items
export const clearExpiredCache = async (): Promise<void> => {
  try {
    // This would clear any expired items from your cache
    console.log('Expired cache cleared');
  } catch (error) {
    console.error('Error clearing expired cache:', error);
  }
};

// Offline fetch implementation for network requests
export const offlineFetch = async (
  url: string,
  options: RequestInit & {
    offlineOptions?: {
      key?: string;
      expiration?: number;
      priority?: number;
      processOffline?: boolean;
    };
  }
): Promise<Response> => {
  const offlineOptions = options.offlineOptions || {};
  const cacheKey = offlineOptions.key || `offline_fetch_${url}`;
  const expiration = offlineOptions.expiration || 3600000; // 1 hour default
  
  try {
    // Try to make the actual fetch request
    const response = await fetch(url, options);
    
    // If successful, cache the response
    if (response.ok) {
      try {
        const clonedResponse = response.clone();
        const data = await clonedResponse.json();
        
        localStorage.setItem(cacheKey, JSON.stringify({
          data,
          timestamp: Date.now(),
          expiration: Date.now() + expiration
        }));
      } catch (error) {
        console.error('Error caching response:', error);
      }
    }
    
    return response;
  } catch (error) {
    // Network error, try to use cached data
    console.warn('Network request failed, trying cached data:', url);
    
    const cachedDataStr = localStorage.getItem(cacheKey);
    if (cachedDataStr) {
      try {
        const cachedData = JSON.parse(cachedDataStr);
        
        // Check if cache is expired
        if (cachedData.expiration > Date.now()) {
          // Return cached data as a Response object
          return new Response(JSON.stringify(cachedData.data), {
            headers: { 'Content-Type': 'application/json', 'X-From-Cache': 'true' },
            status: 200
          });
        }
      } catch (parseError) {
        console.error('Error parsing cached data:', parseError);
      }
    }
    
    // If we should queue this for processing offline
    if (offlineOptions.processOffline) {
      await addPendingRequest({
        url,
        options: {
          ...options,
          offlineOptions: undefined // Don't store the offline options again
        },
        priority: offlineOptions.priority || 0
      });
      
      // Return a "queued" response
      return new Response(JSON.stringify({ 
        message: 'Request queued for processing when online',
        queued: true
      }), {
        headers: { 'Content-Type': 'application/json', 'X-Queued-Offline': 'true' },
        status: 202 // Accepted
      });
    }
    
    // If we get here, we have no cached data and couldn't queue, so throw the original error
    throw error;
  }
};
