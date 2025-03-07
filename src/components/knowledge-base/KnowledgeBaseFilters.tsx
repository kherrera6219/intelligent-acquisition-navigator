
import { useState } from "react";
import { KnowledgeBaseItemType } from "@/types/knowledge-base";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KnowledgeBaseFiltersProps {
  onFilterChange: (filters: {
    types: KnowledgeBaseItemType[];
    tags: string[];
  }) => void;
  availableTags: string[];
}

export const KnowledgeBaseFilters = ({ 
  onFilterChange, 
  availableTags 
}: KnowledgeBaseFiltersProps) => {
  const [selectedTypes, setSelectedTypes] = useState<KnowledgeBaseItemType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const typeOptions: { value: KnowledgeBaseItemType; label: string }[] = [
    { value: 'document', label: 'Documents' },
    { value: 'regulation', label: 'Regulations' },
    { value: 'template', label: 'Templates' },
    { value: 'software', label: 'Software' },
    { value: 'process', label: 'Processes' },
    { value: 'research', label: 'Research' }
  ];

  const toggleType = (type: KnowledgeBaseItemType) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    
    setSelectedTypes(newTypes);
    onFilterChange({ types: newTypes, tags: selectedTags });
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    onFilterChange({ types: selectedTypes, tags: newTags });
  };

  return (
    <div className="mb-6 space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Filter by Type</h3>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map(type => (
            <Button
              key={type.value}
              variant={selectedTypes.includes(type.value) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleType(type.value)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {availableTags.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Filter by Tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
