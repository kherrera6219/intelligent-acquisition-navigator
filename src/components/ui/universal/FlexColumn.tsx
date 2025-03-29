
import React from 'react';
import { cn } from '@/lib/utils';

interface FlexColumnProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  responsive?: boolean;
  reverse?: boolean;
  as?: React.ElementType;
}

export const FlexColumn: React.FC<FlexColumnProps> = ({
  children,
  className,
  gap = 'md',
  align = 'start',
  justify = 'start',
  responsive = false,
  reverse = false,
  as: Component = 'div'
}) => {
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
  
  const getAlignClass = () => {
    switch (align) {
      case 'start': return 'items-start';
      case 'center': return 'items-center';
      case 'end': return 'items-end';
      case 'stretch': return 'items-stretch';
      case 'baseline': return 'items-baseline';
      default: return 'items-start';
    }
  };
  
  const getJustifyClass = () => {
    switch (justify) {
      case 'start': return 'justify-start';
      case 'center': return 'justify-center';
      case 'end': return 'justify-end';
      case 'between': return 'justify-between';
      case 'around': return 'justify-around';
      case 'evenly': return 'justify-evenly';
      default: return 'justify-start';
    }
  };
  
  return (
    <Component 
      className={cn(
        responsive ? 'flex flex-row md:flex-col' : 'flex flex-col',
        reverse && responsive ? 'flex-row-reverse md:flex-col-reverse' : reverse ? 'flex-col-reverse' : '',
        getGapClass(),
        getAlignClass(),
        getJustifyClass(),
        className
      )}
    >
      {children}
    </Component>
  );
};
