
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface MsLoadingProps {
  variant?: 'spinner' | 'progress' | 'dots' | 'shimmer' | 'skeleton';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  messageClassName?: string;
  center?: boolean;
  inline?: boolean;
  fullscreen?: boolean;
  count?: number;
  skeletonClassName?: string;
}

export const MsLoading: React.FC<MsLoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  message,
  className,
  messageClassName,
  center = true,
  inline = false,
  fullscreen = false,
  count = 3,
  skeletonClassName,
}) => {
  // Size classes for spinner
  const sizeClasses = {
    xs: 'ms-loading-xs',
    sm: 'ms-loading-sm',
    md: 'ms-loading-md',
    lg: 'ms-loading-lg'
  };

  // Spinner Component
  if (variant === 'spinner') {
    const containerClasses = cn(
      'ms-loading',
      inline ? 'inline-flex items-center gap-2' : 'flex flex-col items-center',
      center && !inline && 'mx-auto',
      fullscreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      className
    );

    return (
      <div className={containerClasses}>
        <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
        {message && (
          <span className={cn('text-muted-foreground mt-2', messageClassName)}>
            {message}
          </span>
        )}
      </div>
    );
  }

  // Progress Bar Component
  if (variant === 'progress') {
    const containerClasses = cn(
      'ms-loading',
      center && 'mx-auto',
      fullscreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      className
    );

    return (
      <div className={containerClasses}>
        <div className="ms-progress-indeterminate w-full max-w-xs"></div>
        {message && (
          <span className={cn('text-muted-foreground mt-2 ms-loading-dots', messageClassName)}>
            {message}
          </span>
        )}
      </div>
    );
  }

  // Dots Loading Component
  if (variant === 'dots') {
    const containerClasses = cn(
      'ms-loading',
      center && 'mx-auto',
      fullscreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      className
    );

    return (
      <div className={containerClasses}>
        <span className={cn('text-muted-foreground ms-loading-dots', messageClassName)}>
          {message || 'Loading'}
        </span>
      </div>
    );
  }

  // Shimmer Component
  if (variant === 'shimmer') {
    const containerClasses = cn(
      'ms-loading',
      center && 'mx-auto',
      fullscreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      className
    );

    // Shimmer elements
    const shimmerElements = Array.from({ length: count }).map((_, index) => (
      <div 
        key={index} 
        className={cn(
          'ms-shimmer rounded-md h-4 w-full mb-2 last:mb-0',
          index % 3 === 0 && 'w-3/4',
          index % 3 === 1 && 'w-2/3',
          skeletonClassName
        )} 
      />
    ));

    return (
      <div className={containerClasses}>
        <div className="w-full">
          {shimmerElements}
        </div>
        {message && (
          <p className={cn('text-muted-foreground mt-2', messageClassName)}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Skeleton Component
  if (variant === 'skeleton') {
    const containerClasses = cn(
      'w-full',
      center && 'mx-auto',
      className
    );

    // Skeleton elements
    const skeletonElements = Array.from({ length: count }).map((_, index) => (
      <div 
        key={index} 
        className={cn(
          'ms-shimmer rounded-md h-4 w-full mb-2 last:mb-0',
          index % 3 === 0 && 'w-3/4',
          index % 3 === 1 && 'w-2/3',
          skeletonClassName
        )} 
      />
    ));

    return (
      <div className={containerClasses}>
        {skeletonElements}
      </div>
    );
  }

  // Default fallback
  return (
    <div className={cn('ms-loading', center && 'mx-auto', className)}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {message && <p className="mt-2 text-muted-foreground">{message}</p>}
    </div>
  );
};
