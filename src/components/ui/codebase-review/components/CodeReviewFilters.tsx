
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeReviewFiltersProps {
  filter: string;
  setFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
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
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label htmlFor="status-filter" className="block text-sm font-medium mb-2">
          Filter by Status
        </label>
        <Select
          value={filter}
          onValueChange={setFilter}
        >
          <SelectTrigger id="status-filter" className="w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Issues</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <label htmlFor="category-filter" className="block text-sm font-medium mb-2">
          Filter by Category
        </label>
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger id="category-filter" className="w-full">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
