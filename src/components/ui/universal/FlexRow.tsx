
import React from 'react';
import { cn } from '@/lib/utils';

interface FlexRowProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  reverse?: boolean;
  responsive?: boolean;
  as?: React.ElementType;
}

export const FlexRow: React.FC<FlexRowProps> = ({
  children,
  className,
  gap = 'md',
  align = 'center',
  justify = 'start',
  wrap = true,
  reverse = false,
  responsive = false,
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
      default: return 'items-center';
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
        responsive ? 'flex flex-col md:flex-row' : 'flex',
        reverse && responsive ? 'flex-col-reverse md:flex-row-reverse' : reverse ? 'flex-row-reverse' : '',
        wrap && 'flex-wrap',
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
