
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  noShadow?: boolean;
  variant?: 'default' | 'glass' | 'outline' | 'accent' | 'primary' | 'flat' | 'metal' | 'fluent' | 'ms-fluent' | 'destructive';
  padding?: 'none' | 'sm' | 'md' | 'lg' | boolean;
  textColor?: 'default' | 'black';
  border?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  className,
  interactive = false,
  hoverable = false,
  onClick,
  noShadow = false,
  variant = 'default',
  padding = 'md',
  textColor = 'default',
  border = true,
  ...props
}, ref) => {
  const variantClasses = {
    default: "bg-card/50 border-border/50",
    glass: "bg-white/5 backdrop-blur-sm border-white/10",
    outline: "bg-transparent border-border/60",
    accent: "bg-accent/10 border-accent/20",
    primary: "bg-primary/10 border-primary/20 text-primary-foreground",
    flat: "bg-secondary/20 border-transparent",
    metal: "bg-black/20 backdrop-blur-sm border-white/5 bg-gradient-to-b from-gray-800/50 to-gray-900/50",
    fluent: "bg-gray-900/70 backdrop-blur-md border-gray-700/50 fluent-panel",
    'ms-fluent': "ms-fluent-card",
    destructive: "bg-destructive/10 border-destructive/20"
  };

  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-6 sm:p-8"
  };

  const textClasses = {
    default: "",
    black: "text-black"
  };

  const getPaddingClass = () => {
    if (padding === false) return "";
    if (padding === true) return paddingClasses.md;
    return paddingClasses[padding];
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg",
        border && "border",
        getPaddingClass(),
        variantClasses[variant],
        textClasses[textColor],
        variant === 'metal' && "on-gunmetal",
        !noShadow && variant === 'metal' 
          ? "shadow-lg shadow-black/30 glossy-metal"
          : !noShadow && "shadow-md shadow-black/5",
        interactive && "cursor-pointer transition-transform active:scale-[0.98]",
        hoverable && variant === 'metal'
          ? "transition-all duration-200 hover:border-white/10 hover:shadow-xl hover:shadow-black/40"
          : hoverable && variant === 'ms-fluent'
          ? "transition-all duration-200 hover:shadow-xl hover:scale-[1.01]"
          : hoverable && "transition-all duration-200 hover:border-border/60 hover:shadow-xl hover:-translate-y-0.5",
        className
      )}
      onClick={onClick}
      role={interactive ? "button" : props.role}
      tabIndex={interactive ? 0 : props.tabIndex}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";
