
import React from 'react';
import { cn } from '@/lib/utils';

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6;
type GridGap = 'sm' | 'md' | 'lg';

interface MsDashboardGridProps {
  children: React.ReactNode;
  columns: GridColumns;
  gap?: GridGap;
  className?: string;
}

export const MsDashboardGrid: React.FC<MsDashboardGridProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className,
}) => {
  const getColumnsClasses = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 5: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      case 6: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getGapClasses = () => {
    switch (gap) {
      case 'sm': return 'gap-2 sm:gap-3';
      case 'lg': return 'gap-5 sm:gap-6';
      case 'md':
      default: return 'gap-3 sm:gap-4';
    }
  };

  return (
    <div 
      className={cn(
        'grid w-full',
        getColumnsClasses(),
        getGapClasses(),
        className
      )}
    >
      {children}
    </div>
  );
};
