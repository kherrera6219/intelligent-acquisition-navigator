
import { useQuery, QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

export function useQueryWithCache<TData, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
  const { isOnline } = useNetworkMonitor();

  return useQuery({
    queryKey,
    queryFn,
    staleTime: isOnline ? 1000 * 60 * 5 : Infinity, // 5 minutes when online, never stale when offline
    gcTime: Infinity, // Keep cache forever to support offline mode (formerly cacheTime)
    refetchOnWindowFocus: isOnline ? (options?.refetchOnWindowFocus ?? false) : false,
    refetchOnMount: isOnline ? (options?.refetchOnMount ?? true) : false,
    refetchOnReconnect: isOnline,
    retry: isOnline ? (options?.retry ?? 3) : false,
    ...options
  });
}
