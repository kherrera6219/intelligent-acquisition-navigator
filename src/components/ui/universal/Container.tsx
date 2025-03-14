
import React from 'react';
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean | "none" | "sm" | "md" | "lg";
  variant?: "default" | "internal" | "fluid" | "glass" | "card" | "fluent" | "ms-fluent";
  centered?: boolean;
  maxWidth?: string;
}

const sizeClasses = {
  xs: "max-w-screen-sm",
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "w-full max-w-none"
} as const;

const variantClasses = {
  default: "",
  internal: "rounded-lg overflow-hidden bg-secondary/10 backdrop-blur-sm border border-border",
  fluid: "px-0 sm:px-0 md:px-0 lg:px-0",
  glass: "rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10",
  card: "rounded-lg overflow-hidden bg-secondary/20 backdrop-blur-sm border border-border shadow-xl",
  fluent: "rounded-xl overflow-hidden fluent-panel",
  "ms-fluent": "rounded-xl overflow-hidden ms-fluent-panel"
} as const;

const paddingClasses = {
  none: "px-0",
  sm: "px-3 xs:px-4",
  md: "px-3 xs:px-4 sm:px-5 md:px-6",
  lg: "px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12"
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as: Component = "div",
  size = "lg",
  padding = "md",
  variant = "default",
  centered = true,
  maxWidth,
}) => {
  const getPaddingClass = () => {
    if (padding === false) return "";
    if (padding === true) return paddingClasses.md;
    return paddingClasses[padding];
  };

  return (
    <Component
      className={cn(
        "w-full h-full",
        centered && "mx-auto",
        getPaddingClass(),
        sizeClasses[size],
        variantClasses[variant],
        "animate-in fade-in-50 duration-500",
        className
      )}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {children}
    </Component>
  );
};
