
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  center?: boolean;
  fullPage?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  className,
  size = 'md',
  center = true,
  fullPage = false,
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

  return (
    <div className={containerClasses}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {message && (
        <p className="mt-3 text-sm">{message}</p>
      )}
    </div>
  );
};
