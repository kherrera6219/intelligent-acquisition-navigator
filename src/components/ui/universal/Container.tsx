
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  as?: React.ElementType;
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
  as: Component = 'div',
  id
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-screen-2xl',
    'full': 'max-w-full'
  };

  return (
    <Component 
      id={id}
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
};
