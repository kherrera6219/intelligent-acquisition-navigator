
/**
 * Offline Storage Utilities
 * Provides functionality for caching data and handling offline operations
 */

import { openDB } from 'idb';

// Database name and version
const DB_NAME = 'app_offline_db';
const DB_VERSION = 1;

// Store names
const REQUESTS_STORE = 'pending_requests';
const CACHE_STORE = 'response_cache';
const USER_DATA_STORE = 'user_data';

// Initialize the database
export async function initOfflineDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Store for pending API requests that will be sent when back online
      if (!db.objectStoreNames.contains(REQUESTS_STORE)) {
        db.createObjectStore(REQUESTS_STORE, { keyPath: 'id', autoIncrement: true });
      }
      
      // Store for cached API responses
      if (!db.objectStoreNames.contains(CACHE_STORE)) {
        const store = db.createObjectStore(CACHE_STORE, { keyPath: 'url' });
        store.createIndex('timestamp', 'timestamp');
      }
      
      // Store for user data that needs to persist offline
      if (!db.objectStoreNames.contains(USER_DATA_STORE)) {
        db.createObjectStore(USER_DATA_STORE, { keyPath: 'key' });
      }
    }
  });
}

// Cache an API response
export async function cacheResponse(url: string, data: any, maxAge: number = 3600000) { // Default 1 hour
  const db = await initOfflineDB();
  const timestamp = Date.now();
  await db.put(CACHE_STORE, { url, data, timestamp, maxAge });
}

// Get a cached response (if valid)
export async function getCachedResponse(url: string): Promise<any | null> {
  try {
    const db = await initOfflineDB();
    const cachedItem = await db.get(CACHE_STORE, url);
    
    if (!cachedItem) return null;
    
    // Check if the cached item is still valid
    const currentTime = Date.now();
    if (currentTime - cachedItem.timestamp > cachedItem.maxAge) {
      // Remove expired item
      await db.delete(CACHE_STORE, url);
      return null;
    }
    
    return cachedItem.data;
  } catch (error) {
    console.error('Error retrieving cached response:', error);
    return null;
  }
}

// Save a pending request to be processed when online
export async function savePendingRequest(request: {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
  priority?: number;
}): Promise<number> {
  const db = await initOfflineDB();
  return db.add(REQUESTS_STORE, {
    ...request,
    createdAt: Date.now(),
    priority: request.priority || 0
  });
}

// Get all pending requests
export async function getPendingRequests(): Promise<any[]> {
  const db = await initOfflineDB();
  return db.getAll(REQUESTS_STORE);
}

// Remove a pending request after it's processed
export async function removePendingRequest(id: number): Promise<void> {
  const db = await initOfflineDB();
  await db.delete(REQUESTS_STORE, id);
}

// Clear expired cache entries
export async function clearExpiredCache(): Promise<number> {
  const db = await initOfflineDB();
  const currentTime = Date.now();
  let deletedCount = 0;
  
  const tx = db.transaction(CACHE_STORE, 'readwrite');
  const store = tx.objectStore(CACHE_STORE);
  const index = store.index('timestamp');
  
  let cursor = await index.openCursor();
  
  while (cursor) {
    const item = cursor.value;
    if (currentTime - item.timestamp > item.maxAge) {
      await cursor.delete();
      deletedCount++;
    }
    cursor = await cursor.continue();
  }
  
  await tx.done;
  return deletedCount;
}

// Store user data for offline access
export async function storeUserData(key: string, data: any): Promise<void> {
  const db = await initOfflineDB();
  await db.put(USER_DATA_STORE, { key, data, updatedAt: Date.now() });
}

// Get user data
export async function getUserData(key: string): Promise<any | null> {
  try {
    const db = await initOfflineDB();
    const item = await db.get(USER_DATA_STORE, key);
    return item ? item.data : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
}

// Delete user data
export async function deleteUserData(key: string): Promise<void> {
  const db = await initOfflineDB();
  await db.delete(USER_DATA_STORE, key);
}

// Process offline actions when online
export async function processPendingRequests(
  progressCallback?: (processed: number, total: number) => void
): Promise<{
  successful: number;
  failed: number;
  errors: Error[];
}> {
  const result = { successful: 0, failed: 0, errors: [] as Error[] };
  const db = await initOfflineDB();
  const pendingRequests = await getPendingRequests();
  
  // Sort by priority then creation time
  pendingRequests.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // Higher priority first
    }
    return a.createdAt - b.createdAt; // Older requests first
  });
  
  const total = pendingRequests.length;
  
  for (let i = 0; i < pendingRequests.length; i++) {
    const request = pendingRequests[i];
    
    try {
      // Process the pending request
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body ? JSON.stringify(request.body) : undefined
      });
      
      if (response.ok) {
        result.successful++;
        await removePendingRequest(request.id);
      } else {
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      result.failed++;
      result.errors.push(error as Error);
      
      // Only remove the request if it's not a network error (which might mean we're offline again)
      if (!(error instanceof TypeError && error.message.includes('network'))) {
        await removePendingRequest(request.id);
      }
    }
    
    if (progressCallback) {
      progressCallback(i + 1, total);
    }
  }
  
  return result;
}

// Enhanced fetch function that works offline
export async function offlineFetch(
  url: string,
  options: RequestInit & { 
    cacheMaxAge?: number;
    offlinePriority?: number; 
    bypassCache?: boolean;
  } = {}
): Promise<Response> {
  const { 
    cacheMaxAge = 3600000, // Default 1 hour cache
    offlinePriority = 0,
    bypassCache = false,
    ...fetchOptions 
  } = options;
  
  // Try fetching online first
  try {
    const response = await fetch(url, fetchOptions);
    
    // If successful, cache the response for offline use
    if (response.ok && response.status !== 204 && !bypassCache) {
      const clonedResponse = response.clone();
      const responseData = await clonedResponse.json();
      await cacheResponse(url, responseData, cacheMaxAge);
    }
    
    return response;
  } catch (error) {
    // If offline or network error, try to return cached data
    const isNetworkError = error instanceof TypeError && error.message.includes('network');
    
    if (isNetworkError) {
      // Check if we have a cached response
      const cachedData = await getCachedResponse(url);
      
      if (cachedData && !bypassCache) {
        // Create a mock successful response from the cached data
        const mockResponse = new Response(JSON.stringify(cachedData), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'X-From-Cache': 'true' }
        });
        
        return mockResponse;
      }
      
      // Store the request to be processed when back online
      // Only for non-GET requests that modify data
      const method = (fetchOptions.method || 'GET').toUpperCase();
      if (method !== 'GET' && method !== 'HEAD') {
        await savePendingRequest({
          url,
          method,
          headers: fetchOptions.headers ? Object.entries(fetchOptions.headers).reduce((obj, [key, value]) => {
            obj[key] = value as string;
            return obj;
          }, {} as Record<string, string>) : {},
          body: fetchOptions.body,
          priority: offlinePriority
        });
      }
    }
    
    // Re-throw the error
    throw error;
  }
}
