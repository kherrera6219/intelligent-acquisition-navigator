
import React from 'react';
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: boolean;
  variant?: "default" | "internal" | "fluid" | "glass" | "card" | "fluent";
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-screen-2xl",
  full: "w-full max-w-none"
} as const;

const variantClasses = {
  default: "",
  internal: "rounded-lg overflow-hidden bg-secondary/10 backdrop-blur-sm border border-border",
  fluid: "px-0 sm:px-0 md:px-0 lg:px-0",
  glass: "rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10",
  card: "rounded-lg overflow-hidden bg-secondary/20 backdrop-blur-sm border border-border shadow-xl",
  fluent: "rounded-xl overflow-hidden fluent-panel"
} as const;

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as: Component = "div",
  size = "lg",
  padding = true,
  variant = "default",
}) => (
  <Component
    className={cn(
      "mx-auto w-full h-full",
      padding && "px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12",
      sizeClasses[size],
      variantClasses[variant],
      className
    )}
  >
    {children}
  </Component>
);
