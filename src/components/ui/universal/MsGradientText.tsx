
import React from 'react';
import { cn } from '@/lib/utils';

interface MsGradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'primary' | 'secondary' | 'accent' | 'success' | 'custom';
  customGradient?: string;
  variant?: string; // Added variant prop for backward compatibility
}

export const MsGradientText: React.FC<MsGradientTextProps> = ({
  children,
  className,
  gradient = 'primary',
  customGradient,
  variant
}) => {
  // If variant is provided, use it to determine gradient
  const effectiveGradient = variant ? variant : gradient;
  
  const gradients = {
    primary: 'from-blue-400 to-indigo-600',
    secondary: 'from-purple-400 to-pink-600',
    accent: 'from-amber-400 to-orange-600',
    success: 'from-emerald-400 to-teal-600',
    custom: customGradient || 'from-blue-400 to-indigo-600',
  };

  return (
    <span
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r',
        gradients[effectiveGradient as keyof typeof gradients] || gradients.primary,
        className
      )}
    >
      {children}
    </span>
  );
};
