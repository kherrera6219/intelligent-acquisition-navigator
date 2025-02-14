
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm p-6",
        className
      )}
    >
      {children}
    </div>
  );
};
