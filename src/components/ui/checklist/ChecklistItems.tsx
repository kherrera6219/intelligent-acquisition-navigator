
import React from 'react';
import { ChecklistItem as ChecklistItemType } from '@/types/checklist';
import { ChecklistEmptyState } from './ChecklistEmptyState';
import { ChecklistItem } from './ChecklistItem';

interface ChecklistItemsProps {
  items: ChecklistItemType[];
  currentItem: number;
  onToggle: (id: number) => void;
}

export const ChecklistItems: React.FC<ChecklistItemsProps> = ({
  items,
  currentItem,
  onToggle
}) => {
  if (items.length === 0) {
    return <ChecklistEmptyState />;
  }

  return (
    <div className="grid gap-3 sm:gap-4">
      {items.map((item) => (
        <ChecklistItem 
          key={item.id}
          item={item} 
          isCurrentItem={currentItem === item.id - 1}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
};
