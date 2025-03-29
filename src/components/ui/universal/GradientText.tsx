
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientDirection?: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  gradientFrom = '#3B82F6',
  gradientTo = '#8B5CF6',
  gradientDirection = 'left-to-right',
}) => {
  const getGradientDirection = () => {
    switch (gradientDirection) {
      case 'left-to-right':
        return 'bg-gradient-to-r';
      case 'right-to-left':
        return 'bg-gradient-to-l';
      case 'top-to-bottom':
        return 'bg-gradient-to-b';
      case 'bottom-to-top':
        return 'bg-gradient-to-t';
      default:
        return 'bg-gradient-to-r';
    }
  };

  return (
    <span
      className={cn(
        'text-transparent bg-clip-text',
        getGradientDirection(),
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`
      }}
    >
      {children}
    </span>
  );
};
