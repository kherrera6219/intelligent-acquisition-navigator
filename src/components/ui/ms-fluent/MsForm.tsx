
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export interface MsFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
}

export const MsFormField = forwardRef<HTMLDivElement, MsFormFieldProps>(
  ({ className, children, label, description, error, required, htmlFor, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2 mb-4", className)} {...props}>
        {label && (
          <Label 
            htmlFor={htmlFor} 
            className="text-sm font-medium block"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {children}
        {description && !error && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

MsFormField.displayName = "MsFormField";

export interface MsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const MsInput = forwardRef<HTMLInputElement, MsInputProps>(
  ({ className, type = "text", loading, icon, iconPosition = "left", ...props }, ref) => {
    return (
      <div className="relative">
        {(icon || loading) && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "ms-input flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            (icon || loading) && iconPosition === "left" && "pl-10",
            (icon || loading) && iconPosition === "right" && "pr-10",
            className
          )}
          ref={ref}
          disabled={props.disabled || loading}
          {...props}
        />
        {(icon || loading) && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
          </div>
        )}
      </div>
    );
  }
);

MsInput.displayName = "MsInput";

export interface MsTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const MsTextarea = forwardRef<HTMLTextAreaElement, MsTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "ms-textarea flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

MsTextarea.displayName = "MsTextarea";

export interface MsFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  loading?: boolean;
}

export const MsForm = forwardRef<HTMLFormElement, MsFormProps>(
  ({ className, children, loading, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-6", className)}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">Processing...</p>
            </div>
          </div>
        )}
        {children}
      </form>
    );
  }
);

MsForm.displayName = "MsForm";
