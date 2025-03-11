import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

interface OptimisticQueryOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  fallbackData?: T;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useOptimisticQuery<T>({
  queryKey,
  queryFn,
  fallbackData,
  staleTime = 1000 * 60 * 5, // 5 minutes
  cacheTime = 1000 * 60 * 30, // 30 minutes
  refetchOnWindowFocus = true
}: OptimisticQueryOptions<T>): UseQueryResult<T, Error> & { isOfflineData: boolean } {
  const { isOnline, supabaseConnected } = useNetworkMonitor();
  const [isOfflineData, setIsOfflineData] = useState(false);
  
  // Use react-query's useQuery with appropriate options
  const queryResult = useQuery({
    queryKey,
    queryFn,
    staleTime,
    gcTime: cacheTime,
    refetchOnWindowFocus,
    // Don't refetch automatically when offline
    enabled: isOnline && supabaseConnected,
    // Retry fewer times when offline
    retry: isOnline ? 3 : 0,
    // Keep previous data when fetching fails
    keepPreviousData: true,
    // Initialize with fallback data if provided
    initialData: fallbackData
  });
  
  // Determine if we're using offline data
  useEffect(() => {
    if (!isOnline || !supabaseConnected) {
      setIsOfflineData(true);
    } else if (queryResult.isSuccess && queryResult.dataUpdatedAt > 0) {
      setIsOfflineData(false);
    }
  }, [isOnline, supabaseConnected, queryResult.isSuccess, queryResult.dataUpdatedAt]);
  
  return {
    ...queryResult,
    isOfflineData
  };
}
