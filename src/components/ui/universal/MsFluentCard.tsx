
import React from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'outlined' | 'filled' | 'elevated' | 'glass';
type CardSize = 'sm' | 'md' | 'lg';

interface MsFluentCardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  hover?: boolean;
  as?: React.ElementType;
  onClick?: () => void;
}

export const MsFluentCard: React.FC<MsFluentCardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  hover = false,
  as: Component = 'div',
  onClick,
}) => {
  const variantClasses = {
    default: 'bg-card/40 border border-border/40 shadow-sm',
    outlined: 'bg-transparent border border-border shadow-none',
    filled: 'bg-secondary/10 border border-secondary/20 shadow-sm',
    elevated: 'bg-card/60 border border-border/30 shadow-md',
    glass: 'bg-card/20 backdrop-blur-sm border border-border/30 shadow-sm'
  };
  
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  const hoverClasses = hover ? 
    'transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md hover:border-border/60' : '';

  return (
    <Component
      className={cn(
        'rounded-lg',
        variantClasses[variant],
        sizeClasses[size],
        hoverClasses,
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
