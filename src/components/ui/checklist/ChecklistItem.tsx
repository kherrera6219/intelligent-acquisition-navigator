
import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChecklistItem as ChecklistItemType } from '@/types/checklist';

interface ChecklistItemProps {
  item: ChecklistItemType;
  isCurrentItem: boolean;
  onToggle: () => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = memo(({ 
  item, 
  isCurrentItem, 
  onToggle 
}) => (
  <Card 
    className={cn(
      "p-3 sm:p-4 transition-all duration-300 cursor-pointer hover:bg-white/5",
      "transform hover:-translate-y-0.5 hover:shadow-lg border-2",
      item.completed ? 
        "bg-green-950/10 border-green-800/20 hover:border-green-500/30 shadow-sm shadow-green-900/5" : 
        "hover:border-primary/30 shadow-sm",
      isCurrentItem && "border-primary shadow-md shadow-primary/10"
    )}
    onClick={onToggle}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <div className={cn(
        "pt-1",
        item.completed ? "text-green-500" : "text-primary"
      )}>
        {item.completed ? (
          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 animate-in zoom-in-50 duration-300" />
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

ChecklistItem.displayName = 'ChecklistItem';
