
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  noShadow?: boolean;
  variant?: 'default' | 'glass' | 'outline' | 'accent' | 'primary' | 'flat' | 'metal';
  padding?: 'none' | 'sm' | 'md' | 'lg' | boolean;
  textColor?: 'default' | 'black';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  interactive = false,
  hoverable = false,
  onClick,
  noShadow = false,
  variant = 'default',
  padding = 'md',
  textColor = 'default',
}) => {
  const variantClasses = {
    default: "bg-secondary/50 border-border",
    glass: "bg-white/5 backdrop-blur-sm border-white/10",
    outline: "bg-transparent border-border",
    accent: "bg-primary/10 border-primary/20",
    primary: "bg-primary/10 border-primary/20 text-primary-foreground",
    flat: "bg-secondary/20 border-transparent",
    metal: "bg-black/20 backdrop-blur-sm border-white/5 bg-metal-gradient"
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
      className={cn(
        "rounded-lg border",
        getPaddingClass(),
        variantClasses[variant],
        textClasses[textColor],
        variant === 'metal' && "on-gunmetal",
        !noShadow && variant === 'metal' 
          ? "shadow-lg shadow-black/30 glossy-metal"
          : !noShadow && "shadow-lg shadow-black/5",
        interactive && "cursor-pointer transition-transform active:scale-[0.98]",
        hoverable && variant === 'metal'
          ? "transition-all duration-200 hover:border-white/10 hover:shadow-xl hover:shadow-black/40"
          : hoverable && "transition-all duration-200 hover:border-border/60 hover:shadow-xl",
        className
      )}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </div>
  );
};
