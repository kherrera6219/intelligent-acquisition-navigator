
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface MsDashboardGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6;
  gap?: "xs" | "sm" | "md" | "lg";
  className?: string;
  compact?: boolean;
}

const gapClasses = {
  xs: "gap-2",
  sm: "gap-3 sm:gap-4",
  md: "gap-4 sm:gap-5 md:gap-6",
  lg: "gap-5 sm:gap-6 md:gap-8",
} as const;

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
} as const;

export function MsDashboardGrid({
  children,
  columns = 3,
  gap = "md",
  className,
  compact = false,
}: MsDashboardGridProps) {
  return (
    <div
      className={cn(
        "grid w-full",
        columnClasses[columns],
        gapClasses[gap],
        compact && "mb-0",
        className
      )}
    >
      {children}
    </div>
  );
}
