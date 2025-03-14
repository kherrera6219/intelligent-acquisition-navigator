
import React from 'react';
import { cn } from "@/lib/utils";

interface MsCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "outline" | "elevated" | "glass" | "destructive";
  interactive?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  padding?: boolean | "none" | "sm" | "md" | "lg";
  border?: boolean;
}

export const MsCard: React.FC<MsCardProps> = ({
  children,
  className,
  variant = "default",
  interactive = false,
  hoverable = false,
  clickable = false,
  onClick,
  padding = true,
  border = true,
}) => {
  const variantClasses = {
    default: "ms-fluent-card bg-card/40",
    primary: "ms-fluent-card border-primary/20 bg-primary/5",
    secondary: "ms-fluent-card border-secondary/20 bg-secondary/5",
    outline: "border border-gray-700 bg-transparent",
    elevated: "ms-fluent-card ms-depth-16 bg-card/50",
    glass: "backdrop-blur-md bg-white/5 border-white/10",
    destructive: "ms-fluent-card border-destructive/20 bg-destructive/5"
  };

  const getPaddingClass = () => {
    if (padding === false || padding === "none") return "";
    if (padding === "sm") return "p-3";
    if (padding === "lg") return "p-6 sm:p-8";
    return "p-5";
  };

  return (
    <div
      className={cn(
        "rounded-xl",
        border && "border",
        variantClasses[variant],
        getPaddingClass(),
        interactive && "transition-transform active:scale-[0.98]",
        hoverable && "transition-all duration-200 hover:-translate-y-1 hover:shadow-xl",
        clickable && "cursor-pointer",
        "animate-in fade-in-50 duration-300",
        className
      )}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export const MsCardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
);

export const MsCardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => (
  <h3 className={cn("ms-title text-xl font-semibold", className)}>
    {children}
  </h3>
);

export const MsCardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => (
  <p className={cn("text-sm text-muted-foreground mt-1", className)}>
    {children}
  </p>
);

export const MsCardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => (
  <div className={cn("", className)}>
    {children}
  </div>
);

export const MsCardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => (
  <div className={cn("mt-4 pt-4 border-t border-gray-800/50 flex items-center justify-end", className)}>
    {children}
  </div>
);
