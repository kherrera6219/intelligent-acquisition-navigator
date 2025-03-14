
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import CookieConsent from '@/components/CookieConsent';
import { NetworkStatusMonitor } from '@/components/ui/universal/NetworkStatusMonitor';
import { NetworkMonitorProvider } from '@/components/ui/universal/NetworkMonitorProvider';
import { initOfflineDB, clearExpiredCache } from '@/utils/offlineStorage';
import { generateCsrfToken } from '@/utils/csrfProtection';
import { browserRouter } from './routes/index';

function App() {
  // Initialize security and storage features on app load
  useEffect(() => {
    // Initialize CSRF token
    generateCsrfToken();
    
    // Initialize offline database
    const setupOfflineStorage = async () => {
      try {
        await initOfflineDB();
        // Clear expired cache items
        await clearExpiredCache();
      } catch (error) {
        console.error('Error initializing offline storage:', error);
      }
    };
    
    setupOfflineStorage();
  }, []);
  
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <NetworkMonitorProvider>
            <NetworkStatusMonitor />
            <RouterProvider router={browserRouter} />
            <CookieConsent />
            <Toaster />
          </NetworkMonitorProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
