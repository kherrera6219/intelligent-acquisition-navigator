
import React from 'react';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className,
}) => {
  // This is a simplified version
  // In a production app, this would use a proper animation library
  
  return (
    <div
      className={cn(
        "animate-in fade-in duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};
