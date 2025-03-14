
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface MarketResearchFilterProps {
  onSearch: (term: string) => void;
  onCategoryChange: (category: string | null) => void;
  onStatusChange: (status: string | null) => void;
  searchTerm: string;
  selectedCategory: string | null;
  selectedStatus: string | null;
}

const MarketResearchFilter: React.FC<MarketResearchFilterProps> = ({
  onSearch,
  onCategoryChange,
  onStatusChange,
  searchTerm,
  selectedCategory,
  selectedStatus
}) => {
  return (
    <Card className="p-5 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Market Research</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by vendor or category"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            className="w-full mt-1 px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value || null)}
          >
            <option value="">All Categories</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Cloud">Cloud</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="w-full mt-1 px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedStatus || ''}
            onChange={(e) => onStatusChange(e.target.value || null)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button 
          variant="outline" 
          className="mr-2"
          onClick={() => {
            onSearch('');
            onCategoryChange(null);
            onStatusChange(null);
          }}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
};

export default MarketResearchFilter;
