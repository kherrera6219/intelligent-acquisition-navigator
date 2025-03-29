
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { KnowledgeBaseItemType } from "@/types/knowledge-base";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface KnowledgeBaseFiltersProps {
  onFilterChange: (filters: { types: KnowledgeBaseItemType[], tags: string[] }) => void;
  availableTags: string[];
  className?: string;
}

export const KnowledgeBaseFilters: React.FC<KnowledgeBaseFiltersProps> = ({
  onFilterChange,
  availableTags,
  className
}) => {
  // Available types for filtering
  const availableTypes: KnowledgeBaseItemType[] = [
    "document",
    "regulation",
    "template",
    "software",
    "process",
    "research"
  ];

  // State for selected filters
  const [selectedTypes, setSelectedTypes] = useState<KnowledgeBaseItemType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  // Type labels for display
  const typeLabels: Record<KnowledgeBaseItemType, string> = {
    document: "Documents",
    regulation: "Regulations",
    template: "Templates",
    software: "Software",
    process: "Processes",
    research: "Research"
  };

  // Handle type selection
  const handleTypeToggle = (type: KnowledgeBaseItemType) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setTagInput('');
    setSuggestedTags([]);
  };

  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    
    if (value.trim() === '') {
      setSuggestedTags([]);
    } else {
      const filteredTags = availableTags
        .filter(tag => 
          tag.toLowerCase().includes(value.toLowerCase()) && 
          !selectedTags.includes(tag)
        )
        .slice(0, 5);
      setSuggestedTags(filteredTags);
    }
  };

  // Handle tag input keydown
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '' && suggestedTags.length > 0) {
      e.preventDefault();
      handleTagToggle(suggestedTags[0]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedTags([]);
    setTagInput('');
  };

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({
      types: selectedTypes,
      tags: selectedTags
    });
  }, [selectedTypes, selectedTags, onFilterChange]);

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Filter by Type</h3>
          {selectedTypes.length > 0 && (
            <button 
              onClick={() => setSelectedTypes([])}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              aria-label="Clear type filters"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableTypes.map(type => (
            <Badge
              key={type}
              variant={selectedTypes.includes(type) ? "default" : "outline"}
              className={cn(
                "cursor-pointer hover:bg-accent/50 transition-colors",
                selectedTypes.includes(type) ? "bg-primary/20 hover:bg-primary/30 text-primary border-primary/30" : ""
              )}
              onClick={() => handleTypeToggle(type)}
              role="checkbox"
              aria-checked={selectedTypes.includes(type)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTypeToggle(type);
                }
              }}
            >
              {selectedTypes.includes(type) && <Check className="h-3 w-3 mr-1" />}
              {typeLabels[type]}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Filter by Tags</h3>
          {selectedTags.length > 0 && (
            <button 
              onClick={() => setSelectedTags([])}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              aria-label="Clear tag filters"
            >
              Clear
            </button>
          )}
        </div>
        
        <div className="relative mb-2">
          <Input
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
            placeholder="Search for tags..."
            className="w-full text-sm"
            aria-label="Search for tags"
          />
          
          {suggestedTags.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-md max-h-48 overflow-y-auto">
              {suggestedTags.map(tag => (
                <div
                  key={tag}
                  className="px-3 py-2 hover:bg-accent/20 cursor-pointer text-sm"
                  onClick={() => handleTagToggle(tag)}
                  role="option"
                  aria-selected={selectedTags.includes(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1 bg-secondary/20"
              >
                {tag}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleTagToggle(tag)}
                  role="button"
                  aria-label={`Remove ${tag} tag`}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {(selectedTypes.length > 0 || selectedTags.length > 0) && (
        <div className="pt-2">
          <button
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-primary underline transition-colors"
            aria-label="Reset all filters"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};
