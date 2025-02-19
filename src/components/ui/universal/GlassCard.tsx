
import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  highlight?: boolean;
  loading?: boolean;
  "aria-label"?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  clickable = false,
  highlight = false,
  loading = false,
  "aria-label": ariaLabel,
}) => (
  <div
    className={cn(
      "relative p-6 bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg",
      clickable && "hover:bg-black/60 transition-all duration-300 cursor-pointer",
      highlight && "ring-2 ring-fuchsia-500",
      loading && "pointer-events-none",
      className
    )}
    role={clickable ? "button" : "region"}
    aria-label={ariaLabel}
    aria-busy={loading}
    tabIndex={clickable ? 0 : undefined}
  >
    {loading && (
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-fuchsia-500" />
      </div>
    )}
    {children}
  </div>
);
