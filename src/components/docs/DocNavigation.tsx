
import React from 'react';
import { DocCategory } from './docsData';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icons } from './Icons';

interface DocNavigationProps {
  categories: DocCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const DocNavigation: React.FC<DocNavigationProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  // Flatten categories to get all items
  const allItems = categories.flatMap(category => category.items);
  
  return (
    <ScrollArea className="w-full whitespace-nowrap pb-2">
      <div className="flex items-center space-x-1 md:space-x-4">
        {allItems.map((item) => {
          const IconComponent = Icons[item.icon];
          return (
            <button
              key={item.id}
              onClick={() => onCategoryChange(item.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors whitespace-nowrap",
                item.id === activeCategory
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {IconComponent && <IconComponent className="h-4 w-4 flex-shrink-0" />}
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
