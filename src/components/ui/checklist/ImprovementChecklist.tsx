
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

interface FeedbackDialogProps {
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold">Your Feedback</h2>
        <p className="text-sm text-gray-400">Please share your thoughts on the improvements made:</p>
        <textarea 
          className="w-full h-32 p-3 rounded-md bg-white/5 border border-white/10 text-white"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
        />
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(feedback)}>Submit</Button>
        </div>
      </Card>
    </div>
  );
};

export const ImprovementChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const completedCount = checklist.filter(item => item.completed).length;

  useEffect(() => {
    if (completedCount > 0 && completedCount % 4 === 0) {
      setShowFeedback(true);
    }
  }, [completedCount]);

  const toggleItem = (id: number) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleFeedbackSubmit = (feedback: string) => {
    toast({
      title: "Feedback Received",
      description: "Thank you for your feedback! We'll use it to improve further.",
    });
    setShowFeedback(false);
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
              item.completed && "bg-white/5"
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
        <FeedbackDialog 
          onClose={() => setShowFeedback(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};
