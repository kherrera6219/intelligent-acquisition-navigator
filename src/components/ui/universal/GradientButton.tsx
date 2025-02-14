
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GradientButtonProps extends Omit<ButtonProps, 'variant'> {
  gradientVariant?: "primary" | "secondary";
  loading?: boolean;
}

export const GradientButton = ({ 
  children, 
  gradientVariant = "primary",
  className,
  disabled,
  loading = false,
  ...props 
}: GradientButtonProps) => {
  return (
    <Button
      className={cn(
        gradientVariant === "primary"
          ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
          : "bg-white/10 hover:bg-white/20 text-white border-white/10",
        "relative",
        loading && "pointer-events-none",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
};
