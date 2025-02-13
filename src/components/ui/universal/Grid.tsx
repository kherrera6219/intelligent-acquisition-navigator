
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg" | "xl";
}

export const Grid = ({ 
  children, 
  className,
  columns = 1,
  gap = "md"
}: GridProps) => {
  return (
    <div className={cn(
      "grid",
      columns === 1 && "grid-cols-1",
      columns === 2 && "grid-cols-1 md:grid-cols-2",
      columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      columns === 5 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      columns === 6 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
      gap === "sm" && "gap-2",
      gap === "md" && "gap-4",
      gap === "lg" && "gap-6",
      gap === "xl" && "gap-8",
      className
    )}>
      {children}
    </div>
  );
};
