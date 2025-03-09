
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  noShadow?: boolean;
  variant?: 'default' | 'glass' | 'outline' | 'accent' | 'primary' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg' | boolean;
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
}) => {
  const variantClasses = {
    default: "bg-secondary/50 border-border",
    glass: "bg-white/5 backdrop-blur-sm border-white/10",
    outline: "bg-transparent border-border",
    accent: "bg-primary/10 border-primary/20",
    primary: "bg-primary/10 border-primary/20 text-primary-foreground",
    flat: "bg-secondary/20 border-transparent"
  };

  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-6 sm:p-8"
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
        !noShadow && "shadow-lg shadow-black/5",
        interactive && "cursor-pointer transition-transform active:scale-[0.98]",
        hoverable && "transition-all duration-200 hover:border-border/60 hover:shadow-xl",
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
