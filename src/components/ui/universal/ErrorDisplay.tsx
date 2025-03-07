
import React from 'react';
import { cn } from "@/lib/utils";
import { AlertTriangle, Bug, RefreshCw, Shield, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/universal/Card";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

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
  const isOnline = useNetworkStatus();
  const isNetworkError = error?.message.includes('network') || 
                         error?.message.includes('fetch') || 
                         error?.message.includes('connection');

  if (!error) return null;

  return (
    <Card className={cn(
      "p-6 border border-red-500/20 bg-red-500/5",
      className
    )}>
      <div className="flex flex-col items-center text-center mb-4">
        {isNetworkError ? (
          <WifiOff className="h-12 w-12 text-red-500 mb-4" />
        ) : (
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        )}
        
        <h2 className="text-xl font-semibold text-white mb-2">
          {isNetworkError 
            ? "Network Error" 
            : "Something went wrong"}
        </h2>
        
        <p className="text-sm text-gray-400 max-w-md">
          {isNetworkError && !isOnline
            ? "You're currently offline. Please check your internet connection and try again."
            : error.message || "An unexpected error occurred. Please try again or contact support if the problem persists."}
        </p>
        
        {isNetworkError && (
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
            <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isOnline ? 'Online - Reconnected' : 'Offline - No Connection'}</span>
          </div>
        )}
      </div>

      {errorInfo && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <details className="text-xs">
            <summary className="text-sm text-red-300 flex items-center gap-2 cursor-pointer">
              <Bug className="h-4 w-4" />
              <span>Technical Details (for developers)</span>
            </summary>
            <div className="mt-2 p-2 bg-black/50 rounded overflow-auto max-h-[200px] text-gray-400">
              <p className="mb-2 font-medium">Error: {error.name}</p>
              <p className="mb-2">Message: {error.message}</p>
              <p className="mb-2">Component Stack:</p>
              <pre>{errorInfo.componentStack}</pre>
            </div>
          </details>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        {resetError && (
          <Button 
            onClick={resetError}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2 hover:bg-red-500/10"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
        )}
        
        {isNetworkError && (
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            disabled={!isOnline}
          >
            <Wifi className="h-4 w-4" />
            <span>Refresh Page</span>
          </Button>
        )}
        
        <Button 
          variant="default"
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={() => window.history.back()}
        >
          <Shield className="h-4 w-4" />
          <span>Go Back</span>
        </Button>
      </div>
    </Card>
  );
};
