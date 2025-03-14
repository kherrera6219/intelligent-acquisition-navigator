
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChecklistItem as ChecklistItemType } from '@/types/checklist';

interface ChecklistItemProps {
  item: ChecklistItemType;
  isCurrentItem: boolean;
  onToggle: () => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  isCurrentItem,
  onToggle
}) => {
  return (
    <Card
      className={cn(
        "p-4 hover:bg-muted/50 transition-colors cursor-pointer",
        isCurrentItem && "border-primary/50 bg-primary/5",
        item.completed && "bg-green-50 dark:bg-green-900/10"
      )}
      onClick={() => onToggle()}
    >
      <div className="flex items-start gap-2">
        <Checkbox
          checked={item.completed}
          onCheckedChange={() => onToggle()}
          className={cn(
            "mt-1",
            item.completed && "bg-green-500 text-primary-foreground"
          )}
        />
        <div>
          <h3 className={cn(
            "text-base font-medium",
            item.completed && "line-through text-muted-foreground"
          )}>
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {item.description}
          </p>
        </div>
      </div>
    </Card>
  );
};
