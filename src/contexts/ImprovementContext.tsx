
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface ImprovementContextType {
  checklist: ChecklistItem[];
  toggleItem: (id: number) => void;
  completedCount: number;
  currentItem: number;
  showFeedback: boolean;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  handleFeedbackSubmit: (feedback: string, rating: number) => void;
}

const ImprovementContext = createContext<ImprovementContextType | undefined>(undefined);

export const initialChecklist: ChecklistItem[] = [
  {
    id: 1,
    title: "TypeScript Configuration",
    description: "Implement strict TypeScript settings and proper type definitions",
    completed: true
  },
  {
    id: 2,
    title: "Component Architecture",
    description: "Follow component-driven development with proper file structure",
    completed: true
  },
  {
    id: 3,
    title: "State Management",
    description: "Optimize React state management and Context API usage",
    completed: true
  },
  {
    id: 4,
    title: "Performance Optimization",
    description: "Implement React.memo, useCallback, and useMemo where needed",
    completed: true
  },
  {
    id: 5,
    title: "Code Quality",
    description: "Set up ESLint, Prettier, and consistent code formatting",
    completed: true
  },
  {
    id: 6,
    title: "Testing Infrastructure",
    description: "Configure Jest and React Testing Library with proper test coverage",
    completed: true
  },
  {
    id: 7,
    title: "Error Handling",
    description: "Implement comprehensive error boundaries and error recovery mechanisms",
    completed: true
  },
  {
    id: 8,
    title: "Form Validation",
    description: "Add client-side input validation with helpful feedback",
    completed: true
  },
  {
    id: 9,
    title: "Responsive Design",
    description: "Ensure proper display on all device sizes with adaptive layouts",
    completed: true
  },
  {
    id: 10,
    title: "API Integration",
    description: "Set up React Query for efficient API data fetching and caching",
    completed: true
  }
];

export const ImprovementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const { toast } = useToast();

  const completedCount = checklist.filter(item => item.completed).length;

  // Effect to show feedback dialog after every third item completed
  useEffect(() => {
    if (completedCount > 0 && completedCount % 3 === 0) {
      setShowFeedback(true);
    }
  }, [completedCount]);

  // Effect to handle automatic progression to next uncompleted item
  useEffect(() => {
    const findNextIncomplete = () => {
      const nextIncomplete = checklist.findIndex(item => !item.completed);
      if (nextIncomplete !== -1) {
        setCurrentItem(nextIncomplete);
      }
    };
    findNextIncomplete();
  }, [checklist]);

  const toggleItem = useCallback((id: number) => {
    try {
      setChecklist(prev => prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      ));

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
      
      // Implement retry mechanism with useCallback
      setTimeout(() => toggleItem(id), 1000);
    }
  }, [toast]);

  const handleFeedbackSubmit = useCallback((feedback: string, rating: number) => {
    try {
      // Log feedback data for analytics purposes
      console.log(`Feedback submitted: Rating ${rating}/5, Feedback: ${feedback}`);
      
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
      
      // Retry mechanism
      setTimeout(() => handleFeedbackSubmit(feedback, rating), 1000);
    }
  }, [toast]);

  const value = {
    checklist,
    toggleItem,
    completedCount,
    currentItem,
    showFeedback,
    setShowFeedback,
    handleFeedbackSubmit
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
