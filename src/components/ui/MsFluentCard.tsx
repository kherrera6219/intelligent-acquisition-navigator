
import React from 'react';
import { cn } from '@/lib/utils';

interface MsFluentCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'interactive';
  onClick?: () => void;
}

export const MsFluentCard = React.forwardRef<HTMLDivElement, MsFluentCardProps>(
  ({ children, className, variant = 'default', onClick, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-card border border-border/40 shadow-sm',
      bordered: 'bg-card border-2 border-border/60 shadow-sm',
      elevated: 'bg-card border border-border/30 shadow-md',
      interactive: 'bg-card border border-border/40 shadow-sm transition-all duration-200 hover:shadow-md hover:border-border/60 cursor-pointer'
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-lg p-5', variantClasses[variant], className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MsFluentCard.displayName = 'MsFluentCard';

interface MsFluentCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const MsFluentCardHeader = ({ children, className }: MsFluentCardHeaderProps) => (
  <div className={cn('flex justify-between items-center mb-4', className)}>
    {children}
  </div>
);
MsFluentCardHeader.displayName = 'MsFluentCardHeader';

interface MsFluentCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const MsFluentCardTitle = ({ children, className }: MsFluentCardTitleProps) => (
  <h3 className={cn('text-lg font-semibold', className)}>{children}</h3>
);
MsFluentCardTitle.displayName = 'MsFluentCardTitle';

interface MsFluentCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const MsFluentCardDescription = ({ children, className }: MsFluentCardDescriptionProps) => (
  <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
);
MsFluentCardDescription.displayName = 'MsFluentCardDescription';

interface MsFluentCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MsFluentCardContent = ({ children, className }: MsFluentCardContentProps) => (
  <div className={cn('space-y-4', className)}>{children}</div>
);
MsFluentCardContent.displayName = 'MsFluentCardContent';

interface MsFluentCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const MsFluentCardFooter = ({ children, className }: MsFluentCardFooterProps) => (
  <div className={cn('flex justify-end items-center mt-4 pt-4 border-t border-border/30', className)}>
    {children}
  </div>
);
MsFluentCardFooter.displayName = 'MsFluentCardFooter';
