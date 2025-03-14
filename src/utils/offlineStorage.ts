
/**
 * Utility for managing offline storage and synchronization
 */

// Database name and version
const DB_NAME = 'offlineDb';
const DB_VERSION = 1;

// Store names
const CACHE_STORE = 'cache';
const PENDING_REQUESTS_STORE = 'pendingRequests';

// Open the database
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event);
      reject(new Error('Could not open IndexedDB'));
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create cache store with timestamp index for expiration
      if (!db.objectStoreNames.contains(CACHE_STORE)) {
        const cacheStore = db.createObjectStore(CACHE_STORE, { keyPath: 'key' });
        cacheStore.createIndex('expirationTime', 'expirationTime', { unique: false });
      }
      
      // Create pending requests store
      if (!db.objectStoreNames.contains(PENDING_REQUESTS_STORE)) {
        const pendingStore = db.createObjectStore(PENDING_REQUESTS_STORE, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        pendingStore.createIndex('priority', 'priority', { unique: false });
        pendingStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

// Initialize the database
export const initOfflineDB = async (): Promise<void> => {
  try {
    await openDB();
    console.log('IndexedDB initialized successfully');
  } catch (error) {
    console.error('Failed to initialize IndexedDB:', error);
  }
};

// Cache a response
export const cacheResponse = async (
  key: string, 
  data: any, 
  expiration: number = 3600000 // Default: 1 hour
): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(CACHE_STORE, 'readwrite');
    const store = transaction.objectStore(CACHE_STORE);
    
    const expirationTime = Date.now() + expiration;
    
    await store.put({
      key,
      data,
      expirationTime,
      cachedAt: Date.now()
    });
    
    db.close();
  } catch (error) {
    console.error('Error caching response:', error);
    throw error;
  }
};

// Get a cached response
export const getCachedResponse = async (key: string): Promise<any | null> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(CACHE_STORE, 'readonly');
    const store = transaction.objectStore(CACHE_STORE);
    
    const request = store.get(key);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const cachedItem = request.result;
        
        if (!cachedItem) {
          resolve(null);
          return;
        }
        
        // Check if the cached item has expired
        if (cachedItem.expirationTime < Date.now()) {
          // Remove expired item asynchronously
          const cleanupTx = db.transaction(CACHE_STORE, 'readwrite');
          cleanupTx.objectStore(CACHE_STORE).delete(key);
          resolve(null);
        } else {
          resolve(cachedItem.data);
        }
        
        db.close();
      };
      
      request.onerror = (event) => {
        console.error('Error retrieving cached response:', event);
        reject(new Error('Failed to retrieve cached response'));
      };
    });
  } catch (error) {
    console.error('Error getting cached response:', error);
    return null;
  }
};

// Add a request to be processed when back online
export const addPendingRequest = async (
  request: RequestInfo, 
  options?: RequestInit,
  priority: number = 0
): Promise<number> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(PENDING_REQUESTS_STORE, 'readwrite');
    const store = transaction.objectStore(PENDING_REQUESTS_STORE);
    
    const pendingRequest = {
      url: typeof request === 'string' ? request : request.url,
      options,
      priority,
      timestamp: Date.now(),
      retryCount: 0
    };
    
    const id = await store.add(pendingRequest);
    db.close();
    return id as number;
  } catch (error) {
    console.error('Error adding pending request:', error);
    throw error;
  }
};

// Get all pending requests
export const getPendingRequests = async (): Promise<any[]> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(PENDING_REQUESTS_STORE, 'readonly');
    const store = transaction.objectStore(PENDING_REQUESTS_STORE);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result);
        db.close();
      };
      
      request.onerror = (event) => {
        console.error('Error retrieving pending requests:', event);
        reject(new Error('Failed to retrieve pending requests'));
      };
    });
  } catch (error) {
    console.error('Error getting pending requests:', error);
    return [];
  }
};

// Remove a pending request
export const removePendingRequest = async (id: number): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(PENDING_REQUESTS_STORE, 'readwrite');
    const store = transaction.objectStore(PENDING_REQUESTS_STORE);
    
    await store.delete(id);
    db.close();
  } catch (error) {
    console.error('Error removing pending request:', error);
    throw error;
  }
};

// Clean up expired cache items
export const clearExpiredCache = async (): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(CACHE_STORE, 'readwrite');
    const store = transaction.objectStore(CACHE_STORE);
    const index = store.index('expirationTime');
    
    const currentTime = Date.now();
    const range = IDBKeyRange.upperBound(currentTime);
    
    const request = index.openCursor(range);
    
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      
      if (cursor) {
        store.delete(cursor.primaryKey);
        cursor.continue();
      }
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  } catch (error) {
    console.error('Error clearing expired cache:', error);
  }
};

// Process all pending requests
export const processPendingRequests = async (): Promise<{ success: number, failed: number }> => {
  let successCount = 0;
  let failedCount = 0;
  
  try {
    const pendingRequests = await getPendingRequests();
    
    // Sort by priority (higher first) and then by timestamp (older first)
    pendingRequests.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return a.timestamp - b.timestamp;
    });
    
    for (const request of pendingRequests) {
      try {
        await fetch(request.url, request.options);
        await removePendingRequest(request.id);
        successCount++;
      } catch (error) {
        console.error(`Failed to process pending request ${request.id}:`, error);
        failedCount++;
      }
    }
    
    return { success: successCount, failed: failedCount };
  } catch (error) {
    console.error('Error processing pending requests:', error);
    return { success: successCount, failed: failedCount };
  }
};
