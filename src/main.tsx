
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './routes';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './providers/ThemeProvider';
import { NetworkMonitorProvider } from './components/ui/universal/NetworkMonitorProvider'; 
import { ApplicationStatusProvider } from './components/ui/universal/ApplicationStatusProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './providers/AuthProvider';
import './styles/global.css';

// Create React Query client with offline support
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on network errors (will be handled by our offline system)
        if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
          return false;
        }
        // Otherwise retry 3 times
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NetworkMonitorProvider>
          <ApplicationStatusProvider>
            <AuthProvider>
              <RouterProvider router={browserRouter} />
              <Toaster />
            </AuthProvider>
          </ApplicationStatusProvider>
        </NetworkMonitorProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
