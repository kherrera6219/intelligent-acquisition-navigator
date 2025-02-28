
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { applyOptimisticUpdates } from '@/utils/optimisticUpdates';
import { cachedFetch } from '@/utils/cachedFetch';

/**
 * Options for the useOptimisticQuery hook
 */
export interface UseOptimisticQueryOptions<TData = any, TError = Error> {
  url: string;
  queryKey: QueryKey;
  resourceType: string;
  enabled?: boolean;
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
  retryCount?: number;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  staleTime?: number;
  cacheTime?: number;
}

/**
 * Options for the useOptimisticMutation hook
 */
export interface UseOptimisticMutationOptions<TData = any, TVariables = any, TError = Error> {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  onMutate?: (variables: TVariables) => Promise<TData> | TData;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

/**
 * Custom hook for fetching data with optimistic updates
 */
export function useOptimisticQuery<TData = any, TError = Error>({
  url,
  queryKey,
  resourceType,
  enabled = true,
  refetchInterval,
  refetchOnWindowFocus = true,
  retryCount = 3,
  onSuccess,
  onError,
  staleTime,
  cacheTime
}: UseOptimisticQueryOptions<TData, TError>) {
  // Get query data with optimistic updates applied
  const { data: originalData, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await cachedFetch<TData>(url, {}, {
          resourceType,
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
    staleTime,
    gcTime: cacheTime,
    retry: retryCount,
    onSuccess,
    onError
  });

  // Apply any pending optimistic updates to the data
  const optimisticData = originalData
    ? (Array.isArray(originalData) 
        ? applyOptimisticUpdates(originalData, resourceType) 
        : originalData) as TData
    : undefined;

  return {
    ...rest,
    data: optimisticData
  };
}

/**
 * Custom hook for creating optimistic mutations
 */
export function useOptimisticMutation<TData = any, TCreateVars = any, TError = Error>({
  url,
  method,
  onMutate,
  onSuccess,
  onError
}: UseOptimisticMutationOptions<TData, TCreateVars, TError>) {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  // For create operations
  const create = async (variables: TCreateVars): Promise<TData> => {
    setIsPending(true);
    let optimisticResult: TData | undefined;
    
    try {
      // Apply optimistic update if onMutate is provided
      if (onMutate) {
        optimisticResult = await onMutate(variables);
      }
      
      // Perform the actual API call
      const response = await cachedFetch<TData>(
        url,
        {
          method,
          body: JSON.stringify(variables),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      return response;
    } catch (error) {
      console.error(`Error in ${method} operation:`, error);
      
      if (onError) {
        onError(error as TError);
      }
      
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  // For update operations
  const update = async (variables: { id: string } & Record<string, any>): Promise<TData> => {
    setIsPending(true);
    let optimisticResult: TData | undefined;
    const updateUrl = url.replace('{id}', variables.id);
    
    try {
      // Apply optimistic update if onMutate is provided
      if (onMutate) {
        optimisticResult = await onMutate(variables);
      }
      
      // Perform the actual API call
      const response = await cachedFetch<TData>(
        updateUrl,
        {
          method,
          body: JSON.stringify(variables),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      return response;
    } catch (error) {
      console.error(`Error in ${method} operation:`, error);
      
      if (onError) {
        onError(error as TError);
      }
      
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  // For delete operations
  const remove = async (variables: { id: string }): Promise<void> => {
    setIsPending(true);
    let optimisticResult: TData | undefined;
    const deleteUrl = url.replace('{id}', variables.id);
    
    try {
      // Apply optimistic update if onMutate is provided
      if (onMutate) {
        optimisticResult = await onMutate(variables);
      }
      
      // Perform the actual API call
      await cachedFetch(
        deleteUrl,
        {
          method,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (onSuccess) {
        onSuccess(undefined as unknown as TData);
      }
    } catch (error) {
      console.error(`Error in ${method} operation:`, error);
      
      if (onError) {
        onError(error as TError);
      }
      
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  // Return the appropriate function based on the method
  const mutationFn = method === 'DELETE' 
    ? remove 
    : (method === 'PUT' || method === 'PATCH') 
      ? update 
      : create;

  return {
    mutate: mutationFn,
    isPending
  };
}
