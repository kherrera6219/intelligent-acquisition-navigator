
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'left',
  className,
  titleClassName,
  subtitleClassName,
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('mb-8 max-w-2xl', alignClasses[align], className)}>
      <h2 className={cn('ms-heading-3 ms-tracking-tight', titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 ms-text-lg ms-text-muted', subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
