
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
const initDB = async (): Promise<IDBPDatabase> => {
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
  const db = await initDB();
  const tx = db.transaction(STORE_DATA, 'readwrite');
  await tx.store.put(data, key);
  await tx.done;
};

// Retrieve data from IndexedDB
export const getData = async (key: string): Promise<any> => {
  const db = await initDB();
  return db.get(STORE_DATA, key);
};

// Delete data from IndexedDB
export const deleteData = async (key: string): Promise<void> => {
  const db = await initDB();
  await db.delete(STORE_DATA, key);
};

// Add a pending request
export const addPendingRequest = async (request: Omit<PendingRequest, 'id' | 'timestamp'>): Promise<string> => {
  const db = await initDB();
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
  const db = await initDB();
  return db.getAllFromIndex(STORE_PENDING, 'timestamp');
};

// Get pending request count
export const getPendingRequestCount = async (): Promise<number> => {
  const db = await initDB();
  return db.count(STORE_PENDING);
};

// Delete a pending request
export const deletePendingRequest = async (id: string): Promise<void> => {
  const db = await initDB();
  await db.delete(STORE_PENDING, id);
};

// Clear all data
export const clearAllData = async (): Promise<void> => {
  await deleteDB(DB_NAME);
};

// Check if a key exists
export const hasData = async (key: string): Promise<boolean> => {
  const db = await initDB();
  const keys = await db.getAllKeys(STORE_DATA);
  return keys.includes(key);
};
