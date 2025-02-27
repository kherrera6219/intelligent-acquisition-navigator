
/**
 * A custom React Query hook with enhanced caching capabilities
 */
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { cachedFetch, clearCache } from '@/utils/cachedFetch';
import { useToast } from '@/hooks/use-toast';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export interface UseQueryWithCacheOptions<TData> extends Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'> {
  url: string;
  queryKey: string | string[];
  fetchOptions?: RequestInit;
  cacheTime?: number;
  offlineFallback?: boolean;
  retryCount?: number;
  onError?: (error: Error) => void;
  onSuccess?: (data: TData) => void;
  resourceType?: string;
}

/**
 * A custom React Query hook with enhanced caching and offline support
 */
export function useQueryWithCache<TData = unknown>({
  url,
  queryKey,
  fetchOptions = {},
  cacheTime = 1000 * 60 * 30, // 30 minutes
  staleTime = 1000 * 60 * 5, // 5 minutes
  offlineFallback = true,
  retryCount = 3,
  onError,
  onSuccess,
  resourceType = url.split('/').pop() || 'unknown',
  ...options
}: UseQueryWithCacheOptions<TData>) {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  const queryClient = useQueryClient();
  
  // Normalize queryKey to always be an array
  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
  
  return useQuery<TData>({
    queryKey: normalizedQueryKey,
    queryFn: async () => {
      try {
        return await cachedFetch<TData>(url, fetchOptions, {
          cacheTtl: staleTime,
          offlineFallback,
          retryCount,
          resourceType
        });
      } catch (error) {
        if (!isOnline) {
          toast({
            title: 'You are offline',
            description: 'Using cached data. Some information may be outdated.',
            variant: 'default'
          });
          
          // Try to get cached data from the queryClient cache
          const cachedData = queryClient.getQueryData<TData>(normalizedQueryKey);
          if (cachedData) return cachedData;
        }
        
        throw error;
      }
    },
    staleTime,
    gcTime: cacheTime,
    meta: {
      onSuccess: (data: TData) => {
        if (onSuccess) onSuccess(data);
      },
      onError: (error: Error) => {
        if (onError) onError(error);
        
        toast({
          title: 'Error',
          description: error.message || 'An error occurred while fetching data',
          variant: 'destructive'
        });
      }
    },
    ...options
  });
}

/**
 * Prefetch and cache data for later use
 * @param url The URL to prefetch
 * @param queryKey The query key to use for caching
 */
export function prefetchQuery<TData = unknown>(
  queryClient: ReturnType<typeof useQueryClient>,
  url: string,
  queryKey: string | string[],
  options: {
    fetchOptions?: RequestInit;
    staleTime?: number;
  } = {}
): Promise<void> {
  const { fetchOptions = {}, staleTime = 1000 * 60 * 5 } = options;
  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
  
  return queryClient.prefetchQuery({
    queryKey: normalizedQueryKey,
    queryFn: () => cachedFetch<TData>(url, fetchOptions),
    staleTime
  });
}

/**
 * Invalidate and refetch queries
 */
export function invalidateAndRefetch(
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: string | string[]
): Promise<void> {
  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
  return queryClient.invalidateQueries({ queryKey: normalizedQueryKey });
}

/**
 * Clear specific query cache
 */
export function clearQueryCache(
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: string | string[]
): void {
  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
  queryClient.removeQueries({ queryKey: normalizedQueryKey });
  
  // Also clear from our custom cache
  if (typeof queryKey === 'string') {
    clearCache(queryKey);
  }
}
