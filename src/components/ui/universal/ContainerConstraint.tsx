
import React from 'react';
import { cn } from '@/lib/utils';

export type ContainerSize = 'narrow' | 'wide' | 'full';

export interface ContainerConstraintProps {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
  fullWidth?: boolean;
}

export const ContainerConstraint: React.FC<ContainerConstraintProps> = ({
  children,
  className,
  size,
  fullWidth = false,
}) => {
  const getWidthClass = () => {
    if (fullWidth || size === 'full') return 'w-full';
    if (size === 'narrow') return 'max-w-3xl mx-auto';
    if (size === 'wide') return 'max-w-7xl mx-auto';
    return 'max-w-5xl mx-auto';
  };

  return (
    <div className={cn('px-4 sm:px-6 lg:px-8', getWidthClass(), className)}>
      {children}
    </div>
  );
};
