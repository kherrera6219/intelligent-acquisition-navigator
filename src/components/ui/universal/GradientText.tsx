
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export const GradientText = ({ 
  children, 
  className,
  variant = "primary" 
}: GradientTextProps) => {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        variant === "primary" 
          ? "bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400" 
          : "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500",
        className
      )}
    >
      {children}
    </span>
  );
};
