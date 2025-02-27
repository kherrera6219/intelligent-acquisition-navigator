
/**
 * Utilities for handling optimistic updates and request caching
 */
import { nanoid } from 'nanoid';

// Type for tracking optimistic update states
export interface OptimisticUpdate<T = any> {
  id: string;
  status: 'pending' | 'success' | 'error';
  timestamp: number;
  resourceType: string;
  resourceId?: string;
  action: 'create' | 'update' | 'delete';
  originalData?: T;
  updatedData?: T;
  error?: Error;
}

// Cache for storing optimistic updates
const optimisticUpdatesCache = new Map<string, OptimisticUpdate>();

/**
 * Create an optimistic update and store it in the cache
 */
export function createOptimisticUpdate<T>(
  resourceType: string,
  action: 'create' | 'update' | 'delete',
  resourceId?: string,
  originalData?: T,
  updatedData?: T
): OptimisticUpdate<T> {
  const id = nanoid();
  const update: OptimisticUpdate<T> = {
    id,
    status: 'pending',
    timestamp: Date.now(),
    resourceType,
    resourceId,
    action,
    originalData,
    updatedData,
  };

  optimisticUpdatesCache.set(id, update);
  return update;
}

/**
 * Update the status of an optimistic update
 */
export function updateOptimisticStatus(
  id: string,
  status: 'success' | 'error',
  error?: Error
): OptimisticUpdate | undefined {
  const update = optimisticUpdatesCache.get(id);
  if (!update) return undefined;

  const updatedUpdate = {
    ...update,
    status,
    error,
  };

  optimisticUpdatesCache.set(id, updatedUpdate);
  return updatedUpdate;
}

/**
 * Get all optimistic updates for a resource type
 */
export function getOptimisticUpdates(resourceType: string): OptimisticUpdate[] {
  return Array.from(optimisticUpdatesCache.values()).filter(
    (update) => update.resourceType === resourceType
  );
}

/**
 * Get all pending optimistic updates for a resource type
 */
export function getPendingOptimisticUpdates(resourceType: string): OptimisticUpdate[] {
  return getOptimisticUpdates(resourceType).filter(
    (update) => update.status === 'pending'
  );
}

/**
 * Get a specific optimistic update by id
 */
export function getOptimisticUpdate(id: string): OptimisticUpdate | undefined {
  return optimisticUpdatesCache.get(id);
}

/**
 * Clear all optimistic updates older than the specified time
 */
export function clearStaleOptimisticUpdates(olderThanMs: number = 1000 * 60 * 30): void {
  const now = Date.now();
  Array.from(optimisticUpdatesCache.entries()).forEach(([id, update]) => {
    if (now - update.timestamp > olderThanMs) {
      optimisticUpdatesCache.delete(id);
    }
  });
}

/**
 * Apply optimistic updates to a data array
 */
export function applyOptimisticUpdates<T extends { id: string }>(
  data: T[],
  resourceType: string
): T[] {
  if (!data) return [];
  
  const updates = getPendingOptimisticUpdates(resourceType);
  if (updates.length === 0) return data;

  let result = [...data];

  updates.forEach(update => {
    if (update.action === 'create' && update.updatedData) {
      result = [...result, update.updatedData as T];
    } else if (update.action === 'update' && update.updatedData && update.resourceId) {
      result = result.map(item => 
        item.id === update.resourceId ? { ...item, ...update.updatedData } as T : item
      );
    } else if (update.action === 'delete' && update.resourceId) {
      result = result.filter(item => item.id !== update.resourceId);
    }
  });

  return result;
}
