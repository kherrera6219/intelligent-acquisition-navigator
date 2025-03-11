
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchChecklistItems, 
  updateChecklistItem, 
  submitFeedback,
  FeedbackData 
} from '@/services/improvementService';
import { ChecklistItem } from '@/contexts/ImprovementContext';

export const useChecklistData = () => {
  const queryClient = useQueryClient();
  
  // Query for fetching checklist items
  const { data: checklistItems, isLoading, error } = useQuery({
    queryKey: ['checklistItems'],
    queryFn: fetchChecklistItems,
    // Enable offline caching and refetching
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // Mutation for updating checklist items
  const updateItemMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<ChecklistItem> }) => 
      updateChecklistItem(id, updates),
    // Optimistic updates for better UX
    onMutate: async ({ id, updates }) => {
      // Cancel outgoing refetches that might override our optimistic update
      await queryClient.cancelQueries({ queryKey: ['checklistItems'] });
      
      // Snapshot the previous value
      const previousItems = queryClient.getQueryData(['checklistItems']) as ChecklistItem[];
      
      // Optimistically update to the new value
      queryClient.setQueryData(['checklistItems'], (old: ChecklistItem[] | undefined) => 
        old ? old.map(item => item.id === id ? { ...item, ...updates } : item) : []
      );
      
      // Return the snapshotted value
      return { previousItems };
    },
    // If the mutation fails, rollback to the previous value
    onError: (_, __, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(['checklistItems'], context.previousItems);
      }
    },
    // After success or error, invalidate the cache to refetch
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['checklistItems'] });
    },
  });

  // Mutation for submitting feedback
  const submitFeedbackMutation = useMutation({
    mutationFn: (feedbackData: FeedbackData) => submitFeedback(feedbackData),
  });

  return {
    checklistItems: checklistItems || [],
    isLoading,
    error,
    updateItem: (id: number, updates: Partial<ChecklistItem>) => 
      updateItemMutation.mutate({ id, updates }),
    isUpdating: updateItemMutation.isPending,
    submitFeedback: (feedbackData: FeedbackData) => 
      submitFeedbackMutation.mutate(feedbackData),
    isSubmittingFeedback: submitFeedbackMutation.isPending,
  };
};
