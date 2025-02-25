
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ChecklistFeedback } from "./ChecklistFeedback";

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const initialChecklist: ChecklistItem[] = [
  {
    id: 1,
    title: "TypeScript Configuration",
    description: "Implement strict TypeScript settings and proper type definitions",
    completed: false
  },
  {
    id: 2,
    title: "Component Architecture",
    description: "Follow component-driven development with proper file structure",
    completed: false
  },
  {
    id: 3,
    title: "State Management",
    description: "Optimize React state management and Context API usage",
    completed: false
  },
  {
    id: 4,
    title: "Performance Optimization",
    description: "Implement React.memo, useCallback, and useMemo where needed",
    completed: false
  },
  {
    id: 5,
    title: "Code Quality",
    description: "Set up ESLint, Prettier, and consistent code formatting",
    completed: false
  },
  {
    id: 6,
    title: "Testing Infrastructure",
    description: "Configure Jest and React Testing Library with proper test coverage",
    completed: false
  },
  {
    id: 7,
    title: "CSS Best Practices",
    description: "Implement CSS Modules or Styled Components with proper organization",
    completed: false
  },
  {
    id: 8,
    title: "API Integration",
    description: "Set up React Query for efficient API data fetching and caching",
    completed: false
  }
];

export const ImprovementChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const { toast } = useToast();

  const completedCount = checklist.filter(item => item.completed).length;

  // Effect to show feedback dialog after every 7 completed items
  useEffect(() => {
    if (completedCount > 0 && completedCount % 7 === 0) {
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

  const toggleItem = (id: number) => {
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
      // Auto-retry on failure
      setTimeout(() => toggleItem(id), 1000);
      
      toast({
        title: "Error Updating Task",
        description: "Automatically retrying...",
        variant: "destructive",
      });
    }
  };

  const handleFeedbackSubmit = (feedback: string) => {
    try {
      toast({
        title: "Feedback Received",
        description: "Thank you for your feedback! We'll use it to improve further.",
      });
      setShowFeedback(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Auto-retry on failure
      setTimeout(() => handleFeedbackSubmit(feedback), 1000);
      
      toast({
        title: "Error Submitting Feedback",
        description: "Automatically retrying...",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold">Improvement Checklist</h2>
        <div className="text-sm text-gray-400">
          Completed: {completedCount} / {checklist.length}
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {checklist.map((item) => (
          <Card 
            key={item.id}
            className={cn(
              "p-3 sm:p-4 transition-all duration-200 cursor-pointer hover:bg-white/5",
              "transform hover:-translate-y-0.5 hover:shadow-lg",
              item.completed && "bg-white/5",
              currentItem === item.id - 1 && "border-primary"
            )}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-primary pt-1">
                {item.completed ? (
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Circle className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-medium text-sm sm:text-base break-words",
                  item.completed && "line-through text-gray-400"
                )}>
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 break-words">
                  {item.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showFeedback && (
        <ChecklistFeedback 
          onClose={() => setShowFeedback(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};
