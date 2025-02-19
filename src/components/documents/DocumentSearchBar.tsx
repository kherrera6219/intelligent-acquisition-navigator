
import React from "react";
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Upload, Loader2 } from "lucide-react";
import { LoadingState } from "@/components/ui/universal/LoadingState";

interface DocumentSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onUploadClick: () => void;
  isLoading: boolean;
}

export const DocumentSearchBar = ({
  searchTerm,
  onSearchChange,
  onUploadClick,
  isLoading
}: DocumentSearchBarProps) => {
  return (
    <Card className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
        <div className="relative w-full sm:w-auto sm:flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search documents..."
            className="pl-10 bg-white/5 border-white/10 w-full"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search documents"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-white/10 flex-1 sm:flex-none"
            aria-label="Open filters"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
          <Button
            onClick={onUploadClick}
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                     hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600
                     flex-1 sm:flex-none"
            disabled={isLoading}
            aria-label="Upload document"
          >
            {isLoading ? (
              <LoadingState variant="inline" size="sm" message="" />
            ) : (
              <Upload className="h-5 w-5 mr-2" />
            )}
            Upload Document
          </Button>
        </div>
      </div>
    </Card>
  );
};
