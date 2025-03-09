
import React from 'react';
import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6;
  gap?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const gapClasses = {
  xs: "gap-1 sm:gap-2",
  sm: "gap-2 sm:gap-3",
  md: "gap-3 sm:gap-4 md:gap-5",
  lg: "gap-4 sm:gap-6 md:gap-8",
} as const;

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 xs:grid-cols-2",
  3: "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  6: "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
} as const;

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 1,
  gap = "md",
  className,
}) => (
  <div
    className={cn(
      "grid w-full",
      columnClasses[columns],
      gapClasses[gap],
      className
    )}
  >
    {children}
  </div>
);
