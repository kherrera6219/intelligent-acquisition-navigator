
import React from 'react';
import { cn } from "@/lib/utils";

interface MsGradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "blue" | "purple" | "cyan-blue";
  as?: keyof JSX.IntrinsicElements;
}

export const MsGradientText: React.FC<MsGradientTextProps> = ({
  children,
  className,
  variant = "primary",
  as: Component = "span",
}) => {
  const gradientVariants = {
    primary: "bg-gradient-to-r from-primary via-blue-400 to-primary",
    secondary: "bg-gradient-to-r from-secondary to-green-400",
    accent: "bg-gradient-to-r from-accent to-yellow-400",
    blue: "bg-gradient-to-r from-blue-500 to-blue-400",
    purple: "bg-gradient-to-r from-purple-500 to-pink-500",
    "cyan-blue": "bg-gradient-to-r from-cyan-400 to-blue-500"
  };

  return (
    <Component
      className={cn(
        "bg-clip-text text-transparent inline-block",
        gradientVariants[variant],
        className
      )}
    >
      {children}
    </Component>
  );
};
