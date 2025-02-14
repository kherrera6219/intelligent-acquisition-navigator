
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";

interface GradientButtonProps extends Omit<ButtonProps, 'variant'> {
  gradientVariant?: "primary" | "secondary";
}

export const GradientButton = ({ 
  children, 
  gradientVariant = "primary",
  className,
  ...props 
}: GradientButtonProps) => {
  return (
    <Button
      className={cn(
        gradientVariant === "primary"
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
