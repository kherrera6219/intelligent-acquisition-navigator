
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
  ariaLabel?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search...",
  className,
  initialValue = '',
  ariaLabel,
  debounceMs = 300
}) => {
  const [searchValue, setSearchValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Handle outside clicks to remove focus
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Cleanup debounce timer on component unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Debounce search for better performance
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      onSearch(value);
    }, debounceMs);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <form 
      ref={searchRef}
      onSubmit={handleSubmit} 
      className={cn(
        "w-full relative group transition-all duration-200",
        isFocused ? "ring-1 ring-primary/20 rounded-md" : "",
        className
      )}
      role="search"
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        className={cn(
          "pl-10 pr-10 bg-white/5 border-white/10",
          "focus-visible:ring-primary/50 transition-all duration-200",
          isFocused ? "bg-white/10" : ""
        )}
        aria-label={ariaLabel || placeholder}
      />
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" 
        aria-hidden="true"
      />
      {searchValue && (
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-1 text-gray-500 hover:text-gray-400"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </form>
  );
};
