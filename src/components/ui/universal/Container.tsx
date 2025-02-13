
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export const Container = ({ 
  children, 
  className,
  size = "default" 
}: ContainerProps) => {
  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-8",
      size === "sm" && "max-w-3xl",
      size === "default" && "max-w-7xl",
      size === "lg" && "max-w-[1400px]",
      className
    )}>
      {children}
    </div>
  );
};
