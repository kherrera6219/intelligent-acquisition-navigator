
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useNetworkStatus } from './useNetworkStatus';
import { useState, useEffect } from 'react';

export interface QueryCacheOptions {
  cacheTime?: number;
  staleTime?: number;
  retryCount?: number;
  refetchOnWindowFocus?: boolean;
  offlineOnly?: boolean;
}

export function useQueryWithCache<TData = unknown>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  {
    cacheTime,
    staleTime,
    retryCount = 3,
    refetchOnWindowFocus = true,
    offlineOnly = false,
  }: QueryCacheOptions = {}
) {
  const isOnline = useNetworkStatus();
  const [cachedData, setCachedData] = useState<TData | null>(null);
  const [isFetchingFromCache, setIsFetchingFromCache] = useState(false);

  // Load cache on mount or when offline
  useEffect(() => {
    const loadCache = async () => {
      if (!isOnline || offlineOnly) {
        setIsFetchingFromCache(true);
        try {
          const cacheKey = `query-cache:${queryKey.join(':')}`;
          const item = localStorage.getItem(cacheKey);
          if (item) {
            const { data, timestamp } = JSON.parse(item);
            if (Date.now() - timestamp < (cacheTime || 1000 * 60 * 60 * 24)) {
              setCachedData(data);
            }
          }
        } catch (error) {
          console.error('Error loading from cache:', error);
        } finally {
          setIsFetchingFromCache(false);
        }
      }
    };

    loadCache();
  }, [isOnline, queryKey, cacheTime, offlineOnly]);

  // Update cache when data is received online
  const updateCache = (data: TData) => {
    try {
      const cacheKey = `query-cache:${queryKey.join(':')}`;
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  };

  const result = useQuery({
    queryKey,
    queryFn,
    staleTime,
    gcTime: cacheTime,
    retry: retryCount,
    refetchOnWindowFocus,
    enabled: isOnline && !offlineOnly,
  });

  // Save data to cache when it's received
  useEffect(() => {
    if (result.data && isOnline) {
      updateCache(result.data);
    }
  }, [result.data, isOnline]);

  return {
    ...result,
    data: result.data || cachedData,
    isLoading: result.isLoading || isFetchingFromCache,
    isFetching: result.isFetching || isFetchingFromCache,
    isOffline: !isOnline,
  };
}
