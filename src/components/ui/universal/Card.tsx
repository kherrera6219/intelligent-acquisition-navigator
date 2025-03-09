
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  noShadow?: boolean;
  variant?: 'default' | 'glass' | 'outline' | 'accent';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  interactive = false,
  hoverable = false,
  onClick,
  noShadow = false,
  variant = 'default',
}) => {
  const variantClasses = {
    default: "bg-secondary border-border",
    glass: "bg-white/5 backdrop-blur-sm border-white/10",
    outline: "bg-transparent border-border",
    accent: "bg-primary/10 border-primary/20"
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-5",
        variantClasses[variant],
        !noShadow && "shadow-lg shadow-black/5",
        interactive && "cursor-pointer transition-transform active:scale-[0.98]",
        hoverable && "card-hover",
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
