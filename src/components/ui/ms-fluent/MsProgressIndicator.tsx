
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface MsProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  valueFormat?: 'percentage' | 'fraction' | 'raw';
  indeterminate?: boolean;
}

export const MsProgress = forwardRef<HTMLDivElement, MsProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    size = 'md', 
    variant = 'primary',
    showValue = false,
    valueFormat = 'percentage',
    indeterminate = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
    
    const sizeClasses = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    };
    
    const variantClasses = {
      default: "bg-primary",
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-destructive",
    };
    
    const formatValue = () => {
      switch (valueFormat) {
        case 'percentage':
          return `${Math.round(percentage)}%`;
        case 'fraction':
          return `${value}/${max}`;
        case 'raw':
          return value.toString();
        default:
          return `${Math.round(percentage)}%`;
      }
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div className="flex items-center mb-1">
          {props.children}
          {showValue && (
            <span className="text-xs ml-auto font-medium">{formatValue()}</span>
          )}
        </div>
        <div className={cn("w-full overflow-hidden rounded-full bg-muted", sizeClasses[size])}>
          <div 
            className={cn(
              "h-full rounded-full transition-all",
              variantClasses[variant],
              indeterminate && "animate-[progressIndeterminate_1s_ease-in-out_infinite]"
            )}
            style={{ width: indeterminate ? '100%' : `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

MsProgress.displayName = "MsProgress";

export interface MsSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  label?: string;
  center?: boolean;
}

export const MsSpinner = forwardRef<HTMLDivElement, MsSpinnerProps>(
  ({ 
    className, 
    size = 'md', 
    variant = 'primary',
    label,
    center = false,
    ...props 
  }, ref) => {
    const sizeClasses = {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    };
    
    const variantClasses = {
      default: "text-primary",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      success: "text-success",
      warning: "text-warning",
      error: "text-destructive",
    };
    
    const spinner = (
      <Loader2 
        className={cn(
          "animate-spin",
          sizeClasses[size],
          variantClasses[variant],
          !label && className
        )} 
      />
    );
    
    if (center) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-center justify-center",
            className
          )}
          {...props}
        >
          {spinner}
          {label && (
            <span className={cn("mt-2 text-sm text-muted-foreground", variantClasses[variant])}>
              {label}
            </span>
          )}
        </div>
      );
    }
    
    if (label) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center",
            className
          )}
          {...props}
        >
          {spinner}
          <span className={cn("ml-2 text-sm", variantClasses[variant])}>
            {label}
          </span>
        </div>
      );
    }
    
    return spinner;
  }
);

MsSpinner.displayName = "MsSpinner";

export interface MsLoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  spinner?: boolean;
  blur?: boolean;
  label?: string;
}

export const MsLoadingOverlay = forwardRef<HTMLDivElement, MsLoadingOverlayProps>(
  ({ 
    className, 
    active, 
    spinner = true,
    blur = true,
    label,
    ...props 
  }, ref) => {
    if (!active) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 flex items-center justify-center z-50",
          blur ? "backdrop-blur-sm bg-background/50" : "bg-background/80",
          className
        )}
        {...props}
      >
        {spinner && (
          <MsSpinner 
            size="lg" 
            variant="primary" 
            label={label} 
            center
          />
        )}
        {!spinner && label && (
          <div className="text-center">
            <p className="text-sm font-medium">{label}</p>
          </div>
        )}
      </div>
    );
  }
);

MsLoadingOverlay.displayName = "MsLoadingOverlay";
