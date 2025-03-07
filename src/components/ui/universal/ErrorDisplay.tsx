
import React from 'react';
import { cn } from "@/lib/utils";
import { AlertTriangle, Bug, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/universal/Card";

interface ErrorDisplayProps {
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
  resetError?: () => void;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  errorInfo,
  resetError,
  className
}) => {
  if (!error) return null;

  return (
    <Card className={cn(
      "p-6 border border-red-500/20 bg-red-500/5",
      className
    )}>
      <div className="flex flex-col items-center text-center mb-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
        <p className="text-sm text-gray-400 max-w-md">
          {error.message || "An unexpected error occurred. Please try again or contact support if the problem persists."}
        </p>
      </div>

      {errorInfo && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <details className="text-xs">
            <summary className="text-sm text-red-300 flex items-center gap-2 cursor-pointer">
              <Bug className="h-4 w-4" />
              <span>Technical Details (for developers)</span>
            </summary>
            <div className="mt-2 p-2 bg-black/50 rounded overflow-auto max-h-[200px] text-gray-400">
              <pre>{errorInfo.componentStack}</pre>
            </div>
          </details>
        </div>
      )}

      {resetError && (
        <div className="mt-4 text-center">
          <Button 
            onClick={resetError}
            variant="outline"
            className="flex items-center gap-2 hover:bg-red-500/10"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
        </div>
      )}
    </Card>
  );
};
