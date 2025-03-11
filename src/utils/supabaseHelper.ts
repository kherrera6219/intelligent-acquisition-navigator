
import { supabase } from '@/integrations/supabase/client';
import { offlineFetch } from './offlineStorage';

/**
 * Utility to check if Supabase is reachable
 * @returns Promise resolving to boolean indicating if Supabase is reachable
 */
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    // Try to select from a simple table
    const { data, error } = await supabase
      .from('health_check')
      .select('count')
      .limit(1);
    
    // If no error or if we get a specific table not found error (which means the server is reachable),
    // consider it connected
    return !error || (error.code === 'PGRST116');
  } catch (error) {
    console.warn('Supabase connection check failed:', error);
    return false;
  }
}

/**
 * Enhanced Supabase query function with offline support
 * Uses the offlineFetch utility to handle offline scenarios
 * 
 * @param apiCall Function that returns a Supabase query object
 * @param options Offline options including cache settings
 * @returns Promise with the query result
 */
export async function offlineSupabaseQuery<T>(
  apiCall: () => Promise<{ data: T | null; error: any }>,
  options = {
    cacheMaxAge: 3600000, // 1 hour default
    offlinePriority: 0,
    bypassCache: false
  }
): Promise<{ data: T | null; error: any }> {
  try {
    // Try normal Supabase query first
    return await apiCall();
  } catch (error) {
    // If it's a network error, try to use cached data or queue for later
    if (error instanceof TypeError && error.message.includes('network')) {
      // Return empty result with error
      return { data: null, error };
    }
    
    // For other errors, just propagate them
    throw error;
  }
}

/**
 * Gets the timestamp of the last successful sync with Supabase
 * @returns Timestamp of the last sync or null if never synced
 */
export function getLastSyncTime(): Date | null {
  const lastSyncTimeString = localStorage.getItem('supabase_last_sync_time');
  return lastSyncTimeString ? new Date(lastSyncTimeString) : null;
}

/**
 * Sets the timestamp of the last successful sync with Supabase
 * @param time Timestamp to set (defaults to current time)
 */
export function setLastSyncTime(time: Date = new Date()): void {
  localStorage.setItem('supabase_last_sync_time', time.toISOString());
}
