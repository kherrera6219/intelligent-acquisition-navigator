
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { auditLogger } from '@/lib/audit';

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: isOnline ? 2 : 0,
        refetchOnWindowFocus: isOnline,
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        placeholderData: (previousData) => previousData,
      },
      mutations: {
        retry: isOnline ? 1 : 0,
      },
    },
  });

  // Log query cache operations in development
  if (process.env.NODE_ENV === 'development') {
    queryClient.getQueryCache().subscribe(event => {
      if (event.type === 'error') {
        console.error('Query error:', event.query.queryKey, event.error);
        
        // Log through audit system
        auditLogger.log({
          action: 'QUERY_ERROR',
          resource: `query:${event.query.queryKey.join(':')}`,
          details: { 
            error: event.error instanceof Error ? event.error.message : String(event.error) 
          },
          status: 'error'
        });
        
        // Show toast for network errors
        if (event.error instanceof Error && 
            (event.error.message.includes('network') || 
             event.error.message.includes('Network') ||
             event.error.message.includes('Failed to fetch'))) {
          toast({
            title: 'Network Error',
            description: 'Please check your internet connection and try again.',
            variant: 'destructive',
          });
        }
      }
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
