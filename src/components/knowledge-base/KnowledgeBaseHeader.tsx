
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface KnowledgeBaseHeaderProps {
  onSearch: (query: string) => void;
  onCreateNew: () => void;
}

export const KnowledgeBaseHeader = ({ onSearch, onCreateNew }: KnowledgeBaseHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <h1 className="text-2xl font-bold">Knowledge Base</h1>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge base..."
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <Button onClick={onCreateNew}>
          Add New
        </Button>
      </div>
    </div>
  );
};
