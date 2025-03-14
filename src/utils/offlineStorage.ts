
import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'offlineStorage';
const DB_VERSION = 1;
const CACHE_STORE = 'cache';
const PENDING_REQUESTS_STORE = 'pendingRequests';

let db: IDBPDatabase | null = null;

// Initialize IndexedDB for offline storage
export const initOfflineDB = async (): Promise<IDBPDatabase> => {
  if (db) return db;

  db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      // Create cache store if it doesn't exist
      if (!database.objectStoreNames.contains(CACHE_STORE)) {
        database.createObjectStore(CACHE_STORE, { keyPath: 'key' });
      }
      
      // Create pending requests store if it doesn't exist
      if (!database.objectStoreNames.contains(PENDING_REQUESTS_STORE)) {
        database.createObjectStore(PENDING_REQUESTS_STORE, { 
          keyPath: 'id',
          autoIncrement: true 
        });
      }
    },
  });

  return db;
};

// Get an item from the cache
export const getCachedItem = async (key: string): Promise<any> => {
  try {
    const database = await initOfflineDB();
    const item = await database.get(CACHE_STORE, key);
    
    if (!item) return null;

    return item;
  } catch (error) {
    console.error('Error getting cached item:', error);
    return null;
  }
};

// Store an item in the cache
export const setCachedItem = async (key: string, value: any, expiresIn: number = 86400000): Promise<void> => {
  try {
    const database = await initOfflineDB();
    const expiryTime = expiresIn > 0 ? Date.now() + expiresIn : null;
    
    await database.put(CACHE_STORE, {
      key,
      value,
      expires: expiryTime,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error setting cached item:', error);
  }
};

// Check if data exists
export const hasCachedItem = async (key: string): Promise<boolean> => {
  try {
    const database = await initOfflineDB();
    const item = await database.get(CACHE_STORE, key);
    return !!item;
  } catch (error) {
    console.error('Error checking if data exists:', error);
    return false;
  }
};

// Clear expired cache items
export const clearExpiredCache = async (): Promise<void> => {
  try {
    const database = await initOfflineDB();
    const transaction = database.transaction(CACHE_STORE, 'readwrite');
    const store = transaction.objectStore(CACHE_STORE);
    const items = await store.getAll();
    
    const now = Date.now();
    const expiredItems = items.filter(item => item.expires && item.expires < now);
    
    for (const item of expiredItems) {
      await store.delete(item.key);
    }
    
    await transaction.done;
  } catch (error) {
    console.error('Error clearing expired cache:', error);
  }
};

// Save a pending request for later processing
export const savePendingRequest = async (request: any): Promise<void> => {
  try {
    const database = await initOfflineDB();
    await database.add(PENDING_REQUESTS_STORE, {
      ...request,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error saving pending request:', error);
  }
};

// Get all pending requests
export const getPendingRequests = async (): Promise<any[]> => {
  try {
    const database = await initOfflineDB();
    return database.getAll(PENDING_REQUESTS_STORE);
  } catch (error) {
    console.error('Error getting pending requests:', error);
    return [];
  }
};

// Delete a pending request
export const deletePendingRequest = async (id: number): Promise<void> => {
  try {
    const database = await initOfflineDB();
    await database.delete(PENDING_REQUESTS_STORE, id);
  } catch (error) {
    console.error('Error deleting pending request:', error);
  }
};

// Process all pending requests
export const processPendingRequests = async (processFunction: (request: any) => Promise<void>): Promise<void> => {
  try {
    const requests = await getPendingRequests();
    
    for (const request of requests) {
      try {
        await processFunction(request);
        await deletePendingRequest(request.id);
      } catch (error) {
        console.error(`Error processing request ${request.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error processing pending requests:', error);
  }
};
