
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "ms-card bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg transition-all duration-200",
  {
    variants: {
      variant: {
        default: "hover:border-border/60 hover:shadow-md hover:bg-card/60",
        interactive: "cursor-pointer hover:border-primary/40 hover:shadow-lg transform-gpu hover:-translate-y-1",
        flat: "border-0 shadow-none bg-transparent",
        elevated: "shadow-md hover:shadow-lg"
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md"
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const MsFluentCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      />
    );
  }
);

const MsFluentCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("ms-card-header flex items-center justify-between mb-4 pb-3 border-b border-border/30", className)}
        {...props}
      />
    );
  }
);

const MsFluentCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("ms-card-title text-lg font-semibold", className)}
        {...props}
      />
    );
  }
);

const MsFluentCardSubtitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("ms-card-subtitle text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);

const MsFluentCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("ms-card-content space-y-4", className)}
        {...props}
      />
    );
  }
);

const MsFluentCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("ms-card-footer mt-4 pt-3 border-t border-border/30 flex justify-between items-center", className)}
        {...props}
      />
    );
  }
);

MsFluentCard.displayName = "MsFluentCard";
MsFluentCardHeader.displayName = "MsFluentCardHeader";
MsFluentCardTitle.displayName = "MsFluentCardTitle";
MsFluentCardSubtitle.displayName = "MsFluentCardSubtitle";
MsFluentCardContent.displayName = "MsFluentCardContent";
MsFluentCardFooter.displayName = "MsFluentCardFooter";

export { 
  MsFluentCard, 
  MsFluentCardHeader, 
  MsFluentCardTitle, 
  MsFluentCardSubtitle, 
  MsFluentCardContent, 
  MsFluentCardFooter 
};
