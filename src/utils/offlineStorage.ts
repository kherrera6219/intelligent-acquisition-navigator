
import { openDB, IDBPDatabase } from 'idb';

// Constants
const DB_NAME = 'offlineStorage';
const DB_VERSION = 1;
const CACHE_STORE = 'cache';
const PENDING_STORE = 'pendingRequests';

// Database setup
let dbPromise: Promise<IDBPDatabase>;

// Initialize the database
export const initOfflineDB = async () => {
  try {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create cache store if it doesn't exist
        if (!db.objectStoreNames.contains(CACHE_STORE)) {
          const cacheStore = db.createObjectStore(CACHE_STORE, { keyPath: 'key' });
          cacheStore.createIndex('expiresAt', 'expiresAt');
        }
        
        // Create pending requests store if it doesn't exist
        if (!db.objectStoreNames.contains(PENDING_STORE)) {
          const pendingStore = db.createObjectStore(PENDING_STORE, { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          pendingStore.createIndex('timestamp', 'timestamp');
        }
      }
    });
    return true;
  } catch (error) {
    console.error('Failed to initialize offline database:', error);
    return false;
  }
};

// Cache a response
export const cacheResponse = async (key: string, data: any, maxAge: number = 3600000) => {
  try {
    const db = await dbPromise;
    const expiresAt = Date.now() + maxAge;
    
    await db.put(CACHE_STORE, {
      key,
      data,
      expiresAt
    });
    
    return true;
  } catch (error) {
    console.error('Failed to cache response:', error);
    return false;
  }
};

// Get a cached response
export const getCachedResponse = async (key: string) => {
  try {
    const db = await dbPromise;
    const item = await db.get(CACHE_STORE, key);
    
    if (!item) return null;
    
    // Check if the cached item has expired
    if (item.expiresAt < Date.now()) {
      await db.delete(CACHE_STORE, key);
      return null;
    }
    
    return item.data;
  } catch (error) {
    console.error('Failed to get cached response:', error);
    return null;
  }
};

// Queue a request for offline processing
export const queueRequest = async (
  url: string, 
  method: string, 
  body?: any, 
  headers?: HeadersInit
) => {
  try {
    const db = await dbPromise;
    
    const request = {
      url,
      method,
      body,
      headers,
      timestamp: Date.now()
    };
    
    await db.add(PENDING_STORE, request);
    return true;
  } catch (error) {
    console.error('Failed to queue request:', error);
    return false;
  }
};

// Get all pending requests
export const getPendingRequests = async () => {
  try {
    const db = await dbPromise;
    return await db.getAll(PENDING_STORE);
  } catch (error) {
    console.error('Failed to get pending requests:', error);
    return [];
  }
};

// Process all pending requests
export const processPendingRequests = async () => {
  const results = { successful: 0, failed: 0 };
  
  try {
    const db = await dbPromise;
    const pendingRequests = await db.getAll(PENDING_STORE);
    
    // Process each request
    for (const request of pendingRequests) {
      try {
        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: request.body ? JSON.stringify(request.body) : undefined
        });
        
        if (response.ok) {
          // Request successful, remove from queue
          await db.delete(PENDING_STORE, request.id);
          results.successful++;
        } else {
          // Request failed
          results.failed++;
          console.error('Failed to process pending request:', response.statusText);
        }
      } catch (error) {
        results.failed++;
        console.error('Error processing pending request:', error);
      }
    }
    
    return results;
  } catch (error) {
    console.error('Failed to process pending requests:', error);
    return results;
  }
};

// Clear all expired cache items
export const clearExpiredCache = async () => {
  try {
    const db = await dbPromise;
    const now = Date.now();
    
    // Use a cursor to efficiently delete expired items
    const tx = db.transaction(CACHE_STORE, 'readwrite');
    const store = tx.objectStore(CACHE_STORE);
    const expiryIndex = store.index('expiresAt');
    
    let cursor = await expiryIndex.openCursor(IDBKeyRange.upperBound(now));
    let deletedCount = 0;
    
    // Delete all expired items
    while (cursor) {
      await cursor.delete();
      deletedCount++;
      cursor = await cursor.continue();
    }
    
    await tx.done;
    return deletedCount;
  } catch (error) {
    console.error('Failed to clear expired cache:', error);
    return 0;
  }
};

// Clear all data (for testing/debugging)
export const clearAllData = async () => {
  try {
    const db = await dbPromise;
    await db.clear(CACHE_STORE);
    await db.clear(PENDING_STORE);
    return true;
  } catch (error) {
    console.error('Failed to clear all data:', error);
    return false;
  }
};
