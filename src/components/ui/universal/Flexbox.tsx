
import React from 'react';
import { cn } from "@/lib/utils";

interface FlexboxProps {
  children: React.ReactNode;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const justifyMap = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignMap = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const gapMap = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export const Flexbox: React.FC<FlexboxProps> = ({
  children,
  direction = "row",
  wrap = "nowrap",
  justify = "start",
  align = "start",
  gap = "none",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex",
        `flex-${direction}`,
        wrap !== "nowrap" && `flex-${wrap}`,
        justifyMap[justify],
        alignMap[align],
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
};

// Commonly used flexbox configurations as pre-defined components
export const FlexRow: React.FC<Omit<FlexboxProps, 'direction'>> = (props) => (
  <Flexbox {...props} direction="row" />
);

export const FlexColumn: React.FC<Omit<FlexboxProps, 'direction'>> = (props) => (
  <Flexbox {...props} direction="column" />
);

export const FlexCenter: React.FC<Omit<FlexboxProps, 'justify' | 'align'>> = (props) => (
  <Flexbox {...props} justify="center" align="center" />
);

export const FlexBetween: React.FC<Omit<FlexboxProps, 'justify'>> = (props) => (
  <Flexbox {...props} justify="between" />
);
