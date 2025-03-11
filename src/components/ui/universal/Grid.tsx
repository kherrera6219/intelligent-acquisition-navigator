
import React from 'react';
import { cn } from "@/lib/utils";

interface GridContainerProps {
  children: React.ReactNode;
  fluid?: boolean;
  className?: string;
}

export const Container: React.FC<GridContainerProps> = ({
  children,
  fluid = false,
  className,
}) => (
  <div
    className={cn(
      fluid ? "container-fluid" : "container",
      className
    )}
  >
    {children}
  </div>
);

interface RowProps {
  children: React.ReactNode;
  className?: string;
}

export const Row: React.FC<RowProps> = ({
  children,
  className,
}) => (
  <div className={cn("row", className)}>
    {children}
  </div>
);

interface ColProps {
  children: React.ReactNode;
  xs?: number | "auto";
  sm?: number | "auto";
  md?: number | "auto";
  lg?: number | "auto";
  xl?: number | "auto";
  xxl?: number | "auto";
  className?: string;
}

export const Col: React.FC<ColProps> = ({
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className,
}) => {
  const colClasses = [];
  
  // Default col class if no specific breakpoint is provided
  if (!xs && !sm && !md && !lg && !xl && !xxl) {
    colClasses.push("col");
  }
  
  // Add responsive classes based on props
  if (xs) colClasses.push(xs === "auto" ? "col-auto" : `col-${xs}`);
  if (sm) colClasses.push(sm === "auto" ? "col-sm-auto" : `col-sm-${sm}`);
  if (md) colClasses.push(md === "auto" ? "col-md-auto" : `col-md-${md}`);
  if (lg) colClasses.push(lg === "auto" ? "col-lg-auto" : `col-lg-${lg}`);
  if (xl) colClasses.push(xl === "auto" ? "col-xl-auto" : `col-xl-${xl}`);
  if (xxl) colClasses.push(xxl === "auto" ? "col-xxl-auto" : `col-xxl-${xxl}`);
  
  return (
    <div className={cn(colClasses.join(" "), className)}>
      {children}
    </div>
  );
};
