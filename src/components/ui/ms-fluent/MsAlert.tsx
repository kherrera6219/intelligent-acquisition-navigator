
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle, Info, XCircle, AlertTriangle } from 'lucide-react';

const alertVariants = cva(
  "ms-alert relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:pl-8",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        info: "bg-blue-500/10 border-blue-500/20 text-blue-600",
        success: "bg-success/10 border-success/20 text-success",
        warning: "bg-warning/10 border-warning/20 text-warning",
        error: "bg-destructive/10 border-destructive/20 text-destructive",
        primary: "bg-primary/10 border-primary/20 text-primary",
      },
      size: {
        default: "text-sm",
        sm: "text-xs py-2 px-3 [&>svg]:top-2 [&>svg]:h-4 [&>svg]:w-4",
        lg: "text-base py-5 px-6 [&>svg]:h-6 [&>svg]:w-6",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MsAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const getIconByVariant = (variant: string | null | undefined) => {
  switch (variant) {
    case 'info':
      return <Info className="h-5 w-5" />;
    case 'success':
      return <CheckCircle className="h-5 w-5" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5" />;
    case 'error':
      return <XCircle className="h-5 w-5" />;
    case 'primary':
      return <Info className="h-5 w-5" />;
    default:
      return <AlertCircle className="h-5 w-5" />;
  }
};

export const MsAlert = forwardRef<HTMLDivElement, MsAlertProps>(
  ({ className, children, variant, size, title, icon, showIcon = true, dismissible = false, onDismiss, ...props }, ref) => {
    const IconComponent = icon || (showIcon ? getIconByVariant(variant) : null);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        {IconComponent}
        <div>
          {title && <h5 className="font-medium mb-1">{title}</h5>}
          <div className={cn("text-sm", !title && "mt-0")}>{children}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            aria-label="Close alert"
            onClick={onDismiss}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-background/80"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

MsAlert.displayName = "MsAlert";

export interface MsStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'online' | 'offline' | 'away' | 'busy' | 'active' | 'inactive' | 'pending' | 'approved' | 'rejected';
}

export const MsStatusBadge = forwardRef<HTMLDivElement, MsStatusBadgeProps>(
  ({ className, status, ...props }, ref) => {
    const statusClasses = {
      online: "bg-success",
      active: "bg-success",
      approved: "bg-success",
      offline: "bg-destructive",
      rejected: "bg-destructive",
      away: "bg-warning",
      pending: "bg-warning",
      busy: "bg-destructive",
      inactive: "bg-muted-foreground",
    };

    const statusLabels = {
      online: "Online",
      active: "Active",
      approved: "Approved",
      offline: "Offline",
      rejected: "Rejected",
      away: "Away",
      pending: "Pending",
      busy: "Busy",
      inactive: "Inactive",
    };

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center", className)}
        {...props}
      >
        <span className={cn("h-2 w-2 rounded-full mr-2", statusClasses[status])} />
        <span className="text-xs font-medium">{statusLabels[status]}</span>
      </div>
    );
  }
);

MsStatusBadge.displayName = "MsStatusBadge";
