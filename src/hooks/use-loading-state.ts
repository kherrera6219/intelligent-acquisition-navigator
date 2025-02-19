
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

interface UseLoadingStateOptions {
  showErrorToast?: boolean;
  errorMessage?: string;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const { 
    showErrorToast = true, 
    errorMessage = "An error occurred" 
  } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const wrap = useCallback(
    async <T>(promise: Promise<T>): Promise<T | undefined> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await promise;
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("An error occurred");
        setError(error);
        
        if (showErrorToast) {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
        
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [showErrorToast, errorMessage]
  );

  return {
    isLoading,
    error,
    wrap,
  };
}
