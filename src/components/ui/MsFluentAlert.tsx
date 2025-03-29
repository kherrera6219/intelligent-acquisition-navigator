
import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface MsFluentAlertProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const MsFluentAlert: React.FC<MsFluentAlertProps> = ({
  children,
  className,
  variant = 'default',
  icon,
  title,
  dismissible = false,
  onDismiss,
}) => {
  const variantClasses = {
    default: 'bg-primary/10 border-primary/20 text-primary',
    success: 'bg-success/10 border-success/20 text-success',
    warning: 'bg-warning/10 border-warning/20 text-warning',
    error: 'bg-destructive/10 border-destructive/20 text-destructive',
  };

  return (
    <div
      className={cn(
        'ms-fluent-alert relative flex p-4 rounded-md border',
        variantClasses[variant],
        className
      )}
    >
      {icon && <div className="mr-3 flex-shrink-0">{icon}</div>}
      <div className="flex-1">
        {title && <h5 className="font-medium mb-1">{title}</h5>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      )}
    </div>
  );
};

export default MsFluentAlert;
