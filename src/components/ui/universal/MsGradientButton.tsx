
import React from 'react';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";

interface MsGradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "subtle";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const MsGradientButton: React.FC<MsGradientButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white border-transparent",
    secondary: "bg-gradient-to-r from-secondary to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white border-transparent",
    accent: "bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700 text-black border-transparent",
    subtle: "bg-gradient-to-r from-gray-700/50 to-gray-800/50 hover:from-gray-700/70 hover:to-gray-800/70 text-white border-gray-700/50"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-lg"
  };
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-md",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
