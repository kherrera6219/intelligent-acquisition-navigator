
import React from 'react';
import { cn } from '@/lib/utils';

export interface MsFluentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'flat' | 'elevated';
  noShadow?: boolean;
}

export const MsFluentCard = React.forwardRef<HTMLDivElement, MsFluentCardProps>(
  ({ className, variant = 'default', noShadow, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ms-fluent-card",
          variant === 'interactive' && "hover:border-border/80 transition-colors cursor-pointer",
          variant === 'flat' && "shadow-none",
          variant === 'elevated' && "shadow-lg",
          noShadow && "shadow-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MsFluentCard.displayName = "MsFluentCard";

export interface MsFluentCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MsFluentCardHeader = React.forwardRef<HTMLDivElement, MsFluentCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("ms-fluent-card-header", className)}
      {...props}
    />
  )
);

MsFluentCardHeader.displayName = "MsFluentCardHeader";

export interface MsFluentCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const MsFluentCardTitle = React.forwardRef<HTMLHeadingElement, MsFluentCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("ms-fluent-card-title", className)}
      {...props}
    />
  )
);

MsFluentCardTitle.displayName = "MsFluentCardTitle";

export interface MsFluentCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const MsFluentCardDescription = React.forwardRef<HTMLParagraphElement, MsFluentCardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("ms-fluent-card-description", className)}
      {...props}
    />
  )
);

MsFluentCardDescription.displayName = "MsFluentCardDescription";

export interface MsFluentCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MsFluentCardContent = React.forwardRef<HTMLDivElement, MsFluentCardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("ms-fluent-card-content", className)}
      {...props}
    />
  )
);

MsFluentCardContent.displayName = "MsFluentCardContent";

export interface MsFluentCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MsFluentCardFooter = React.forwardRef<HTMLDivElement, MsFluentCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("ms-fluent-card-footer", className)}
      {...props}
    />
  )
);

MsFluentCardFooter.displayName = "MsFluentCardFooter";
