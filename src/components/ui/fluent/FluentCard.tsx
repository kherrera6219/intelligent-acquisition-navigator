
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface FluentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'elevated' | 'outline' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  animation?: 'none' | 'fade' | 'scale' | 'slide' | 'entrance';
  bordered?: boolean;
  centeredContent?: boolean;
  onClick?: () => void;
}

const paddingVariants = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
};

const shadowVariants = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg'
};

const animationVariants = {
  none: '',
  fade: 'ms-motion-fadeIn',
  scale: 'ms-motion-scaleIn',
  slide: 'ms-motion-slideUp',
  entrance: 'ms-card-entrance'
};

export function FluentCard({
  children,
  className,
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  animation = 'none',
  bordered = true,
  centeredContent = false,
  onClick,
  ...props
}: FluentCardProps) {
  const isInteractive = variant === 'interactive' || !!onClick;
  
  return (
    <Card
      className={cn(
        // Base styles
        'relative transition-all rounded-lg',
        // Padding variants
        paddingVariants[padding],
        // Shadow variants
        shadowVariants[shadow],
        // Animation variants
        animationVariants[animation],
        // Border variants
        bordered ? 'border border-border/50' : 'border-0',
        // Content alignment
        centeredContent && 'flex flex-col items-center justify-center',
        // Variant specific styles
        variant === 'interactive' && 'hover:shadow-lg hover:translate-y-[-2px] cursor-pointer',
        variant === 'elevated' && 'shadow-md bg-secondary/5',
        variant === 'outline' && 'bg-transparent shadow-none',
        variant === 'subtle' && 'bg-secondary/5 shadow-none',
        // Interactive states
        isInteractive && 'hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </Card>
  );
}

export default FluentCard;
