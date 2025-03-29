
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
  size?: 'small' | 'medium' | 'large';
  align?: 'left' | 'center' | 'right';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
  className,
  centered = false,
  size = 'medium',
  align,
}) => {
  const titleSizeClasses = {
    small: 'text-xl font-semibold',
    medium: 'text-2xl font-semibold',
    large: 'text-3xl md:text-4xl font-bold',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Use centered for backward compatibility, but prefer align if provided
  const textAlignment = align ? alignClasses[align] : (centered ? 'text-center' : 'text-left');

  return (
    <div className={cn(textAlignment, className)}>
      <h2 className={cn(titleSizeClasses[size], 'ms-heading-3')}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-2 text-muted-foreground', (centered || align === 'center') && 'mx-auto max-w-3xl')}>
          {description}
        </p>
      )}
    </div>
  );
};
