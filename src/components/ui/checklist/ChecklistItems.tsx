
import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChecklistItem } from '@/types/checklist';

interface ChecklistItemsProps {
  items: ChecklistItem[];
  currentItem: number;
  onToggle: (id: number) => void;
}

// Memoized individual checklist item component
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
      "p-3 sm:p-4 transition-all duration-300 cursor-pointer hover:bg-white/5",
      "transform hover:-translate-y-0.5 hover:shadow-lg border-2",
      item.completed ? "bg-green-950/10 border-green-800/20 hover:border-green-500/30" : "hover:border-primary/30",
      isCurrentItem && "border-primary"
    )}
    onClick={onToggle}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <div className={cn(
        "pt-1",
        item.completed ? "text-green-500" : "text-primary"
      )}>
        {item.completed ? (
          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <Circle className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-medium text-sm sm:text-base break-words",
          item.completed && "text-green-400"
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

export const ChecklistItems: React.FC<ChecklistItemsProps> = ({
  items,
  currentItem,
  onToggle
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg bg-gray-900/50">
        <p className="text-gray-400 mb-2">No checklist items available.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4">
      {items.map((item) => (
        <ChecklistItemComponent 
          key={item.id}
          item={item} 
          isCurrentItem={currentItem === item.id - 1}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
};
