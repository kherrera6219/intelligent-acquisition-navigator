
import { useQuery } from '@tanstack/react-query';
import { cachedFetch } from '@/utils/cachedFetch';

export interface UseQueryWithCacheOptions<TData = any, TError = Error> {
  url: string;
  cacheKey?: string;
  cacheTtl?: number;
  enabled?: boolean;
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
  forceRefresh?: boolean;
  retryCount?: number;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  queryKey: string | string[];
}

/**
 * Custom hook for fetching data with caching support
 */
export function useQueryWithCache<TData = any, TError = Error>({
  url,
  cacheKey,
  cacheTtl,
  enabled = true,
  refetchInterval,
  refetchOnWindowFocus = true,
  forceRefresh = false,
  retryCount = 3,
  onSuccess,
  onError,
  queryKey
}: UseQueryWithCacheOptions<TData, TError>) {
  const key = Array.isArray(queryKey) ? queryKey : [queryKey];
  
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        const response = await cachedFetch<TData>(url, {}, {
          cacheKey,
          cacheTtl,
          forceRefresh,
          retryCount
        });
        return response;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
    enabled,
    refetchInterval,
    refetchOnWindowFocus,
    staleTime: cacheTtl || 1000 * 60 * 5, // Default to 5 minutes if not specified
    retry: retryCount,
    onSuccess,
    onError
  });
}
