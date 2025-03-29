
import React from 'react';
import { cn } from '@/lib/utils';

type SectionVariant = 'default' | 'primary' | 'secondary' | 'muted' | 'accent';
type SectionWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'container';
type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
  width?: SectionWidth;
  spacing?: SectionSpacing;
  id?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * A standard section component with consistent styling and spacing options.
 * This component follows Microsoft Fluent UI design principles.
 */
export const Section: React.FC<SectionProps> = ({
  children,
  className,
  variant = 'default',
  width = 'container',
  spacing = 'md',
  id,
  as: Component = 'section',
}) => {
  // Background styles based on variant
  const variantClasses = {
    default: 'bg-background',
    primary: 'bg-primary/5 text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    muted: 'bg-muted text-muted-foreground',
    accent: 'bg-accent text-accent-foreground',
  };

  // Width constraints
  const widthClasses = {
    sm: 'max-w-screen-sm mx-auto px-4',
    md: 'max-w-screen-md mx-auto px-4',
    lg: 'max-w-screen-lg mx-auto px-4',
    xl: 'max-w-screen-xl mx-auto px-4',
    full: 'w-full px-4',
    container: 'container px-4 sm:px-6 lg:px-8',
  };

  // Vertical spacing
  const spacingClasses = {
    none: 'py-0',
    sm: 'py-4 sm:py-6',
    md: 'py-6 sm:py-8 md:py-12',
    lg: 'py-8 sm:py-12 md:py-16 lg:py-20',
    xl: 'py-12 sm:py-16 md:py-20 lg:py-24',
  };

  return (
    <Component
      id={id}
      className={cn(
        variantClasses[variant], 
        spacingClasses[spacing],
        className
      )}
    >
      <div className={widthClasses[width]}>
        {children}
      </div>
    </Component>
  );
};

export default Section;
