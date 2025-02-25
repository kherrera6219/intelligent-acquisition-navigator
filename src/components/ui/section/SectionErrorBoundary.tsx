
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SectionErrorBoundaryProps {
  children: React.ReactNode;
}

export const SectionErrorBoundary = ({ children }: SectionErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  if (hasError) {
    return (
      <div className="p-6 text-center bg-red-500/10 rounded-lg" role="alert">
        <p className="text-red-500 mb-4">Failed to load this section</p>
        <Button 
          variant="outline"
          onClick={() => setHasError(false)}
          className="gap-2 hover:bg-red-500/20"
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return children;
};
