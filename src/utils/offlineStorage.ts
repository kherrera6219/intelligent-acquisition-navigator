
import { openDB, deleteDB, IDBPDatabase } from 'idb';

const DB_NAME = 'procurity-offline-db';
const STORE_DATA = 'offlineData';
const STORE_PENDING = 'pendingRequests';
const DB_VERSION = 1;

interface PendingRequest {
  id: string;
  url: string;
  method: string;
  body?: any;
  headers?: Record<string, string>;
  timestamp: number;
}

// Initialize the database
export const initOfflineDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create a store for cached data
      if (!db.objectStoreNames.contains(STORE_DATA)) {
        db.createObjectStore(STORE_DATA);
      }
      
      // Create a store for pending requests
      if (!db.objectStoreNames.contains(STORE_PENDING)) {
        const pendingStore = db.createObjectStore(STORE_PENDING, { keyPath: 'id' });
        pendingStore.createIndex('timestamp', 'timestamp');
      }
    },
  });
};

// Store data in IndexedDB
export const storeData = async (key: string, data: any): Promise<void> => {
  const db = await initOfflineDB();
  const tx = db.transaction(STORE_DATA, 'readwrite');
  await tx.store.put(data, key);
  await tx.done;
};

// Retrieve data from IndexedDB
export const getData = async (key: string): Promise<any> => {
  const db = await initOfflineDB();
  return db.get(STORE_DATA, key);
};

// Delete data from IndexedDB
export const deleteData = async (key: string): Promise<void> => {
  const db = await initOfflineDB();
  await db.delete(STORE_DATA, key);
};

// Add a pending request
export const addPendingRequest = async (request: Omit<PendingRequest, 'id' | 'timestamp'>): Promise<string> => {
  const db = await initOfflineDB();
  const id = `request_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const pendingRequest: PendingRequest = {
    ...request,
    id,
    timestamp: Date.now(),
  };
  
  await db.add(STORE_PENDING, pendingRequest);
  return id;
};

// Get all pending requests
export const getPendingRequests = async (): Promise<PendingRequest[]> => {
  const db = await initOfflineDB();
  return db.getAllFromIndex(STORE_PENDING, 'timestamp');
};

// Get pending request count
export const getPendingRequestCount = async (): Promise<number> => {
  const db = await initOfflineDB();
  return db.count(STORE_PENDING);
};

// Delete a pending request
export const deletePendingRequest = async (id: string): Promise<void> => {
  const db = await initOfflineDB();
  await db.delete(STORE_PENDING, id);
};

// Process pending requests when online
export const processPendingRequests = async (): Promise<{ successful: number; failed: number }> => {
  const pendingRequests = await getPendingRequests();
  let successful = 0;
  let failed = 0;
  
  for (const request of pendingRequests) {
    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body ? JSON.stringify(request.body) : undefined
      });
      
      if (response.ok) {
        await deletePendingRequest(request.id);
        successful++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error('Error processing pending request:', error);
      failed++;
    }
  }
  
  return { successful, failed };
};

// Clear all data
export const clearAllData = async (): Promise<void> => {
  await deleteDB(DB_NAME);
};

// Clear expired cache items
export const clearExpiredCache = async (): Promise<number> => {
  const db = await initOfflineDB();
  const tx = db.transaction(STORE_DATA, 'readwrite');
  const store = tx.objectStore(STORE_DATA);
  const keys = await store.getAllKeys();
  let clearCount = 0;
  
  const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const now = Date.now();
  
  for (const key of keys) {
    const data = await store.get(key);
    if (data && data.timestamp && now - data.timestamp > CACHE_EXPIRY) {
      await store.delete(key);
      clearCount++;
    }
  }
  
  await tx.done;
  return clearCount;
};

// Check if a key exists
export const hasData = async (key: string): Promise<boolean> => {
  const db = await initOfflineDB();
  const keys = await db.getAllKeys(STORE_DATA);
  return keys.includes(key);
};
