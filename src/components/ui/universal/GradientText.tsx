
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
  direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  from = 'from-primary',
  to = 'to-purple-600',
  direction = 'to-r',
}) => {
  return (
    <span 
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r',
        `bg-gradient-${direction}`,
        from,
        to,
        className
      )}
    >
      {children}
    </span>
  );
};
