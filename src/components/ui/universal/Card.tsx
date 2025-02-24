
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  interactive = false,
  hoverable = false,
  onClick,
}) => (
  <div
    className={cn(
      "rounded-lg border border-gray-200 bg-white p-6",
      "transition-all duration-200",
      interactive && "cursor-pointer",
      hoverable && "hover:bg-gray-50 hover:border-gray-300",
      className
    )}
    onClick={onClick}
  >
    {children}
  </div>
);
