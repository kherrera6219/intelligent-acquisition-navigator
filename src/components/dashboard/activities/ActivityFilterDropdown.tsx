
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ActivityFilterDropdownProps {
  currentFilter: string | null;
  categories: string[];
  onFilterChange: (category: string | null) => void;
}

export const ActivityFilterDropdown: React.FC<ActivityFilterDropdownProps> = ({
  currentFilter,
  categories,
  onFilterChange
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline" 
          size="sm"
          className="h-8 px-2 flex items-center"
          aria-label="Filter activities"
        >
          <Filter className="h-4 w-4 mr-1" />
          {currentFilter ? currentFilter : 'All'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onFilterChange(null)}>
          All
        </DropdownMenuItem>
        {categories.map((category) => (
          <DropdownMenuItem key={category} onClick={() => onFilterChange(category)}>
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
