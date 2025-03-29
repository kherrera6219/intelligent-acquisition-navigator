
import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface MsLoadingProps {
  variant?: 'spinner' | 'shimmer' | 'progress' | 'dots' | 'skeleton';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  fullscreen?: boolean;
  count?: number;
  skeletonClassName?: string;
  center?: boolean;
  inline?: boolean;
}

export const MsLoading: React.FC<MsLoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  message,
  className,
  fullscreen = false,
  count = 3,
  skeletonClassName = "h-20 w-full",
  center = true,
  inline = false
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'h-3 w-3 border-2';
      case 'sm': return 'h-4 w-4 border-2';
      case 'lg': return 'h-12 w-12 border-4';
      case 'md':
      default: return 'h-8 w-8 border-3';
    }
  };

  const containerClasses = cn(
    "ms-motion-fadeIn",
    fullscreen ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50" : "",
    center && !inline ? "flex flex-col items-center justify-center" : "",
    inline ? "inline-flex items-center gap-2" : "",
    className
  );

  const contentClasses = cn(
    "text-center",
    fullscreen ? "loading-scale-in" : "loading-fade-in",
    !inline && "flex flex-col items-center"
  );

  // For inline variant (used in buttons, etc.)
  if (inline) {
    return (
      <span className={containerClasses}>
        <Loader2 className={cn('animate-spin', getSizeClasses())} />
        {message && <span className="text-sm">{message}</span>}
      </span>
    );
  }

  // For skeleton loading
  if (variant === 'skeleton') {
    return (
      <div className={cn('w-full space-y-4', containerClasses)}>
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index}
            className={cn(
              'ms-loading-shimmer rounded-md', 
              skeletonClassName
            )}
          />
        ))}
      </div>
    );
  }

  const renderLoader = () => {
    switch (variant) {
      case 'shimmer':
        return (
          <div className={cn(
            "ms-loading-shimmer rounded-md bg-white/10",
            size === 'xs' && "w-6 h-6",
            size === 'sm' && "w-12 h-12",
            size === 'md' && "w-16 h-16",
            size === 'lg' && "w-24 h-24"
          )} />
        );
      case 'progress':
        return (
          <div className={cn(
            "ms-loading-progress",
            size === 'xs' && "w-16",
            size === 'sm' && "w-24",
            size === 'md' && "w-40",
            size === 'lg' && "w-64"
          )} />
        );
      case 'dots':
        return (
          <div className={cn(
            "ms-loading-dots font-semibold",
            size === 'xs' && "text-xs",
            size === 'sm' && "text-sm",
            size === 'md' && "text-base",
            size === 'lg' && "text-lg"
          )}>
            {message || "Loading"}
          </div>
        );
      case 'spinner':
      default:
        return (
          <Loader2 className={cn(
            "animate-spin text-primary", 
            getSizeClasses()
          )} />
        );
    }
  };

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {renderLoader()}
        {message && variant !== 'dots' && (
          <p className={cn(
            "font-medium mt-3 text-muted-foreground",
            size === 'xs' && "text-xs",
            size === 'sm' && "text-xs",
            size === 'md' && "text-sm",
            size === 'lg' && "text-base"
          )}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
