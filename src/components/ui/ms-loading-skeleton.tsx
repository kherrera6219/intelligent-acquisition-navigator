
import React from 'react';
import { cn } from "@/lib/utils";

export interface MsLoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'text' | 'avatar' | 'button' | 'list' | 'table' | 'grid';
  count?: number;
  width?: string | number;
  height?: string | number;
}

export const MsLoadingSkeleton: React.FC<MsLoadingSkeletonProps> = ({
  variant = 'text',
  count = 1,
  width,
  height,
  className,
  ...props
}) => {
  const renderSkeleton = (index: number) => {
    const baseClasses = "ms-loading-shimmer rounded";
    
    const skeletonClasses = cn(
      baseClasses,
      variant === 'card' && "w-full h-40 rounded-xl",
      variant === 'text' && "w-full h-4",
      variant === 'avatar' && "w-10 h-10 rounded-full",
      variant === 'button' && "w-24 h-9 rounded-md",
      variant === 'list' && "w-full h-12 rounded-md",
      variant === 'table' && "w-full h-8 rounded-sm",
      variant === 'grid' && "aspect-square w-full rounded-lg",
      className
    );
    
    const style: React.CSSProperties = {
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    };
    
    return (
      <div 
        key={index}
        className={skeletonClasses}
        style={style}
        {...props}
      />
    );
  };
  
  if (count === 1) {
    return renderSkeleton(0);
  }
  
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => renderSkeleton(i))}
    </div>
  );
};

// Specialized skeleton components for common use cases
export const MsLoadingSkeletonText: React.FC<Omit<MsLoadingSkeletonProps, 'variant'>> = (props) => {
  return (
    <div className="space-y-2">
      <MsLoadingSkeleton variant="text" width="100%" {...props} />
      <MsLoadingSkeleton variant="text" width="90%" {...props} />
      <MsLoadingSkeleton variant="text" width="95%" {...props} />
      <MsLoadingSkeleton variant="text" width="85%" {...props} />
    </div>
  );
};

export const MsLoadingSkeletonCard: React.FC<Omit<MsLoadingSkeletonProps, 'variant'>> = (props) => {
  return (
    <div className="ms-fluent-card p-4">
      <div className="flex items-start gap-4">
        <MsLoadingSkeleton variant="avatar" {...props} />
        <div className="space-y-2 flex-1">
          <MsLoadingSkeleton variant="text" width="60%" height={6} {...props} />
          <MsLoadingSkeleton variant="text" width="40%" height={4} {...props} />
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <MsLoadingSkeleton variant="text" width="100%" {...props} />
        <MsLoadingSkeleton variant="text" width="90%" {...props} />
        <MsLoadingSkeleton variant="text" width="95%" {...props} />
      </div>
      <div className="flex justify-end mt-4">
        <MsLoadingSkeleton variant="button" {...props} />
      </div>
    </div>
  );
};

export const MsLoadingSkeletonTable: React.FC<Omit<MsLoadingSkeletonProps, 'variant'> & { rows?: number, columns?: number }> = ({ 
  rows = 5, 
  columns = 4,
  ...props 
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex gap-2 mb-2">
        {Array.from({ length: columns }, (_, i) => (
          <MsLoadingSkeleton 
            key={`header-${i}`} 
            variant="text" 
            className="h-8 font-semibold"
            width={`${100/columns}%`}
            {...props} 
          />
        ))}
      </div>
      
      {Array.from({ length: rows }, (_, i) => (
        <div key={`row-${i}`} className="flex gap-2">
          {Array.from({ length: columns }, (_, j) => (
            <MsLoadingSkeleton 
              key={`cell-${i}-${j}`} 
              variant="text"
              width={`${100/columns}%`} 
              {...props} 
            />
          ))}
        </div>
      ))}
    </div>
  );
};
