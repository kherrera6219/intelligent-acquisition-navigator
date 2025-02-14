
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@radix-ui/react-button";

interface GradientButtonProps extends ButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export const GradientButton = ({ 
  children, 
  variant = "primary",
  className,
  ...props 
}: GradientButtonProps) => {
  return (
    <Button
      className={cn(
        variant === "primary"
          ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
          : "bg-white/10 hover:bg-white/20 text-white border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
