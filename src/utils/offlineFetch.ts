
import { supabase } from '@/integrations/supabase/client';
import { offlineFetch, cacheResponse, getCachedResponse, savePendingRequest } from '@/utils/offlineStorage';

// Enhanced fetch function for Supabase operations with offline support
export async function fetchWithOfflineSupport(
  endpoint: string,
  options: RequestInit & { 
    cacheMaxAge?: number;
    offlinePriority?: number; 
    bypassCache?: boolean;
  } = {}
) {
  return offlineFetch(endpoint, options);
}

// Cached Supabase query with offline support
export async function queryCachedSupabase<T>(
  tableName: string,
  query: (supabaseQuery: any) => any, 
  cacheKey?: string,
  cacheMaxAge = 3600000 // 1 hour default
): Promise<T[]> {
  const isOnline = navigator.onLine;
  const customCacheKey = cacheKey || `supabase_${tableName}_${JSON.stringify(query.toString())}`;
  
  try {
    if (isOnline) {
      // Online: perform the query and cache result
      const supabaseQuery = supabase.from(tableName);
      const { data, error } = await query(supabaseQuery);
      
      if (error) throw error;
      
      // Cache the successful result
      await cacheResponse(customCacheKey, data, cacheMaxAge);
      return data as T[];
    } else {
      // Offline: try to get from cache
      const cachedData = await getCachedResponse(customCacheKey);
      if (cachedData) return cachedData as T[];
      return [] as T[];
    }
  } catch (error) {
    console.error(`Error in cached Supabase query for ${tableName}:`, error);
    
    // On error, try to get from cache
    const cachedData = await getCachedResponse(customCacheKey);
    if (cachedData) return cachedData as T[];
    
    throw error;
  }
}

// Function to save pending Supabase operations for offline support
export async function savePendingSupabaseOperation(
  tableName: string, 
  operation: 'insert' | 'update' | 'delete' | 'upsert',
  data: any,
  conditions?: Record<string, any>,
  priority = 1
): Promise<void> {
  // Format the operation for storing
  const pendingOperation = {
    url: `/rest/v1/${tableName}`, // This is for tracking purposes
    method: operation === 'insert' ? 'POST' : 'PATCH', // Simplification
    headers: {
      'Content-Type': 'application/json',
      'Prefer': operation === 'upsert' ? 'resolution=merge-duplicates' : undefined
    },
    body: {
      table: tableName,
      operation,
      data,
      conditions
    },
    priority
  };
  
  await savePendingRequest(pendingOperation);
}

// Perform offline-aware Supabase operations
export async function offlineAwareSupabaseOperation<T>(
  tableName: string,
  operation: 'insert' | 'update' | 'delete' | 'upsert',
  data: any,
  conditions?: Record<string, any>,
  priority = 1
): Promise<T | null> {
  const isOnline = navigator.onLine;
  
  if (isOnline) {
    try {
      let result;
      
      switch (operation) {
        case 'insert':
          result = await supabase.from(tableName).insert(data).select().single();
          break;
        case 'update':
          // Apply conditions to the update operation
          let updateQuery = supabase.from(tableName).update(data);
          Object.entries(conditions || {}).forEach(([key, value]) => {
            updateQuery = updateQuery.eq(key, value);
          });
          result = await updateQuery.select().single();
          break;
        case 'delete':
          // Apply conditions to the delete operation
          let deleteQuery = supabase.from(tableName).delete();
          Object.entries(conditions || {}).forEach(([key, value]) => {
            deleteQuery = deleteQuery.eq(key, value);
          });
          result = await deleteQuery.select().single();
          break;
        case 'upsert':
          result = await supabase.from(tableName).upsert(data).select().single();
          break;
      }
      
      if (result?.error) throw result.error;
      return result?.data as T || null;
    } catch (error) {
      console.error(`Error in Supabase ${operation} for ${tableName}:`, error);
      
      // If error is due to network, save for later processing
      if (error instanceof TypeError && error.message.includes('network')) {
        await savePendingSupabaseOperation(tableName, operation, data, conditions, priority);
      }
      
      throw error;
    }
  } else {
    // If offline, save operation for later processing
    await savePendingSupabaseOperation(tableName, operation, data, conditions, priority);
    return null;
  }
}
