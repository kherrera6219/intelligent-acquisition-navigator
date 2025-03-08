
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
  ariaLabel?: string;
  debounceMs?: number;
  autoFocus?: boolean;
  id?: string;
  disabled?: boolean;
  maxWidth?: string;
  formAction?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
  initialValue = "",
  className,
  ariaLabel = "Search",
  debounceMs = 300,
  autoFocus = false,
  id = "search-input",
  disabled = false,
  maxWidth = "md",
  formAction,
  onChange
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle prop changes to initialValue
  useEffect(() => {
    if (initialValue !== query) {
      setQuery(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (onSearch) {
      debounceTimerRef.current = setTimeout(() => {
        onSearch(query);
      }, debounceMs);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, onSearch, debounceMs]);

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("");
    if (onChange) onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onChange) onChange(e);
  };

  const maxWidthClasses = {
    sm: "max-w-xs",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "w-full"
  };

  const renderFormOrDiv = () => {
    const searchInput = (
      <>
        <div className="absolute left-3 text-gray-400 flex items-center pointer-events-none">
          <Search size={18} aria-hidden="true" />
        </div>
        
        <Input
          ref={inputRef}
          id={id}
          type="text"
          name="search"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className="pl-10 pr-10 py-2 bg-background border-white/10 focus:border-primary/50 w-full transition-all"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          data-testid="search-input"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </>
    );

    if (formAction) {
      return (
        <form action={formAction} role="search" className="w-full">
          {searchInput}
        </form>
      );
    }

    return searchInput;
  };

  return (
    <div className={cn(
      "relative flex items-center w-full",
      maxWidthClasses[maxWidth as keyof typeof maxWidthClasses] || maxWidthClasses.md,
      className
    )}>
      {renderFormOrDiv()}
    </div>
  );
};
