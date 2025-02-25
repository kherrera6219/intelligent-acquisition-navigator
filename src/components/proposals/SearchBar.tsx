
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingState } from '@/components/ui/universal/LoadingState';

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isValidating: boolean;
  searchRef: React.RefObject<HTMLInputElement>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onChange,
  onClear,
  isValidating,
  searchRef
}) => {
  return (
    <div className="relative w-full sm:max-w-sm">
      <Input
        ref={searchRef}
        type="text"
        placeholder="Search proposals..."
        value={searchTerm}
        onChange={onChange}
        className="pr-10 w-full"
        aria-label="Search"
        disabled={isValidating}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
          onClick={onClear}
          aria-label="Clear search"
        >
          ×
        </Button>
      )}
      {isValidating && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2">
          <LoadingState variant="inline" size="sm" />
        </div>
      )}
    </div>
  );
};
