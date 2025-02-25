
import React from 'react';
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  error?: Error | null;
  resetError?: () => void;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  resetError,
  className
}) => {
  if (!error) return null;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[200px] p-6",
      "text-center bg-red-500/10 rounded-lg border border-red-500/20",
      className
    )}>
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-lg font-semibold text-red-500 mb-2">Something went wrong</h2>
      <p className="text-sm text-gray-400 mb-4 max-w-md">{error.message}</p>
      {resetError && (
        <Button 
          onClick={resetError}
          variant="outline"
          className="hover:bg-red-500/10"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
