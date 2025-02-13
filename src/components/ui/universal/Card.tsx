
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "outline";
  hover?: boolean;
}

export const Card = ({ 
  children, 
  className,
  variant = "default",
  hover = true
}: CardProps) => {
  return (
    <div className={cn(
      "rounded-2xl p-6 transition-all duration-300",
      variant === "default" && "bg-black/40 border border-white/10",
      variant === "glass" && "bg-white/5 backdrop-blur-lg border border-white/10",
      variant === "outline" && "border border-white/10",
      hover && "hover:bg-white/5",
      className
    )}>
      {children}
    </div>
  );
};
