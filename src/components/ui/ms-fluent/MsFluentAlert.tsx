
import React from 'react';
import { cn } from '@/lib/utils';
import { MsFluentButton } from '../MsFluentButton';
import { X } from 'lucide-react';

interface MsFluentAlertProps {
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  onClose?: () => void;
  className?: string;
}

export const MsFluentAlert: React.FC<MsFluentAlertProps> = ({
  title,
  children,
  icon,
  variant = 'default',
  onClose,
  className,
}) => {
  const variantStyles = {
    default: 'bg-background border-border',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-700',
    success: 'bg-green-500/10 border-green-500/20 text-green-700',
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-700',
    error: 'bg-red-500/10 border-red-500/20 text-red-700',
  };

  return (
    <div
      className={cn(
        'ms-fluent-alert relative rounded-md border p-4',
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <div className="flex">
        {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <div className="ml-3 flex-shrink-0">
            <MsFluentButton 
              variant="ghost" 
              size="xs" 
              iconOnly={<X className="h-4 w-4" />}
              onClick={onClose}
              aria-label="Close alert"
            />
          </div>
        )}
      </div>
    </div>
  );
};
