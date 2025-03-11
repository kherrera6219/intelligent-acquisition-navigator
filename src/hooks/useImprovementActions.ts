
import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ChecklistItem } from '@/types/checklist';
import { useChecklistData } from '@/hooks/useChecklistData';

export const useImprovementActions = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const { toast } = useToast();
  
  // Use React Query hook for data fetching and management
  const {
    checklistItems,
    isLoading,
    error,
    updateItem,
    submitFeedback: submitFeedbackToAPI,
  } = useChecklistData();
  
  const completedCount = checklistItems.filter(item => item.completed).length;

  // Update currentItem to the next uncompleted item
  const updateCurrentItem = useCallback((items: ChecklistItem[]) => {
    const nextIncomplete = items.findIndex(item => !item.completed);
    if (nextIncomplete !== -1) {
      setCurrentItem(nextIncomplete);
    }
  }, []);

  // Toggle a checklist item's completion status
  const toggleItem = useCallback((id: number) => {
    try {
      const item = checklistItems.find(item => item.id === id);
      if (!item) return;
      
      // Toggle the completed status
      updateItem(id, { completed: !item.completed });
      
      toast({
        title: "Task Updated",
        description: "Progress has been saved",
      });
    } catch (error) {
      console.error("Error toggling item:", error);
      
      toast({
        title: "Error Updating Task",
        description: "Automatically retrying...",
        variant: "destructive",
      });
    }
  }, [checklistItems, updateItem, toast]);

  // Handle feedback submission
  const handleFeedbackSubmit = useCallback((feedback: string, rating: number) => {
    try {
      // Submit feedback to API
      submitFeedbackToAPI({
        feedback,
        rating,
        timestamp: new Date().toISOString(),
        completedCount
      });
      
      toast({
        title: "Feedback Received",
        description: "Thank you for your feedback! We'll use it to improve further.",
      });
      
      setShowFeedback(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      
      toast({
        title: "Error Submitting Feedback",
        description: "Automatically retrying...",
        variant: "destructive",
      });
    }
  }, [submitFeedbackToAPI, completedCount, toast]);

  return {
    checklistItems,
    toggleItem,
    completedCount,
    currentItem,
    showFeedback,
    setShowFeedback,
    handleFeedbackSubmit,
    updateCurrentItem,
    isLoading,
    error,
  };
};
