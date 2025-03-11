
import React from 'react';
import { cn } from "@/lib/utils";

export interface MsLoadingProps {
  variant?: 'spinner' | 'shimmer' | 'progress' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  fullscreen?: boolean;
}

export const MsLoading: React.FC<MsLoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  message,
  className,
  fullscreen = false
}) => {
  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    fullscreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
    className
  );

  const contentClasses = cn(
    "text-center",
    fullscreen ? "loading-scale-in" : "loading-fade-in",
    "flex flex-col items-center"
  );

  const renderLoader = () => {
    switch (variant) {
      case 'shimmer':
        return (
          <div className={cn(
            "ms-loading-shimmer rounded-md bg-white/10",
            size === 'sm' && "w-12 h-12",
            size === 'md' && "w-16 h-16",
            size === 'lg' && "w-24 h-24"
          )} />
        );
      case 'progress':
        return (
          <div className={cn(
            "ms-loading-progress",
            size === 'sm' && "w-24",
            size === 'md' && "w-40",
            size === 'lg' && "w-64"
          )} />
        );
      case 'dots':
        return (
          <div className={cn(
            "ms-loading-dots font-semibold",
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
          <div className={cn(
            "loading-spinner",
            size === 'sm' && "w-5 h-5 border-2",
            size === 'md' && "w-8 h-8 border-3",
            size === 'lg' && "w-12 h-12 border-4"
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
            "font-medium mt-3",
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
