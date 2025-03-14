
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ChecklistSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterOptions: { completed?: boolean; pending?: boolean };
  onFilterChange: (filter: { completed?: boolean; pending?: boolean }) => void;
}

export const ChecklistSearch: React.FC<ChecklistSearchProps> = ({
  searchQuery,
  onSearchChange,
  filterOptions,
  onFilterChange
}) => {
  const handleClearSearch = () => {
    onSearchChange('');
  };

  const handleFilterCompleted = () => {
    onFilterChange({ completed: true });
  };

  const handleFilterPending = () => {
    onFilterChange({ pending: true });
  };

  const handleClearFilter = () => {
    onFilterChange({});
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search checklist items..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <Button
          variant={filterOptions.completed ? "default" : "outline"}
          size="sm"
          onClick={handleFilterCompleted}
          className="text-xs h-7"
        >
          Completed
        </Button>
        <Button
          variant={filterOptions.pending ? "default" : "outline"}
          size="sm"
          onClick={handleFilterPending}
          className="text-xs h-7"
        >
          Pending
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilter}
          className="text-xs h-7"
        >
          All
        </Button>
      </div>
    </div>
  );
};
