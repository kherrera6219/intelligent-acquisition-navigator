
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
  className,
  align = 'left',
  size = 'medium',
}) => {
  const titleSizeClasses = {
    small: 'text-xl font-semibold',
    medium: 'text-2xl font-semibold',
    large: 'text-3xl md:text-4xl font-bold',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn(alignClasses[align], className)}>
      <h2 className={cn(titleSizeClasses[size], 'ms-heading-3')}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-2 text-muted-foreground')}>
          {description}
        </p>
      )}
    </div>
  );
};
