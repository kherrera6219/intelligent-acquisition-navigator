
import React from 'react';
import { cn } from '@/lib/utils';

export interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className
}) => {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600',
        className
      )}
    >
      {children}
    </span>
  );
};
