
/**
 * Enhanced offline fetch utility with retry and background sync
 */
import { openDB, IDBPDatabase } from 'idb';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

// Interface for failed request
interface FailedRequest {
  id: string;
  url: string;
  options: RequestInit;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}

// Database name and store
const DB_NAME = 'offline-cache';
const STORE_NAME = 'failed-requests';
const CACHE_STORE = 'response-cache';

// Initialize the database
async function getDB(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      // Create failed requests store
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
      
      // Create response cache store
      if (!db.objectStoreNames.contains(CACHE_STORE)) {
        db.createObjectStore(CACHE_STORE, { keyPath: 'url' });
      }
    },
  });
}

/**
 * Store a failed request for later retry
 */
export async function setFailedRequest(
  url: string,
  options: RequestInit,
  maxRetries: number = 3
): Promise<string> {
  const db = await getDB();
  
  // Create a unique ID for the request
  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  
  // Store the request in IndexedDB
  const request: FailedRequest = {
    id,
    url,
    options: {
      ...options,
      // Clone the body since it might be a stream
      body: options.body ? JSON.stringify(options.body) : undefined,
    },
    timestamp: Date.now(),
    retryCount: 0,
    maxRetries,
  };
  
  await db.put(STORE_NAME, request);
  
  // Schedule background sync if available
  if ('serviceWorker' in navigator && 'sync' in window.registration) {
    try {
      await window.registration.sync.register('sync-failed-requests');
    } catch (error) {
      console.error('Background sync registration failed:', error);
    }
  }
  
  return id;
}

/**
 * Get all failed requests
 */
export async function getFailedRequests(): Promise<FailedRequest[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

/**
 * Delete a failed request
 */
export async function deleteFailedRequest(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

/**
 * Retry a failed request
 */
export async function retryFailedRequest(request: FailedRequest): Promise<boolean> {
  try {
    // Check if network is available
    if (!navigator.onLine) {
      return false;
    }
    
    // Update retry count
    request.retryCount += 1;
    
    // Check if max retries reached
    if (request.retryCount > request.maxRetries) {
      await deleteFailedRequest(request.id);
      return false;
    }
    
    // Update the request in the database
    const db = await getDB();
    await db.put(STORE_NAME, request);
    
    // Retry the request
    const response = await fetch(request.url, {
      ...request.options,
      // Recreate the body if it was stringified
      body: request.options.body,
    });
    
    // If successful, remove from queue
    if (response.ok) {
      await deleteFailedRequest(request.id);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error retrying request:', error);
    return false;
  }
}

/**
 * Retry all failed requests
 */
export async function retryAllFailedRequests(): Promise<void> {
  const failedRequests = await getFailedRequests();
  
  await Promise.all(
    failedRequests.map(request => retryFailedRequest(request))
  );
}

/**
 * Cache a response
 */
export async function cacheResponse(url: string, response: Response): Promise<void> {
  const db = await getDB();
  
  try {
    const clonedResponse = response.clone();
    const responseData = await clonedResponse.json();
    
    await db.put(CACHE_STORE, {
      url,
      data: responseData,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error caching response:', error);
  }
}

/**
 * Get a cached response
 */
export async function getCachedResponse(url: string): Promise<any | null> {
  const db = await getDB();
  
  try {
    const cachedResponse = await db.get(CACHE_STORE, url);
    return cachedResponse?.data || null;
  } catch (error) {
    console.error('Error getting cached response:', error);
    return null;
  }
}

/**
 * Fetch with offline support and automatic retries
 */
export async function offlineFetch(
  url: string,
  options: RequestInit & { retryCount?: number } = {}
): Promise<Response> {
  const { retryCount = 3, ...fetchOptions } = options;
  
  // Try to fetch
  try {
    const response = await fetch(url, fetchOptions);
    
    // Cache successful GET responses
    if (response.ok && (fetchOptions.method || 'GET') === 'GET') {
      await cacheResponse(url, response);
    }
    
    return response;
  } catch (error) {
    // If offline and it's a GET request, try to serve from cache
    if (!navigator.onLine && (fetchOptions.method || 'GET') === 'GET') {
      const cachedData = await getCachedResponse(url);
      
      if (cachedData) {
        // Create a synthetic response from cached data
        return new Response(JSON.stringify(cachedData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    
    // For write operations, queue for retry later
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes((fetchOptions.method || 'GET').toUpperCase())) {
      await setFailedRequest(url, fetchOptions, retryCount);
    }
    
    throw error;
  }
}

/**
 * Hook to sync failed requests when coming back online
 */
export function useOfflineSync() {
  const isOnline = useNetworkStatus();
  
  React.useEffect(() => {
    let syncTimeout: NodeJS.Timeout;
    
    // When coming back online, retry failed requests
    if (isOnline) {
      // Debounce to avoid multiple syncs
      syncTimeout = setTimeout(() => {
        retryAllFailedRequests().catch(console.error);
      }, 1000);
    }
    
    return () => {
      if (syncTimeout) clearTimeout(syncTimeout);
    };
  }, [isOnline]);
}

// Register event listener for online status
window.addEventListener('online', () => {
  retryAllFailedRequests().catch(console.error);
});

// Auto-retry logic (if service worker is active, this helps process background syncs)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    // Store registration globally for sync
    (window as any).registration = registration;
    
    // Add listener for sync event
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'retry-failed-requests') {
        retryAllFailedRequests().catch(console.error);
      }
    });
  });
}
