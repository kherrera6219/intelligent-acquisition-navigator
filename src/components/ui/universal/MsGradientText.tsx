
import React from 'react';
import { cn } from '@/lib/utils';

export interface MsGradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'primary' | 'secondary' | 'accent' | 'custom';
  customGradient?: string;
  as?: React.ElementType;
}

export const MsGradientText: React.FC<MsGradientTextProps> = ({
  children,
  className,
  gradient = 'primary',
  customGradient,
  as: Component = 'span'
}) => {
  const gradientStyles = {
    primary: 'from-blue-500 to-indigo-600',
    secondary: 'from-fuchsia-500 to-purple-600',
    accent: 'from-amber-500 to-orange-600',
    custom: customGradient || 'from-gray-500 to-gray-600'
  };
  
  return (
    <Component
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r',
        gradientStyles[gradient],
        className
      )}
    >
      {children}
    </Component>
  );
};
