
import { useQueryClient, UseMutationOptions } from '@tanstack/react-query';

interface OptimisticContext<T> {
  previousData: T;
}

export function useOptimisticMutation<T, TError = Error, TVariables = unknown>(
  queryKey: string[],
  mutationFn: (variables: TVariables) => Promise<T>,
  options?: Omit<UseMutationOptions<T, TError, TVariables, OptimisticContext<T>>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  const optimisticOptions: UseMutationOptions<T, TError, TVariables, OptimisticContext<T>> = {
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot current data
      const previousData = queryClient.getQueryData<T>(queryKey);

      // Optimistically update
      queryClient.setQueryData<T>(queryKey, (old) => ({
        ...old,
        ...newData,
      } as T));

      return { previousData };
    },

    onError: (err, newData, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      
      // Handle error (could add toast notification here)
      console.error('Mutation failed:', err);
    },

    onSettled: () => {
      // Refetch after mutation settles
      queryClient.invalidateQueries({ queryKey });
    },

    ...options,
  };

  return optimisticOptions;
}
