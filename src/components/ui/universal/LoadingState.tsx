
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton';
  skeletonCount?: number;
  skeletonClassName?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...', 
  className = '',
  size = 'md',
  variant = 'spinner',
  skeletonCount = 3,
  skeletonClassName = ''
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  if (variant === 'skeleton') {
    return (
      <div className={cn("flex flex-col space-y-3", className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={cn("h-12 w-full rounded-md", skeletonClassName)} 
          />
        ))}
        {message && <p className="text-muted-foreground text-sm text-center mt-2">{message}</p>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <Loader2 className={cn("animate-spin mb-4 text-primary", sizeClasses[size])} />
      {message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
};
