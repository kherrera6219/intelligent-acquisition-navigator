
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchChecklistItems, 
  updateChecklistItem, 
  submitFeedback,
  searchChecklistItems,
  batchUpdateChecklistItems,
  FeedbackData 
} from '@/services/improvementService';
import { ChecklistItem } from '@/contexts/ImprovementContext';
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useChecklistData = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Query for fetching checklist items
  const { data: checklistItems, isLoading, error } = useQuery({
    queryKey: ['checklistItems', searchQuery],
    queryFn: () => searchQuery 
      ? searchChecklistItems(searchQuery) 
      : fetchChecklistItems(),
    // Enable offline caching and refetching
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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
    onError: (error, _, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(['checklistItems'], context.previousItems);
      }
      
      toast({
        title: "Error Updating Item",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
    // After success or error, invalidate the cache to refetch
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['checklistItems'] });
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Mutation for batch updating checklist items
  const batchUpdateMutation = useMutation({
    mutationFn: (updates: { id: number; updates: Partial<ChecklistItem> }[]) => 
      batchUpdateChecklistItems(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklistItems'] });
      toast({
        title: "Sync Complete",
        description: "Your changes have been synchronized",
      });
    },
    onError: (error) => {
      toast({
        title: "Sync Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Mutation for submitting feedback
  const submitFeedbackMutation = useMutation({
    mutationFn: (feedbackData: FeedbackData) => submitFeedback(feedbackData),
    onSuccess: () => {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
    },
    onError: (error) => {
      toast({
        title: "Feedback Submission Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Handle search query changes
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

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
    syncPendingUpdates: (updates: { id: number; updates: Partial<ChecklistItem> }[]) =>
      batchUpdateMutation.mutate(updates),
    isSyncing: batchUpdateMutation.isPending,
    searchQuery,
    handleSearch,
  };
};
