
import React from 'react';
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: boolean;
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-screen-2xl",
  full: "w-full max-w-none"
} as const;

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as: Component = "div",
  size = "lg",
  padding = true,
}) => (
  <Component
    className={cn(
      "mx-auto w-full h-full",
      padding && "px-3 sm:px-4 md:px-6 lg:px-8",
      sizeClasses[size],
      className
    )}
  >
    {children}
  </Component>
);
