
import React from 'react';
import { cn } from '@/lib/utils';

type BreakpointVisibility = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ResponsiveProps {
  children: React.ReactNode;
  showAt?: BreakpointVisibility;
  hideAt?: BreakpointVisibility;
  showOnly?: BreakpointVisibility;
  className?: string;
  as?: React.ElementType;
}

/**
 * Responsive component for conditionally showing/hiding content based on breakpoints
 * 
 * @example
 * <Responsive showAt="md">
 *   Only visible on md screens and up
 * </Responsive>
 * 
 * @example
 * <Responsive hideAt="lg">
 *   Hidden on lg screens and up
 * </Responsive>
 * 
 * @example
 * <Responsive showOnly="sm">
 *   Only visible on sm screens
 * </Responsive>
 */
export const Responsive: React.FC<ResponsiveProps> = ({
  children,
  showAt,
  hideAt,
  showOnly,
  className,
  as: Component = 'div'
}) => {
  const getBreakpointClasses = () => {
    if (showOnly) {
      switch (showOnly) {
        case 'xs': return 'ms-show-xs-only';
        case 'sm': return 'ms-show-sm-only';
        case 'md': return 'ms-show-md-only';
        case 'lg': return 'ms-show-lg-only';
        case 'xl': return 'ms-show-xl-only';
        case '2xl': return 'ms-show-2xl-only';
      }
    }
    
    if (showAt) {
      switch (showAt) {
        case 'xs': return 'ms-show-xs-up';
        case 'sm': return 'ms-show-sm-up';
        case 'md': return 'ms-show-md-up';
        case 'lg': return 'ms-show-lg-up';
        case 'xl': return 'ms-show-xl-up';
        case '2xl': return 'ms-show-2xl-up';
      }
    }
    
    if (hideAt) {
      switch (hideAt) {
        case 'xs': return 'hidden';
        case 'sm': return 'ms-show-xs-down';
        case 'md': return 'ms-show-sm-down';
        case 'lg': return 'ms-show-md-down';
        case 'xl': return 'ms-show-lg-down';
        case '2xl': return 'ms-show-xl-down';
      }
    }
    
    return '';
  };
  
  return (
    <Component className={cn(getBreakpointClasses(), className)}>
      {children}
    </Component>
  );
};

// Also export a component for showing breakpoint indicators in development
interface BreakpointIndicatorProps {
  show?: boolean;
}

export const BreakpointIndicator: React.FC<BreakpointIndicatorProps> = ({ 
  show = process.env.NODE_ENV === 'development' 
}) => {
  if (!show) return null;
  
  return <div className="ms-breakpoint-indicator" />;
};
