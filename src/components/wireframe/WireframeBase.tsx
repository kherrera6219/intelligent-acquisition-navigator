
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WireframeBaseProps {
  children: ReactNode;
  className?: string;
  withPlaceholders?: boolean;
}

export const WireframeBase: React.FC<WireframeBaseProps> = ({
  children,
  className,
  withPlaceholders = false,
}) => {
  return (
    <div className={cn(
      'ms-wireframe-container border border-dashed border-border/50 rounded-lg p-4 bg-background/30',
      withPlaceholders && 'ms-wireframe-with-placeholders',
      className
    )}>
      {children}
    </div>
  );
};

export const WireframePlaceholder: React.FC<{
  height?: string;
  width?: string;
  text?: string;
  className?: string;
}> = ({ 
  height = 'h-24',
  width = 'w-full',
  text,
  className
}) => {
  return (
    <div className={cn(
      'bg-muted/50 rounded border border-border/30 flex items-center justify-center',
      height,
      width,
      className
    )}>
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
};
