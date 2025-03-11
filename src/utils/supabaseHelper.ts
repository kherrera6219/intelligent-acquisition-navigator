
import { supabase } from '@/integrations/supabase/client';
import { queryCachedSupabase, offlineAwareSupabaseOperation } from '@/utils/offlineFetch';

/**
 * Fetches data from Supabase with offline support
 * @param tableName Table name to query
 * @param options Query options
 * @returns Promise with data
 */
export async function fetchDataWithOfflineSupport<T>(
  tableName: string,
  options: {
    columns?: string;
    filter?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    cacheKey?: string;
    cacheTime?: number;
  } = {}
): Promise<T[]> {
  const {
    columns = '*',
    filter = {},
    orderBy,
    limit,
    cacheKey,
    cacheTime = 3600000 // 1 hour default
  } = options;

  return queryCachedSupabase<T>(
    tableName,
    (query) => {
      let supabaseQuery = query.select(columns);
      
      // Apply filters
      Object.entries(filter).forEach(([key, value]) => {
        supabaseQuery = supabaseQuery.eq(key, value);
      });
      
      // Apply ordering
      if (orderBy) {
        supabaseQuery = supabaseQuery.order(
          orderBy.column, 
          { ascending: orderBy.ascending ?? true }
        );
      }
      
      // Apply limit
      if (limit) {
        supabaseQuery = supabaseQuery.limit(limit);
      }
      
      return supabaseQuery;
    },
    cacheKey,
    cacheTime
  );
}

/**
 * Creates a new record with offline support
 * @param tableName Table to insert into
 * @param data Record data
 * @returns The created record or null if offline
 */
export async function createRecordWithOfflineSupport<T>(
  tableName: string,
  data: Record<string, any>
): Promise<T | null> {
  return offlineAwareSupabaseOperation<T>(tableName, 'insert', data);
}

/**
 * Updates a record with offline support
 * @param tableName Table name
 * @param id ID field name (default: 'id')
 * @param recordId Record ID value
 * @param data Update data
 * @returns The updated record or null if offline
 */
export async function updateRecordWithOfflineSupport<T>(
  tableName: string,
  recordId: string | number,
  data: Record<string, any>,
  idField: string = 'id'
): Promise<T | null> {
  const conditions = { [idField]: recordId };
  return offlineAwareSupabaseOperation<T>(tableName, 'update', data, conditions);
}

/**
 * Deletes a record with offline support
 * @param tableName Table name
 * @param recordId Record ID value
 * @param idField ID field name (default: 'id')
 * @returns The deleted record or null if offline
 */
export async function deleteRecordWithOfflineSupport<T>(
  tableName: string,
  recordId: string | number,
  idField: string = 'id'
): Promise<T | null> {
  const conditions = { [idField]: recordId };
  return offlineAwareSupabaseOperation<T>(tableName, 'delete', null, conditions);
}

/**
 * Upserts a record with offline support
 * @param tableName Table name
 * @param data Record data
 * @returns The upserted record or null if offline
 */
export async function upsertRecordWithOfflineSupport<T>(
  tableName: string,
  data: Record<string, any>
): Promise<T | null> {
  return offlineAwareSupabaseOperation<T>(tableName, 'upsert', data);
}

/**
 * Check if user is currently authenticated
 * @returns Boolean indicating authentication status
 */
export async function isAuthenticated(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

/**
 * Gets current user data
 * @returns User data or null
 */
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

/**
 * Gets user profile data with offline support
 * @param userId User ID
 * @returns User profile data
 */
export async function getUserProfile<T>(userId: string): Promise<T | null> {
  if (!userId) return null;
  
  try {
    const profiles = await fetchDataWithOfflineSupport<T>(
      'user_profiles',
      {
        filter: { id: userId },
        cacheKey: `user_profile_${userId}`,
        cacheTime: 86400000 // 24 hours
      }
    );
    
    return profiles[0] || null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}
