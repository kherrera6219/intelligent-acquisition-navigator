
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { KeyboardEvent } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  highlight?: boolean;
  loading?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

export const GlassCard = ({
  children,
  className,
  clickable = false,
  highlight = false,
  loading = false,
  onClick,
  "aria-label": ariaLabel,
}: GlassCardProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "relative p-6 bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg",
        clickable && "hover:bg-black/60 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1 focus-visible:ring-offset-black",
        highlight && "ring-2 ring-fuchsia-500",
        loading && "pointer-events-none",
        className
      )}
      role={clickable ? "button" : "region"}
      aria-label={ariaLabel}
      aria-busy={loading}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? onClick : undefined}
      onKeyDown={handleKeyDown}
    >
      {loading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg
                      flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-fuchsia-500" aria-hidden="true" />
          <span className="sr-only">Loading…</span>
        </div>
      )}
      {children}
    </div>
  );
};
