
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useQueryWithCache = <T>(
  queryKey: string[],
  fetchFn: () => Promise<T>,
  options: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> = {}
) => {
  const { toast } = useToast();

  return useQuery({
    queryKey,
    queryFn: fetchFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (replacing deprecated cacheTime)
    retry: 2,
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    ...options,
  });
};
