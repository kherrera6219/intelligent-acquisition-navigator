
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X, Filter } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface ChecklistSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterOptions?: {
    completed?: boolean;
    pending?: boolean;
  };
  onFilterChange?: (filter: { completed?: boolean; pending?: boolean }) => void;
}

export const ChecklistSearch: React.FC<ChecklistSearchProps> = ({ 
  searchQuery, 
  onSearchChange,
  filterOptions,
  onFilterChange
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [hasFilter, setHasFilter] = useState(false);
  
  // Initialize filter state from props if provided
  useEffect(() => {
    if (filterOptions) {
      setHasFilter(filterOptions.completed !== undefined || filterOptions.pending !== undefined);
    }
  }, [filterOptions]);

  // Debounce search to reduce API calls and improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchQuery !== searchQuery) {
        onSearchChange(localSearchQuery);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [localSearchQuery, onSearchChange, searchQuery]);

  const handleFilterChange = (option: 'all' | 'completed' | 'pending') => {
    if (!onFilterChange) return;
    
    if (option === 'all') {
      onFilterChange({});
      setHasFilter(false);
    } else if (option === 'completed') {
      onFilterChange({ completed: true });
      setHasFilter(true);
    } else if (option === 'pending') {
      onFilterChange({ pending: true });
      setHasFilter(true);
    }
  };

  return (
    <div className="relative w-full mb-4">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search improvements..."
        value={localSearchQuery}
        onChange={(e) => setLocalSearchQuery(e.target.value)}
        className="pl-10 pr-16 py-2 w-full bg-background/50 border-input transition-all duration-200 focus:ring-2 focus:ring-primary/50"
        aria-label="Search checklist items"
      />
      
      {localSearchQuery && (
        <button
          onClick={() => {
            setLocalSearchQuery('');
            onSearchChange('');
          }}
          className="absolute inset-y-0 right-10 flex items-center text-gray-400 hover:text-gray-300 transition-colors px-2"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      
      {onFilterChange && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className={`flex items-center justify-center p-1 rounded-full focus:outline-none transition-colors ${hasFilter ? 'text-primary bg-primary/20' : 'text-gray-400 hover:text-gray-300'}`}
                aria-label="Filter options"
              >
                <Filter className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleFilterChange('all')}>
                  All Items
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('completed')}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('pending')}>
                  Pending
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
