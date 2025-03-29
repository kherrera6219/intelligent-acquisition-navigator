
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  "ms-fluent-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        subtle: "bg-muted/50 text-muted-foreground hover:bg-muted",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 rounded-md",
        md: "h-9 px-4 py-2",
        lg: "h-10 px-6 rounded-md",
        xl: "h-12 px-8 rounded-md",
        "icon-sm": "h-8 w-8",
        "icon-md": "h-9 w-9",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface MsFluentButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  iconOnly?: React.ReactNode;
}

export const MsFluentButton = React.forwardRef<
  HTMLButtonElement,
  MsFluentButtonProps
>(({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  leadingIcon,
  trailingIcon,
  iconOnly,
  children,
  disabled,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  
  // Check if we're in icon-only mode
  const iconOnlyMode = iconOnly !== undefined;
  
  // Adjust size if icon-only mode is active but a non-icon size is selected
  let adjustedSize = size;
  if (iconOnlyMode && (!size || (size !== 'icon-sm' && size !== 'icon-md' && size !== 'icon-lg'))) {
    if (size === 'xs' || size === 'sm') adjustedSize = 'icon-sm';
    else if (size === 'lg' || size === 'xl') adjustedSize = 'icon-lg';
    else adjustedSize = 'icon-md';
  }
  
  return (
    <Comp
      className={cn(buttonVariants({ variant, size: adjustedSize }), className)}
      ref={ref}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      
      {!isLoading && leadingIcon && !iconOnlyMode && (
        <span className="mr-2">{leadingIcon}</span>
      )}
      
      {!iconOnlyMode && children}
      
      {iconOnlyMode && iconOnly}
      
      {!isLoading && trailingIcon && !iconOnlyMode && (
        <span className="ml-2">{trailingIcon}</span>
      )}
    </Comp>
  );
});

MsFluentButton.displayName = "MsFluentButton";
