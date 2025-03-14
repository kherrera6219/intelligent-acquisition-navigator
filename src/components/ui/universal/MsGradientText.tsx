
import React from 'react';
import { cn } from "@/lib/utils";

interface MsGradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "blue" | "purple" | "cyan-blue" | "destructive";
  as?: keyof JSX.IntrinsicElements;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

export const MsGradientText: React.FC<MsGradientTextProps> = ({
  children,
  className,
  variant = "primary",
  as: Component = "span",
  size = "base",
}) => {
  const gradientVariants = {
    primary: "bg-gradient-to-r from-primary via-blue-400 to-primary",
    secondary: "bg-gradient-to-r from-secondary to-green-400",
    accent: "bg-gradient-to-r from-accent to-yellow-400",
    blue: "bg-gradient-to-r from-blue-500 to-blue-400",
    purple: "bg-gradient-to-r from-purple-500 to-pink-500",
    "cyan-blue": "bg-gradient-to-r from-cyan-400 to-blue-500",
    destructive: "bg-gradient-to-r from-red-500 to-rose-500"
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
    <Component
      className={cn(
        "bg-clip-text text-transparent inline-block animate-in fade-in-50 duration-500",
        gradientVariants[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
};
