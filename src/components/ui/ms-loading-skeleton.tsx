
import React from 'react';
import { cn } from '@/lib/utils';

export interface MsLoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangle' | 'circle' | 'avatar';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'shimmer' | 'none';
  count?: number;
}

export const MsLoadingSkeleton: React.FC<MsLoadingSkeletonProps> = ({
  className,
  variant = 'rectangle',
  width,
  height,
  animation = 'shimmer',
  count = 1
}) => {
  // Determine base style based on variant
  const getBaseStyle = () => {
    const baseClasses = {
      text: 'h-4 rounded w-full',
      rectangle: 'rounded-md',
      circle: 'rounded-full aspect-square',
      avatar: 'rounded-full aspect-square'
    };
    
    return baseClasses[variant];
  };
  
  // Apply animation
  const getAnimationClass = () => {
    const animationClasses = {
      pulse: 'ms-pulse',
      shimmer: 'ms-shimmer',
      none: ''
    };
    
    return animationClasses[animation];
  };
  
  // Create style object for width and height
  const style: React.CSSProperties = {};
  
  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  
  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }
  
  // For multiple skeletons
  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'bg-muted/70',
              getBaseStyle(),
              getAnimationClass(),
              className,
              index < count - 1 && 'mb-2'
            )}
            style={style}
            aria-hidden="true"
          />
        ))}
      </>
    );
  }
  
  // Single skeleton
  return (
    <div
      className={cn(
        'bg-muted/70',
        getBaseStyle(),
        getAnimationClass(),
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
};
