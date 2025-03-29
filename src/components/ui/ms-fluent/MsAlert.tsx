
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Info } from 'lucide-react';

const alertVariants = cva(
  "ms-fluent-alert relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:pl-10",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        success: "bg-success/10 text-success border-success/30",
        warning: "bg-warning/10 text-warning border-warning/30",
        error: "bg-destructive/10 text-destructive border-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface MsFluentAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

export const MsFluentAlert = React.forwardRef<
  HTMLDivElement,
  MsFluentAlertProps
>(({
  className,
  variant,
  icon,
  title,
  children,
  onClose,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        alertVariants({ variant }),
        className
      )}
      role="alert"
      {...props}
    >
      {icon || <Info className="h-5 w-5" />}
      
      <div className="flex flex-col">
        {title && (
          <h5 className="font-medium leading-none tracking-tight mb-1">{title}</h5>
        )}
        <div className="text-sm">{children}</div>
      </div>
      
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100"
          aria-label="Close alert"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
});

MsFluentAlert.displayName = "MsFluentAlert";
