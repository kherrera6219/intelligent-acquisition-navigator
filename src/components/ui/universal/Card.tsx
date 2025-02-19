
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  hoverable?: boolean;
}

export const Card = ({ 
  children, 
  className,
  interactive = false,
  hoverable = false,
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm p-6",
        "transition-all duration-200",
        interactive && "cursor-pointer",
        hoverable && "hover:bg-white/5 hover:border-white/20",
        className
      )}
    >
      {children}
    </div>
  );
};
