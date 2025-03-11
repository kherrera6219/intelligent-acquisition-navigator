
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

/**
 * A hook that extends useQuery with optimistic UI features
 */
export function useOptimisticQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error, T, string[]>, 'queryKey' | 'queryFn' | 'keepPreviousData'>
): UseQueryResult<T, Error> {
  // Wrap query in useQuery hook with staleTime for better performance
  const queryResult = useQuery({
    queryKey,
    queryFn,
    staleTime: options?.staleTime ?? 1000 * 60 * 5, // 5 minutes default
    ...options,
  });

  return queryResult;
}
