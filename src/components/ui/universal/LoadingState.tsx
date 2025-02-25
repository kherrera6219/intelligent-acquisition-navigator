
import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  className?: string;
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "inline" | "full" | "overlay" | "skeleton";
  skeletonClassName?: string;
  skeletonCount?: number;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
} as const;

export const LoadingState: React.FC<LoadingStateProps> = ({
  className,
  message = "Loading...",
  size = "md",
  variant = "full",
  skeletonClassName = "h-16 w-full",
  skeletonCount = 3
}) => {
  const content = (
    <>
      <Loader2 className={cn("animate-spin", sizeMap[size])} />
      {message && <p className="mt-2 text-gray-400">{message}</p>}
    </>
  );

  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={cn(
              "bg-white/5 animate-pulse rounded-lg",
              skeletonClassName
            )} 
          />
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        {content}
      </span>
    );
  }

  if (variant === "overlay") {
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50",
          className
        )}
      >
        <div className="flex flex-col items-center">{content}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[200px]", className)}>
      {content}
    </div>
  );
};

