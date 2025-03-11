
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { initialChecklist } from '@/data/initialChecklist';
import { useImprovementActions } from '@/hooks/useImprovementActions';
import { ImprovementContextType, ChecklistItem } from '@/types/checklist';

const ImprovementContext = createContext<ImprovementContextType | undefined>(undefined);

export const ImprovementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    checklistItems,
    toggleItem,
    completedCount,
    currentItem,
    showFeedback,
    setShowFeedback,
    handleFeedbackSubmit,
    updateCurrentItem,
    isLoading,
    error
  } = useImprovementActions();
  
  // Fallback to initial checklist if the API data isn't available yet
  const checklist = checklistItems.length > 0 ? checklistItems : initialChecklist;

  // Effect to show feedback dialog after every third item completed
  useEffect(() => {
    if (completedCount > 0 && completedCount % 3 === 0) {
      setShowFeedback(true);
    }
  }, [completedCount, setShowFeedback]);

  // Effect to handle automatic progression to next uncompleted item
  useEffect(() => {
    updateCurrentItem(checklist);
  }, [checklist, updateCurrentItem]);

  const value = {
    checklist,
    toggleItem,
    completedCount,
    currentItem,
    showFeedback,
    setShowFeedback,
    handleFeedbackSubmit,
    isLoading,
    error
  };

  return (
    <ImprovementContext.Provider value={value}>
      {children}
    </ImprovementContext.Provider>
  );
};

export const useImprovement = (): ImprovementContextType => {
  const context = useContext(ImprovementContext);
  if (context === undefined) {
    throw new Error('useImprovement must be used within an ImprovementProvider');
  }
  return context;
};

export { ChecklistItem };
export type { ImprovementContextType };
