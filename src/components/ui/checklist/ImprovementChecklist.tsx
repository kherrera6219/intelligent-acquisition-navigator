
import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChecklistFeedback } from "./ChecklistFeedback";
import { useImprovement, ChecklistItem } from "@/contexts/ImprovementContext";

// Memoized checklist item component for performance optimization
const ChecklistItemComponent = memo(({ 
  item, 
  isCurrentItem, 
  onToggle 
}: { 
  item: ChecklistItem; 
  isCurrentItem: boolean; 
  onToggle: () => void 
}) => (
  <Card 
    key={item.id}
    className={cn(
      "p-3 sm:p-4 transition-all duration-200 cursor-pointer hover:bg-white/5",
      "transform hover:-translate-y-0.5 hover:shadow-lg",
      item.completed && "bg-white/5",
      isCurrentItem && "border-primary"
    )}
    onClick={onToggle}
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
));

ChecklistItemComponent.displayName = 'ChecklistItemComponent';

export const ImprovementChecklist: React.FC = () => {
  const { 
    checklist, 
    toggleItem, 
    completedCount, 
    currentItem, 
    showFeedback, 
    setShowFeedback, 
    handleFeedbackSubmit 
  } = useImprovement();

  return (
    <div className="w-full px-4 md:px-6 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Improvement Checklist</h2>
        <div className="text-sm text-gray-400">
          Completed: {completedCount} / {checklist.length}
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {checklist.map((item) => (
          <ChecklistItemComponent 
            key={item.id}
            item={item} 
            isCurrentItem={currentItem === item.id - 1}
            onToggle={() => toggleItem(item.id)}
          />
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
