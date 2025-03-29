
import React from 'react';
import { cn } from '@/lib/utils';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'prose';

interface ContainerConstraintProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Component for implementing consistent width constraints 
 * following Microsoft Fluent UI design principles.
 */
export const ContainerConstraint: React.FC<ContainerConstraintProps> = ({
  children,
  size = 'lg',
  className,
  as: Component = 'div',
}) => {
  const containerSizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'w-full',
    prose: 'max-w-prose',
  };

  return (
    <Component className={cn('mx-auto px-4 sm:px-6 lg:px-8', containerSizeClasses[size], className)}>
      {children}
    </Component>
  );
};

export default ContainerConstraint;
