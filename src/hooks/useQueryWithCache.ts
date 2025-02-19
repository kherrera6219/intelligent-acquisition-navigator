
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

interface QueryConfig<T> extends Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'> {
  showErrorToast?: boolean;
  errorMessage?: string;
}

export function useQueryWithCache<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  config: QueryConfig<T> = {}
) {
  const { 
    showErrorToast = true, 
    errorMessage = "Failed to fetch data", 
    ...queryConfig 
  } = config;

  return useQuery({
    queryKey,
    queryFn,
    meta: {
      onError: () => {
        if (showErrorToast) {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...queryConfig,
  });
}
