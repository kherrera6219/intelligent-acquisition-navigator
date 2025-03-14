
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'outline' | 'elevated' | 'subtle';
  hoverable?: boolean;
  noShadow?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  onClick, 
  variant = 'default',
  hoverable = false, 
  noShadow = false
}) => {
  const variantClasses = {
    default: "bg-card/50 backdrop-blur-sm border border-border/40",
    glass: "bg-background/20 backdrop-blur-md border border-border/30",
    outline: "bg-transparent border border-border/70",
    elevated: "bg-card shadow-md border border-border/30",
    subtle: "bg-card/20 border border-border/20"
  };

  return (
    <div 
      className={cn(
        "rounded-lg transition-all duration-200",
        variantClasses[variant],
        !noShadow && "shadow-sm",
        (onClick || hoverable) && "cursor-pointer hover:border-border/60 hover:shadow-md hover:bg-card/60",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
