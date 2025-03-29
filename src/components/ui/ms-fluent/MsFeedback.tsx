
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const toastVariants = cva(
  "ms-toast group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        info: "bg-blue-500/10 border-blue-500/20 text-blue-600",
        success: "bg-success/10 border-success/20 text-success",
        warning: "bg-warning/10 border-warning/20 text-warning",
        error: "bg-destructive/10 border-destructive/20 text-destructive",
        primary: "bg-primary/10 border-primary/20 text-primary",
      },
      position: {
        topRight: "animate-in slide-in-from-right",
        topLeft: "animate-in slide-in-from-left",
        bottomRight: "animate-in slide-in-from-right",
        bottomLeft: "animate-in slide-in-from-left",
        topCenter: "animate-in fade-in-90 slide-in-from-top",
        bottomCenter: "animate-in fade-in-90 slide-in-from-bottom",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "topRight",
    },
  }
);

export interface MsToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export const MsToast = forwardRef<HTMLDivElement, MsToastProps>(
  ({ className, children, variant, position, title, icon, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant, position }), className)}
        {...props}
      >
        <div className="flex items-start">
          {icon && <div className="mr-2 mt-0.5">{icon}</div>}
          <div>
            {title && <h4 className="font-semibold">{title}</h4>}
            {children && <div className="mt-1 text-sm opacity-90">{children}</div>}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto flex h-6 w-6 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    );
  }
);

MsToast.displayName = "MsToast";

export interface MsBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const MsBadge = forwardRef<HTMLDivElement, MsBadgeProps>(
  ({ 
    className, 
    children, 
    variant = 'default', 
    size = 'md',
    pill = false,
    icon,
    dismissible = false, 
    onDismiss,
    ...props 
  }, ref) => {
    const variantClasses = {
      default: "bg-muted/80 text-muted-foreground",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      accent: "bg-accent text-accent-foreground",
      outline: "border border-border bg-transparent text-foreground",
      success: "bg-success/10 text-success border border-success/20",
      warning: "bg-warning/10 text-warning border border-warning/20",
      error: "bg-destructive/10 text-destructive border border-destructive/20",
    };
    
    const sizeClasses = {
      sm: "text-xs px-1.5 py-0.5",
      md: "text-xs px-2.5 py-0.5",
      lg: "text-sm px-3 py-1",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "ms-badge inline-flex items-center border font-medium",
          pill ? "rounded-full" : "rounded-md",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
        {dismissible && (
          <button
            type="button"
            className="ml-1 -mr-0.5 text-current opacity-70 hover:opacity-100"
            onClick={onDismiss}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        )}
      </div>
    );
  }
);

MsBadge.displayName = "MsBadge";

export interface MsNotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onDismiss?: () => void;
}

export const MsNotification = forwardRef<HTMLDivElement, MsNotificationProps>(
  ({ 
    className, 
    title, 
    description, 
    variant = 'default',
    icon,
    action,
    onDismiss,
    ...props 
  }, ref) => {
    const variantClasses = {
      default: "bg-background border-border",
      info: "bg-blue-500/10 border-blue-500/20",
      success: "bg-success/10 border-success/20",
      warning: "bg-warning/10 border-warning/20",
      error: "bg-destructive/10 border-destructive/20",
    };
    
    const variantTextClasses = {
      default: "text-foreground",
      info: "text-blue-600",
      success: "text-success",
      warning: "text-warning",
      error: "text-destructive",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "ms-notification relative flex w-full overflow-hidden rounded-lg border shadow-md p-4",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="flex w-full">
          {icon && (
            <div className={cn("mr-3 mt-0.5", variantTextClasses[variant])}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h4 className={cn("font-medium", variantTextClasses[variant])}>{title}</h4>
            {description && (
              <p className="mt-1 text-sm opacity-90">{description}</p>
            )}
            {action && (
              <div className="mt-3">
                {action}
              </div>
            )}
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

MsNotification.displayName = "MsNotification";
