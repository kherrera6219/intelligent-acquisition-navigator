
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface DocumentSearchBarProps {
  onSearch: (term: string) => void;
}

export const DocumentSearchBar: React.FC<DocumentSearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <Input
        type="text"
        placeholder="Search documents..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
    </form>
  );
};
