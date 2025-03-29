
import React from 'react';
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface KnowledgeSearchProps {
  query: string;
  onChange: (query: string) => void;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({
  query,
  onChange,
  className,
  placeholder = "Search knowledge base...",
  autoFocus = false
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="pl-9 w-full"
        autoFocus={autoFocus}
        aria-label="Search knowledge base"
      />
    </div>
  );
};
