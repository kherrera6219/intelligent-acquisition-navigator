
/**
 * Custom hook for optimistic queries with React Query
 */
import { useQuery, useMutation, useQueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { applyOptimisticUpdates, OptimisticUpdate } from '@/utils/optimisticUpdates';
import { cachedFetch } from '@/utils/cachedFetch';
import { useToast } from '@/hooks/use-toast';

// Types for the hook params
type QueryParams = {
  url: string;
  queryKey: string[];
  fetchOptions?: RequestInit;
  cacheTime?: number;
  staleTime?: number;
  retryCount?: number;
  resourceType: string;
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
};

type MutationParams<TData, TVariables> = {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  onMutate?: (variables: TVariables) => Promise<TData | undefined>;
  onSuccess?: (data: TData, variables: TVariables, context: any) => void;
  onError?: (error: Error, variables: TVariables, context: any) => void;
  onSettled?: (data: TData | undefined, error: Error | null, variables: TVariables, context: any) => void;
};

/**
 * Custom hook for handling optimistic queries
 */
export function useOptimisticQuery<TData extends { id: string }[]>(params: QueryParams) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const {
    url,
    queryKey,
    fetchOptions = {},
    cacheTime = 1000 * 60 * 30, // 30 minutes
    staleTime = 1000 * 60 * 5, // 5 minutes
    retryCount = 3,
    resourceType,
    enabled = true,
    onSuccess,
    onError
  } = params;
  
  // Query with data transformation for optimistic updates
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const data = await cachedFetch<TData>(url, fetchOptions, {
          cacheTtl: staleTime,
          retryCount,
          resourceType
        });
        return data;
      } catch (error) {
        console.error('Query error:', error);
        toast({
          title: 'Error loading data',
          description: error instanceof Error ? error.message : 'Unknown error occurred',
          variant: 'destructive'
        });
        throw error;
      }
    },
    gcTime: cacheTime,
    staleTime,
    enabled,
    select: (data) => {
      // Apply any pending optimistic updates to the data
      return applyOptimisticUpdates<TData[number]>(data, resourceType);
    },
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
    }
  });

  return query;
}

/**
 * Custom hook for optimistic mutations
 */
export function useOptimisticMutation<TData, TVariables>({
  url,
  method,
  onMutate,
  onSuccess,
  onError,
  onSettled
}: MutationParams<TData, TVariables>) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const resourceType = url.split('/').pop() || 'unknown';
  
  const mutation = useMutation({
    mutationFn: async (variables: TVariables) => {
      try {
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(variables)
        };
        
        const result = await cachedFetch<TData>(url, options, { resourceType });
        return result;
      } catch (error) {
        console.error('Mutation error:', error);
        throw error;
      }
    },
    onMutate: async (variables) => {
      // If custom onMutate is provided, use it
      if (onMutate) {
        return await onMutate(variables);
      }
      
      // Default optimistic update logic
      return undefined;
    },
    onSuccess: (data, variables, context) => {
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
      
      // Invalidate related queries to refetch data
      const baseQueryKey = url.split('/').slice(0, -1).join('/');
      queryClient.invalidateQueries({ queryKey: [baseQueryKey] });
      
      toast({
        title: 'Success',
        description: 'Operation completed successfully',
        variant: 'default'
      });
    },
    onError: (error, variables, context) => {
      if (onError) {
        onError(error as Error, variables, context);
      }
      
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      });
    },
    onSettled: (data, error, variables, context) => {
      if (onSettled) {
        onSettled(data, error as Error | null, variables, context);
      }
    }
  });
  
  return mutation;
}

/**
 * Helper hook for optimistic CRUD operations
 */
export function useOptimisticCrud<TData extends { id: string }, TCreateVars, TUpdateVars>({ 
  baseUrl, 
  resourceType,
  queryOptions = {}
}: {
  baseUrl: string;
  resourceType: string;
  queryOptions?: Omit<QueryParams, 'url' | 'queryKey' | 'resourceType'>;
}) {
  const crudQueryKey = [resourceType];
  
  // Query for fetching the list
  const query = useOptimisticQuery<TData[]>({
    url: baseUrl,
    queryKey: crudQueryKey,
    resourceType,
    ...queryOptions
  });
  
  // Create mutation
  const createMutation = useOptimisticMutation<TData, TCreateVars>({
    url: baseUrl,
    method: 'POST',
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: crudQueryKey });
      
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData[]>(crudQueryKey);
      
      // Optimistically update to the new value
      if (previousData) {
        queryClient.setQueryData<TData[]>(crudQueryKey, [
          ...previousData,
          { ...newData, id: 'temp-' + Date.now() } as unknown as TData,
        ]);
      }
      
      return { previousData };
    },
    onError: (err, _, context) => {
      // If the mutation fails, roll back to the previous value
      if (context?.previousData) {
        queryClient.setQueryData(crudQueryKey, context.previousData);
      }
    }
  });
  
  // Update mutation
  const updateMutation = useOptimisticMutation<TData, TUpdateVars & { id: string }>({
    url: `${baseUrl}/{id}`,
    method: 'PUT',
    onMutate: async (updatedItem) => {
      const id = updatedItem.id;
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: crudQueryKey });
      
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData[]>(crudQueryKey);
      
      // Optimistically update to the new value
      if (previousData) {
        const newData = previousData.map(item => 
          item.id === id ? { ...item, ...updatedItem } as TData : item
        );
        queryClient.setQueryData(crudQueryKey, newData);
      }
      
      return { previousData };
    },
    onError: (err, _, context) => {
      // If the mutation fails, roll back to the previous value
      if (context?.previousData) {
        queryClient.setQueryData(crudQueryKey, context.previousData);
      }
    }
  });
  
  // Delete mutation
  const deleteMutation = useOptimisticMutation<void, { id: string }>({
    url: `${baseUrl}/{id}`,
    method: 'DELETE',
    onMutate: async ({ id }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: crudQueryKey });
      
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData[]>(crudQueryKey);
      
      // Optimistically update to the new value
      if (previousData) {
        const newData = previousData.filter(item => item.id !== id);
        queryClient.setQueryData(crudQueryKey, newData);
      }
      
      return { previousData };
    },
    onError: (err, _, context) => {
      // If the mutation fails, roll back to the previous value
      if (context?.previousData) {
        queryClient.setQueryData(crudQueryKey, context.previousData);
      }
    }
  });
  
  return {
    query,
    createMutation,
    updateMutation,
    deleteMutation,
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error
  };
}
