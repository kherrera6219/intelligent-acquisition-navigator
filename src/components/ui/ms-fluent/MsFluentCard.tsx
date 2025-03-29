
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from 'lucide-react';

const cardVariants = cva(
  "ms-fluent-card rounded-lg border transition-all",
  {
    variants: {
      variant: {
        default: "bg-card border-border/40 shadow-sm hover:shadow-md",
        primary: "bg-primary/5 border-primary/20 shadow-sm",
        secondary: "bg-secondary/5 border-secondary/20 shadow-sm",
        accent: "bg-accent/5 border-accent/20 shadow-sm",
        destructive: "bg-destructive/5 border-destructive/20 shadow-sm",
        outline: "bg-transparent border-border shadow-none",
        glass: "backdrop-blur-sm bg-white/5 border-white/10 shadow-sm"
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      hover: {
        true: "transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hover: false,
    },
  }
);

export interface MsFluentCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  loading?: boolean;
  clickable?: boolean;
  as?: React.ElementType;
}

export const MsFluentCard = React.forwardRef<
  HTMLDivElement,
  MsFluentCardProps
>(({ 
  className, 
  children, 
  variant, 
  size, 
  hover, 
  loading = false, 
  clickable = false,
  as: Component = "div",
  ...props 
}, ref) => (
  <Component
    ref={ref}
    className={cn(
      cardVariants({ variant, size, hover }),
      clickable && "cursor-pointer",
      "relative",
      className
    )}
    {...props}
  >
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg z-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )}
    {children}
  </Component>
));

MsFluentCard.displayName = "MsFluentCard";

export const MsFluentCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4", className)}
    {...props}
  />
));

MsFluentCardHeader.displayName = "MsFluentCardHeader";

export const MsFluentCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold", className)}
    {...props}
  />
));

MsFluentCardTitle.displayName = "MsFluentCardTitle";

export const MsFluentCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-1", className)}
    {...props}
  />
));

MsFluentCardDescription.displayName = "MsFluentCardDescription";

export const MsFluentCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("", className)}
    {...props}
  />
));

MsFluentCardContent.displayName = "MsFluentCardContent";

export const MsFluentCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center mt-4 pt-4 border-t", className)}
    {...props}
  />
));

MsFluentCardFooter.displayName = "MsFluentCardFooter";
