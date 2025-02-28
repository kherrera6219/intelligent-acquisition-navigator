
import React, { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
  QueryCache,
} from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const { toast } = useToast();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        // Only show error toasts if we have not already custom handled them
        if (query.state.data !== undefined) {
          toast({
            title: 'Error',
            description: error instanceof Error ? error.message : 'An unknown error occurred',
            variant: 'destructive',
          });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'An unknown error occurred',
          variant: 'destructive',
        });
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
