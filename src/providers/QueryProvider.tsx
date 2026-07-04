
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { errorTracker } from '@/lib/security/errorTracking';
import { auditLogger } from '@/lib/audit';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const { toast } = useToast();
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
        retry: 2,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
        meta: {
          onError: (error: Error) => {
            // Track error
            errorTracker.trackError({
              message: error.message,
              severity: 'MEDIUM',
              errorType: 'SYSTEM', // Changed from 'API' to 'SYSTEM'
              status: 'NEW'
            });

            // Log to audit system
            auditLogger.log({
              action: 'API_ERROR',
              resourceType: 'API',
              resourceId: 'query',
              severity: 'WARNING',
              details: { error: error.message }
            }).catch(() => undefined);

            // Show toast
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to fetch data. Please try again."
            });
          }
        }
      },
      mutations: {
        retry: 1,
        meta: {
          onError: (error: Error) => {
            // Track error
            errorTracker.trackError({
              message: error.message,
              severity: 'HIGH',
              errorType: 'SYSTEM', // Changed from 'API' to 'SYSTEM'
              status: 'NEW'
            });

            // Log to audit system
            auditLogger.log({
              action: 'API_ERROR',
              resourceType: 'API',
              resourceId: 'mutation',
              severity: 'ERROR',
              details: { error: error.message }
            }).catch(() => undefined);

            // Show toast
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to save changes. Please try again."
            });
          }
        }
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
