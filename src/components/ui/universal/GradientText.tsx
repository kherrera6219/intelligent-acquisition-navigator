
import React from 'react';
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "destructive";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  variant = "primary",
  size = "base",
}) => {
  const variantClasses = {
    primary: "bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400",
    secondary: "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500",
    accent: "bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400",
    destructive: "bg-gradient-to-r from-red-500 via-rose-500 to-pink-500"
  };
  
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl"
  };

  return (
    <span
      className={cn(
        "bg-clip-text text-transparent inline-block",
        "animate-in fade-in-50 duration-500",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};
