
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  [key: string]: any;
}

interface RowProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  [key: string]: any;
}

interface ColProps {
  children: React.ReactNode;
  className?: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  [key: string]: any;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className, 
  fluid = false,
  size = 'xl',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };

  return (
    <div 
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8', 
        !fluid && sizeClasses[size],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export const Row: React.FC<RowProps> = ({ 
  children, 
  className,
  gap = 'md',
  ...props 
}) => {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  return (
    <div 
      className={cn('flex flex-wrap -mx-4', gapClasses[gap], className)} 
      {...props}
    >
      {children}
    </div>
  );
};

export const Col: React.FC<ColProps> = ({ 
  children, 
  className,
  xs,
  sm,
  md, 
  lg,
  xl,
  xxl,
  ...props 
}) => {
  const generateColClass = (size: number | undefined, prefix: string) => {
    if (size === undefined) return '';
    if (size === 0) return `${prefix}hidden`;
    if (size > 0 && size <= 12) return `${prefix}w-${size}/12`;
    return '';
  };
  
  return (
    <div 
      className={cn(
        'px-4',
        generateColClass(xs, ''),
        generateColClass(sm, 'sm:'),
        generateColClass(md, 'md:'),
        generateColClass(lg, 'lg:'),
        generateColClass(xl, 'xl:'),
        generateColClass(xxl, '2xl:'),
        // Default width if no breakpoints specified
        (!xs && !sm && !md && !lg && !xl && !xxl) && 'w-full',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

// Export a responsive grid system as well
interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number };
  gap?: string | number;
  [key: string]: any;
}

export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = 1,
  gap = 4,
  ...props
}) => {
  const getGridColsClasses = () => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }
    
    const { xs = 1, sm, md, lg, xl, xxl } = cols;
    
    return cn(
      `grid-cols-${xs}`,
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
      xxl && `2xl:grid-cols-${xxl}`
    );
  };
  
  return (
    <div 
      className={cn(
        'grid',
        getGridColsClasses(),
        typeof gap === 'string' ? gap : `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
