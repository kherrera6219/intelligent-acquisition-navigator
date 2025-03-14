
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div 
      className={cn(
        "bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg transition-all duration-200",
        onClick && "cursor-pointer hover:border-border/60 hover:shadow-md hover:bg-card/60",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
