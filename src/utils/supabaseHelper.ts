
import { supabase } from '@/integrations/supabase/client';
import { cachedFetch } from './cachedFetch';

// Check if Supabase is connected
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Make a simple query to check connection
    const { data, error } = await supabase
      .from('health_check')
      .select('status')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Failed to check Supabase connection:', error);
    return false;
  }
};

// Get user session
export const getSupabaseUser = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting user session:', error);
      return null;
    }
    
    return session?.user || null;
  } catch (error) {
    console.error('Failed to get Supabase user:', error);
    return null;
  }
};

// Generic function to fetch data from Supabase with offline support
export const fetchFromSupabaseWithOfflineSupport = async <T>(
  tableName: string,
  query: any,
  options: {
    cacheKey?: string;
    cacheMaxAge?: number;
    bypassCache?: boolean;
  } = {}
): Promise<T[]> => {
  const {
    cacheKey = `supabase-${tableName}-${JSON.stringify(query)}`,
    cacheMaxAge = 3600000, // 1 hour default
    bypassCache = false,
  } = options;

  try {
    // Try to use cached data first if not bypassing cache
    if (!bypassCache) {
      const cachedData = await cachedFetch<T[]>(cacheKey, {
        cacheKey,
        cacheMaxAge,
        bypassCache
      });
      
      if (cachedData) {
        return cachedData;
      }
    }

    // If no cached data or bypassing cache, fetch from Supabase
    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching from ${tableName}:`, error);
      throw error;
    }

    // Cache the results
    await cachedFetch<T[]>(cacheKey, {
      cacheKey,
      cacheMaxAge,
      bypassCache: true, // We're saving to cache, not reading from it
      data: data
    });

    return data;
  } catch (error) {
    console.error(`Failed to fetch from ${tableName}:`, error);
    throw error;
  }
};
