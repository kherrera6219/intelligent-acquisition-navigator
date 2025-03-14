
import React from 'react';
import { Label } from '@/components/ui/label';

interface CodeReviewFiltersProps {
  filter: 'all' | 'pending' | 'in-progress' | 'completed' | string;
  setFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  categories: string[];
}

export const CodeReviewFilters: React.FC<CodeReviewFiltersProps> = ({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  categories
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <div className="flex items-center mr-4">
        <Label htmlFor="status-filter" className="mr-2">Status:</Label>
        <select 
          id="status-filter"
          className="bg-background border border-input rounded-md px-3 py-1 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="flex items-center">
        <Label htmlFor="category-filter" className="mr-2">Category:</Label>
        <select 
          id="category-filter"
          className="bg-background border border-input rounded-md px-3 py-1 text-sm"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
