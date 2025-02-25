
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  noShadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  interactive = false,
  hoverable = false,
  onClick,
  noShadow = false,
}) => (
  <div
    className={cn(
      "rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm p-6",
      !noShadow && "shadow-lg shadow-black/5",
      interactive && "cursor-pointer transition-transform active:scale-[0.98]",
      hoverable && "hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200",
      className
    )}
    onClick={onClick}
    role={interactive ? "button" : undefined}
    tabIndex={interactive ? 0 : undefined}
  >
    {children}
  </div>
);
