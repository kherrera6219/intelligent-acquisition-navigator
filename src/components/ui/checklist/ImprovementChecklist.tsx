
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
    title: "Accessibility Improvements",
    description: "Enhanced ARIA attributes and keyboard navigation",
    completed: false
  },
  {
    id: 2,
    title: "Error Handling",
    description: "Improved error boundaries and user feedback",
    completed: false
  },
  {
    id: 3,
    title: "State Management",
    description: "Optimized state management and data flow",
    completed: false
  },
  {
    id: 4,
    title: "Performance Monitoring",
    description: "Added performance tracking and optimization",
    completed: false
  },
  {
    id: 5,
    title: "User Interface Consistency",
    description: "Standardized UI components and styling",
    completed: false
  },
  {
    id: 6,
    title: "Documentation",
    description: "Improved code documentation and comments",
    completed: false
  },
  {
    id: 7,
    title: "Testing Coverage",
    description: "Enhanced unit and integration tests",
    completed: false
  },
  {
    id: 8,
    title: "Code Organization",
    description: "Better file structure and component organization",
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Improvement Checklist</h2>
        <div className="text-sm text-gray-400">
          Completed: {completedCount} / {checklist.length}
        </div>
      </div>

      <div className="grid gap-4">
        {checklist.map((item) => (
          <Card 
            key={item.id}
            className={cn(
              "p-4 transition-all duration-200 cursor-pointer hover:bg-white/5",
              item.completed && "bg-white/5",
              currentItem === item.id - 1 && "border-primary"
            )}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex items-start gap-4">
              <div className="text-primary">
                {item.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className={cn(
                  "font-medium",
                  item.completed && "line-through text-gray-400"
                )}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">{item.description}</p>
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
