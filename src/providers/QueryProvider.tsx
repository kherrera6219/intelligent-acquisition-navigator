
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { errorTracker } from '@/lib/security/errorTracking';
import { auditLogger } from '@/lib/audit';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { clearExpiredCache } from '@/utils/cachedFetch';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
        retry: (failureCount, error) => {
          // Don't retry if we're offline or after 2 failures
          if (!isOnline) return false;
          if (failureCount >= 2) return false;
          
          return true;
        },
        refetchOnWindowFocus: isOnline,
        refetchOnReconnect: true,
        refetchOnMount: isOnline,
        meta: {
          onError: (error: Error) => {
            // Track error
            errorTracker.trackError({
              message: error.message,
              severity: 'MEDIUM',
              errorType: 'SYSTEM',
              status: 'NEW'
            });

            // Log to audit system
            auditLogger.log({
              action: 'API_ERROR',
              resourceType: 'API',
              resourceId: 'query',
              severity: 'WARNING',
              details: { error: error.message }
            }).catch(console.error);

            // Show toast only when online - offline errors are handled by the network status banner
            if (isOnline) {
              toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch data. Please try again."
              });
            }
          }
        }
      },
      mutations: {
        retry: (failureCount, error) => {
          // Don't retry if we're offline or after 1 failure
          if (!isOnline) return false;
          if (failureCount >= 1) return false;
          
          return true;
        },
        meta: {
          onError: (error: Error) => {
            // Track error
            errorTracker.trackError({
              message: error.message,
              severity: 'HIGH',
              errorType: 'SYSTEM',
              status: 'NEW'
            });

            // Log to audit system
            auditLogger.log({
              action: 'API_ERROR',
              resourceType: 'API',
              resourceId: 'mutation',
              severity: 'ERROR',
              details: { error: error.message }
            }).catch(console.error);

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

  // Clear expired cache periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      clearExpiredCache();
    }, 1000 * 60 * 15); // Every 15 minutes
    
    return () => clearInterval(intervalId);
  }, []);

  // Update refetch behaviors based on online status
  useEffect(() => {
    if (isOnline) {
      // When coming back online, invalidate stale queries
      queryClient.invalidateQueries();
    }
  }, [isOnline, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
