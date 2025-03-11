
import React from 'react';
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface PageLoaderProps {
  message?: string;
  variant?: 'default' | 'minimal' | 'fluent';
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = "Loading...",
  variant = 'default'
}) => {
  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center p-4 min-h-[200px]">
        <LoadingSpinner size="md" />
      </div>
    );
  }
  
  if (variant === 'fluent') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50">
        <div className="ms-fluent-panel p-8 loading-scale-in flex flex-col items-center">
          <div className="ms-loading-progress mb-4 w-[200px]"></div>
          <p className="text-lg font-semibold text-foreground mt-4 ms-loading-dots">{message}</p>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="text-center loading-scale-in">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  );
};
