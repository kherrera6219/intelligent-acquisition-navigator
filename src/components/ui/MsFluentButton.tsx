
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "ms-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "ms-button-primary bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "ms-button-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "ms-button-outline border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground",
        ghost: "ms-button-ghost hover:bg-accent/10 hover:text-accent-foreground",
        destructive: "ms-button-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success: "ms-button-success bg-success text-white hover:bg-success/90",
        link: "ms-button-link text-primary underline-offset-2 hover:underline"
      },
      size: {
        sm: "ms-button-sm h-8 px-3 text-xs",
        md: "ms-button-md h-10 px-4 py-2",
        lg: "ms-button-lg h-12 px-6 text-base",
        icon: "ms-button-icon h-10 w-10 p-0 rounded-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const MsFluentButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </Comp>
    );
  }
);

MsFluentButton.displayName = "MsFluentButton";

export { MsFluentButton, buttonVariants };
