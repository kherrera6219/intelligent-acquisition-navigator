
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
  className,
  centered = false,
  size = 'medium',
}) => {
  const titleSizeClasses = {
    small: 'text-xl font-semibold',
    medium: 'text-2xl font-semibold',
    large: 'text-3xl md:text-4xl font-bold',
  };

  return (
    <div className={cn(centered && 'text-center', className)}>
      <h2 className={cn(titleSizeClasses[size], 'ms-heading-3')}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-2 text-muted-foreground', centered && 'mx-auto max-w-3xl')}>
          {description}
        </p>
      )}
    </div>
  );
};
