
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
  xl: "max-w-[1400px]",
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
      "mx-auto",
      padding && "px-4 sm:px-6 md:px-8 lg:px-10",
      sizeClasses[size],
      className
    )}
  >
    {children}
  </Component>
);
