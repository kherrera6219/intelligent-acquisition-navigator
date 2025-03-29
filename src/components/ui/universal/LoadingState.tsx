
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { MsLoading } from '@/components/ui/ms-loading';

export interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  center?: boolean;
  fullPage?: boolean;
  variant?: 'default' | 'spinner' | 'skeleton' | 'inline' | 'shimmer' | 'progress' | 'dots';
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
  // For skeleton variant, use MsLoading with skeleton variant
  if (variant === 'skeleton') {
    return (
      <MsLoading
        variant="skeleton"
        count={skeletonCount}
        skeletonClassName={skeletonClassName}
        className={className}
        center={center}
      />
    );
  }
  
  // For inline variant, use MsLoading with inline prop
  if (variant === 'inline') {
    return (
      <MsLoading
        variant="spinner"
        message={message}
        size={size}
        className={className}
        inline={true}
      />
    );
  }
  
  // For shimmer variant
  if (variant === 'shimmer') {
    return (
      <MsLoading
        variant="shimmer"
        message={message}
        size={size}
        className={className}
        center={center}
        fullscreen={fullPage}
      />
    );
  }
  
  // For progress variant
  if (variant === 'progress') {
    return (
      <MsLoading
        variant="progress"
        message={message}
        size={size}
        className={className}
        center={center}
        fullscreen={fullPage}
      />
    );
  }
  
  // For dots variant
  if (variant === 'dots') {
    return (
      <MsLoading
        variant="dots"
        message={message}
        size={size}
        className={className}
        center={center}
        fullscreen={fullPage}
      />
    );
  }

  // Default fallback for backward compatibility
  const sizeClasses = {
    xs: 'h-3 w-3',
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

  // Default spinner variant (for backward compatibility)
  return (
    <div className={containerClasses}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {message && (
        <p className="mt-3 text-sm">{message}</p>
      )}
    </div>
  );
};
