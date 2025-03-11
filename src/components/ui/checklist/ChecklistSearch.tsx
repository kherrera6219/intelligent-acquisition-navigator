
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface ChecklistSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ChecklistSearch: React.FC<ChecklistSearchProps> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="relative w-full mb-4">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search improvements..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-9 py-2 w-full bg-background/50 border-input"
        aria-label="Search checklist items"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-300"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
