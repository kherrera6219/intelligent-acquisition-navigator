
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface KnowledgeSearchProps {
  query: string;
  onChange: (query: string) => void;
  className?: string;
}

export const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({ 
  query, 
  onChange,
  className 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional submit logic if needed
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className || ''}`}>
      <Input
        type="text"
        placeholder="Search knowledge base..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10"
      />
      <Button 
        type="submit" 
        size="icon" 
        variant="ghost" 
        className="absolute right-0 top-0 h-full px-3"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};
