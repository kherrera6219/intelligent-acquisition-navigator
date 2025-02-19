
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  hoverable?: boolean;
  onClick?: () => void; // Add onClick handler to the interface
}

export const Card = ({ 
  children, 
  className,
  interactive = false,
  hoverable = false,
  onClick, // Add onClick to destructured props
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
      onClick={onClick} // Add onClick to the div element
    >
      {children}
    </div>
  );
};
