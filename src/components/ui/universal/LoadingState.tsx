
import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  className?: string;
  message?: string;
  variant?: 'spinner' | 'skeleton';
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  className,
  message = "Loading...",
  variant = 'spinner'
}) => {
  if (variant === 'skeleton') {
    return (
      <div className={cn("w-full space-y-4", className)}>
        <Skeleton className="h-8 w-full max-w-sm" />
        <Skeleton className="h-64 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-muted-foreground font-medium">{message}</p>
    </div>
  );
};
