
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  [key: string]: any;
}

interface RowProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

interface ColProps {
  children: React.ReactNode;
  className?: string;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  [key: string]: any;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className, 
  fluid = false,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'w-full mx-auto px-4', 
        fluid ? 'max-w-full' : 'max-w-7xl',
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
  ...props 
}) => {
  return (
    <div 
      className={cn('flex flex-wrap -mx-4', className)} 
      {...props}
    >
      {children}
    </div>
  );
};

export const Col: React.FC<ColProps> = ({ 
  children, 
  className,
  sm,
  md, 
  lg,
  xl,
  ...props 
}) => {
  const getColClasses = () => {
    const classes = ['px-4'];
    
    if (sm) {
      classes.push(`sm:w-${sm}/12`);
    }
    
    if (md) {
      classes.push(`md:w-${md}/12`);
    }
    
    if (lg) {
      classes.push(`lg:w-${lg}/12`);
    }
    
    if (xl) {
      classes.push(`xl:w-${xl}/12`);
    }
    
    // Default width (if no breakpoints specified)
    if (!sm && !md && !lg && !xl) {
      classes.push('w-full');
    }
    
    return classes.join(' ');
  };
  
  return (
    <div 
      className={cn(getColClasses(), className)} 
      {...props}
    >
      {children}
    </div>
  );
};
