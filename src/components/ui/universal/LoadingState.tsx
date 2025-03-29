
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  center?: boolean;
  fullPage?: boolean;
  variant?: 'default' | 'spinner' | 'skeleton' | 'inline';
  skeletonCount?: number;
  skeletonClassName?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  className,
  size = 'md',
  center = true,
  fullPage = false,
  variant = 'default',
  skeletonCount = 3,
  skeletonClassName,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = cn(
    'flex flex-col items-center justify-center text-muted-foreground',
    center && 'mx-auto',
    fullPage && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
    className
  );

  // Render inline variant (used in buttons, etc.)
  if (variant === 'inline') {
    return (
      <span className={cn('flex items-center gap-2', className)}>
        <Loader2 className={cn('animate-spin', sizeClasses[size])} />
        {message && <span className="text-sm">{message}</span>}
      </span>
    );
  }

  // Render skeleton loading placeholders
  if (variant === 'skeleton') {
    return (
      <div className={cn('w-full space-y-4', className)}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div 
            key={index}
            className={cn(
              'loading-skeleton rounded-md', 
              skeletonClassName || 'h-20 w-full'
            )}
          />
        ))}
      </div>
    );
  }

  // Default spinner variant
  return (
    <div className={containerClasses}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {message && (
        <p className="mt-3 text-sm">{message}</p>
      )}
    </div>
  );
};
