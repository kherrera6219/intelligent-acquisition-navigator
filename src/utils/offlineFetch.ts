
/**
 * Module for managing offline request functionality
 */
import { nanoid } from 'nanoid';
import React from 'react';
import { openDB, IDBPDatabase } from 'idb';

// IndexedDB database name
const DB_NAME = 'offlineRequestsDB';
const STORE_NAME = 'failedRequests';

// Queue to store failed requests when offline
let failedRequestsDbPromise: Promise<IDBPDatabase> | null = null;

/**
 * Initialize the IndexedDB database
 */
const initDatabase = async () => {
  if (!failedRequestsDbPromise) {
    failedRequestsDbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  }
  return failedRequestsDbPromise;
};

/**
 * Interface for failed request object
 */
export interface FailedRequest {
  id: string;
  url: string;
  options: RequestInit;
  timestamp: number;
  retryCount: number;
}

/**
 * Store a failed request in the queue
 */
export const setFailedRequest = async (url: string, options: RequestInit): Promise<void> => {
  try {
    const db = await initDatabase();
    const id = nanoid();
    
    await db.add(STORE_NAME, {
      id,
      url,
      options,
      timestamp: Date.now(),
      retryCount: 0,
    });
    
    console.log(`Request queued for offline processing: ${url}`);
  } catch (error) {
    console.error('Failed to queue request for offline processing:', error);
  }
};

/**
 * Get all failed requests
 */
export const getFailedRequests = async (): Promise<FailedRequest[]> => {
  try {
    const db = await initDatabase();
    return await db.getAll(STORE_NAME);
  } catch (error) {
    console.error('Failed to get offline requests:', error);
    return [];
  }
};

/**
 * Retry a specific failed request
 */
export const retryFailedRequest = async (id: string): Promise<boolean> => {
  try {
    const db = await initDatabase();
    const request = await db.get(STORE_NAME, id);
    
    if (!request) {
      console.warn(`Failed request with ID ${id} not found.`);
      return false;
    }
    
    // Attempt to resend the request
    const response = await fetch(request.url, request.options);
    
    if (response.ok) {
      // If successful, remove from the queue
      await db.delete(STORE_NAME, id);
      return true;
    } else {
      // Update retry count
      await db.put(STORE_NAME, {
        ...request,
        retryCount: request.retryCount + 1,
      });
      return false;
    }
  } catch (error) {
    console.error(`Failed to retry request ${id}:`, error);
    return false;
  }
};

/**
 * Register service worker for offline support if available
 */
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/serviceWorker.js');
      console.log('Service Worker registered with scope:', registration.scope);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

/**
 * Fetch with automatic retry and offline handling
 */
export const offlineFetch = async (
  url: string,
  options: RequestInit & { retryCount?: number } = {}
): Promise<Response> => {
  const { retryCount = 3, ...fetchOptions } = options;
  
  // Try to fetch with retries
  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      const response = await fetch(url, fetchOptions);
      
      if (response.ok) {
        return response;
      }
      
      // If we get a non-2xx response, throw to trigger retry
      throw new Error(`HTTP Error ${response.status}`);
    } catch (error) {
      // Last attempt failed, check if we're offline
      if (attempt === retryCount && !navigator.onLine) {
        // If this is a mutation (POST, PUT, DELETE), queue it for later
        const method = (fetchOptions.method || 'GET').toUpperCase();
        if (method !== 'GET' && method !== 'HEAD') {
          await setFailedRequest(url, fetchOptions);
          
          // Return a mock response
          return new Response(
            JSON.stringify({ success: true, offlineQueued: true }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
      }
      
      // If it's not the last attempt, wait before retrying
      if (attempt < retryCount) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
        continue;
      }
      
      // If it's the last attempt or we're offline with a GET request, throw
      throw error;
    }
  }
  
  // This should never be reached due to the throws above
  throw new Error('Maximum retries exceeded');
};

/**
 * Retry all failed requests
 */
export const retryAllFailedRequests = async (): Promise<{
  total: number;
  succeeded: number;
  failed: number;
}> => {
  try {
    const requests = await getFailedRequests();
    let succeeded = 0;
    let failed = 0;
    
    for (const request of requests) {
      const success = await retryFailedRequest(request.id);
      if (success) {
        succeeded++;
      } else {
        failed++;
      }
    }
    
    return {
      total: requests.length,
      succeeded,
      failed,
    };
  } catch (error) {
    console.error('Failed to retry all requests:', error);
    return {
      total: 0,
      succeeded: 0,
      failed: 0,
    };
  }
};

/**
 * Remove a specific failed request without retrying
 */
export const removeFailedRequest = async (id: string): Promise<boolean> => {
  try {
    const db = await initDatabase();
    await db.delete(STORE_NAME, id);
    return true;
  } catch (error) {
    console.error(`Failed to remove request ${id}:`, error);
    return false;
  }
};

/**
 * Clear all failed requests
 */
export const clearAllFailedRequests = async (): Promise<boolean> => {
  try {
    const db = await initDatabase();
    await db.clear(STORE_NAME);
    return true;
  } catch (error) {
    console.error('Failed to clear all requests:', error);
    return false;
  }
};
