
import React from 'react';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

interface MsGradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "subtle" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const MsGradientButton: React.FC<MsGradientButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  loading = false,
  icon,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white border-transparent shadow-md shadow-primary/20",
    secondary: "bg-gradient-to-r from-secondary to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white border-transparent shadow-md shadow-secondary/20",
    accent: "bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700 text-black border-transparent shadow-md shadow-accent/20",
    subtle: "bg-gradient-to-r from-gray-700/50 to-gray-800/50 hover:from-gray-700/70 hover:to-gray-800/70 text-white border-gray-700/50",
    outline: "bg-transparent hover:bg-gray-800/50 text-white border border-gray-600 hover:border-primary/50 shadow-sm",
    ghost: "bg-transparent hover:bg-gray-800/30 text-white border-transparent"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-lg"
  };
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
        variantStyles[variant],
        sizeStyles[size],
        loading && "opacity-70 pointer-events-none",
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </Comp>
  );
};
