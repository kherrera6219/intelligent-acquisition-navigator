
import React from 'react';
import { DocCategory } from './docsData';
import { cn } from '@/lib/utils';
import { Icons } from './Icons';

interface DocsSidebarProps {
  categories: DocCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="sticky top-24 max-h-[calc(100vh-theme(spacing.40))] overflow-y-auto pb-10 pr-4">
      <nav className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="space-y-2">
            <h3 className="font-medium text-sm text-fuchsia-400 uppercase tracking-wider">
              {category.label}
            </h3>
            
            <ul className="space-y-1">
              {category.items.map((item) => {
                const IconComponent = Icons[item.icon];
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onCategoryChange(item.id)}
                      className={cn(
                        "flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        item.id === activeCategory
                          ? "bg-primary/20 text-cyan-400 font-medium"
                          : "text-amber-300 hover:text-cyan-300 hover:bg-accent/50"
                      )}
                    >
                      {IconComponent && <IconComponent className="h-4 w-4 flex-shrink-0" />}
                      <span>{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};
