
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  as?: React.ElementType;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 12 },
  gap = 'md',
  as: Component = 'div'
}) => {
  const getColsClasses = () => {
    const classes = [];
    
    if (cols.xs) classes.push(`grid-cols-${cols.xs}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols.xxl) classes.push(`2xl:grid-cols-${cols.xxl}`);
    
    return classes.join(' ');
  };
  
  const getGapClass = () => {
    switch (gap) {
      case 'none': return 'gap-0';
      case 'xs': return 'gap-1';
      case 'sm': return 'gap-2';
      case 'md': return 'gap-4';
      case 'lg': return 'gap-6';
      case 'xl': return 'gap-8';
      default: return 'gap-4';
    }
  };
  
  return (
    <Component className={cn('grid', getColsClasses(), getGapClass(), className)}>
      {children}
    </Component>
  );
};
