
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { errorTracker } from '@/lib/security/errorTracking';
import { auditLogger } from '@/lib/audit';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Wrap the entire app with TanStack Query.
 *
 * Error handling note: TanStack Query v5 removed per-query meta.onError callbacks.
 * Global error handling is done via QueryCache / MutationCache constructors instead.
 * See: https://tanstack.com/query/v5/docs/framework/react/guides/migrating-to-v5
 */
export const QueryProvider = ({ children }: QueryProviderProps) => {
  const { toast } = useToast();

  const [queryClient] = useState(() => {
    const handleQueryError = (error: Error) => {
      errorTracker.trackError({
        message: error.message,
        severity: 'MEDIUM',
        errorType: 'SYSTEM',
        status: 'NEW',
      });
      auditLogger.log({
        action: 'API_ERROR',
        resourceType: 'API',
        resourceId: 'query',
        severity: 'WARNING',
        details: { error: error.message },
      }).catch(console.error);
      toast({
        variant: 'destructive',
        title: 'Failed to load data',
        description: 'Please try refreshing the page.',
      });
    };

    const handleMutationError = (error: Error) => {
      errorTracker.trackError({
        message: error.message,
        severity: 'HIGH',
        errorType: 'SYSTEM',
        status: 'NEW',
      });
      auditLogger.log({
        action: 'API_ERROR',
        resourceType: 'API',
        resourceId: 'mutation',
        severity: 'ERROR',
        details: { error: error.message },
      }).catch(console.error);
      toast({
        variant: 'destructive',
        title: 'Failed to save changes',
        description: 'Please try again.',
      });
    };

    return new QueryClient({
      queryCache: new QueryCache({ onError: handleQueryError }),
      mutationCache: new MutationCache({ onError: handleMutationError }),
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,    // 5 minutes
          gcTime:    1000 * 60 * 30,   // 30 minutes
          retry: 2,
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          refetchOnMount: false,
        },
        mutations: {
          retry: 1,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
