
import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  className?: string;
  message?: string;
  variant?: 'spinner' | 'skeleton' | 'inline';
  skeletonCount?: number;
  skeletonClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  className,
  message = "Loading...",
  variant = 'spinner',
  skeletonCount = 3,
  skeletonClassName,
  size = 'md'
}) => {
  if (variant === 'skeleton') {
    return (
      <div className={cn("w-full space-y-4", className)}>
        {[...Array(skeletonCount)].map((_, index) => (
          <Skeleton 
            key={index} 
            className={cn("h-8 w-full", skeletonClassName)}
          />
        ))}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn("inline-flex items-center", className)}>
        <div className={cn(
          "animate-spin rounded-full border-2 border-t-transparent",
          size === 'sm' && "h-3 w-3",
          size === 'md' && "h-4 w-4",
          size === 'lg' && "h-5 w-5",
          "mr-2 border-current"
        )}></div>
        {message && <span className="text-current">{message}</span>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className={cn(
        "border-4 border-primary border-t-transparent rounded-full animate-spin mb-4",
        size === 'sm' && "h-8 w-8",
        size === 'md' && "h-12 w-12",
        size === 'lg' && "h-16 w-16"
      )}></div>
      <p className="text-muted-foreground font-medium">{message}</p>
    </div>
  );
};
