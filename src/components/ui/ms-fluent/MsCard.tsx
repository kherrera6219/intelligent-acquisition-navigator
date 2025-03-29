
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const cardVariants = cva(
  "ms-card rounded-lg border transition-all relative",
  {
    variants: {
      variant: {
        default: "bg-card/80 border-border/40 shadow-sm",
        primary: "bg-primary/5 border-primary/20",
        secondary: "bg-secondary/5 border-secondary/20",
        accent: "bg-accent/5 border-accent/20",
        destructive: "bg-destructive/5 border-destructive/20",
        outline: "bg-transparent border-border/80 shadow-none",
        ghost: "bg-transparent border-transparent shadow-none",
        elevated: "bg-card border-border/30 shadow-md",
        glass: "bg-background/20 backdrop-blur-sm border-white/10 shadow-sm",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
        none: "",
      },
      hover: {
        default: "",
        lift: "hover:-translate-y-1 hover:shadow-md transition-all duration-300",
        shine: "hover:border-primary/30 hover:shadow-md transition-all duration-300",
        glow: "hover:shadow-[0_0_15px_rgba(var(--primary)/0.1)] transition-all duration-300",
        grow: "hover:scale-[1.01] transition-all duration-300",
      },
      rounded: {
        default: "rounded-lg",
        none: "rounded-none",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hover: "default",
      rounded: "default",
    },
  }
);

export interface MsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  loading?: boolean;
  clickable?: boolean;
  as?: React.ElementType;
  horizontal?: boolean;
}

export const MsCard = forwardRef<HTMLDivElement, MsCardProps>(
  ({ 
    className, 
    children, 
    variant, 
    size, 
    hover, 
    rounded,
    loading = false,
    clickable = false,
    as: Component = "div",
    horizontal = false,
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          cardVariants({ variant, size, hover, rounded }),
          clickable && "cursor-pointer",
          horizontal && "flex flex-row",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm rounded-lg z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
          </div>
        )}
        {children}
      </Component>
    );
  }
);

MsCard.displayName = "MsCard";

export const MsCardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4 space-y-1.5", className)}
    {...props}
  />
));

MsCardHeader.displayName = "MsCardHeader";

export const MsCardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }
>(({ className, as: Component = "h3", ...props }, ref) => (
  <Component
    ref={ref}
    className={cn("font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
));

MsCardTitle.displayName = "MsCardTitle";

export const MsCardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

MsCardDescription.displayName = "MsCardDescription";

export const MsCardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("", className)}
    {...props}
  />
));

MsCardContent.displayName = "MsCardContent";

export const MsCardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center mt-4 pt-4 border-t border-border/30", className)}
    {...props}
  />
));

MsCardFooter.displayName = "MsCardFooter";

export const MsCardImage = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src: string; alt?: string; aspectRatio?: "auto" | "square" | "video" | "portrait" }
>(({ className, src, alt = "", aspectRatio = "auto", ...props }, ref) => {
  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };
  
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden rounded-t-lg -m-px -mt-px mb-4", aspectRatioClasses[aspectRatio], className)}
      {...props}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
      />
    </div>
  );
});

MsCardImage.displayName = "MsCardImage";
