
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  highlight?: boolean;
}

export const GlassCard = ({ 
  children, 
  className,
  clickable = false,
  highlight = false
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "p-6 bg-black/40 backdrop-blur-sm border-white/5",
        clickable && "hover:bg-black/60 transition-all duration-300",
        highlight && "ring-2 ring-fuchsia-500",
        className
      )}
    >
      {children}
    </div>
  );
};
