
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DocsSearchProps {
  onSearch: (query: string) => void;
}

export const DocsSearch: React.FC<DocsSearchProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search documentation..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-background border-border/60"
        />
      </div>
    </form>
  );
};
