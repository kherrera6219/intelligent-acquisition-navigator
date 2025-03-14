
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GradientButtonProps extends Omit<ButtonProps, 'variant'> {
  gradientVariant?: "primary" | "secondary" | "rainbow" | "blue" | "destructive";
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  gradientVariant = "primary",
  className,
  disabled,
  loading = false,
  iconLeft,
  iconRight,
  ...props
}) => {
  const gradientClasses = {
    primary: "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600",
    secondary: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600",
    rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 hover:from-red-600 hover:via-yellow-600 hover:to-green-600",
    blue: "bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 hover:from-blue-600 hover:via-cyan-600 hover:to-sky-600",
    destructive: "bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:via-rose-600 hover:to-pink-600"
  };

  return (
    <Button
      className={cn(
        gradientClasses[gradientVariant],
        "text-white shadow-md relative border-0",
        "transition-all duration-300 animate-in fade-in-50",
        loading && "pointer-events-none",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </Button>
  );
};
