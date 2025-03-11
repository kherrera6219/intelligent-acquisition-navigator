import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from './routes'; 
import AppRoutes from './routes/AppRoutes'; 
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import CookieConsent from '@/components/CookieConsent';
import { NetworkStatusMonitor } from '@/components/ui/universal/NetworkStatusMonitor';
import { NetworkMonitorProvider } from '@/components/ui/universal/NetworkMonitorProvider';
import { initOfflineDB, clearExpiredCache } from '@/utils/offlineStorage';
import { generateCsrfToken } from '@/utils/csrfProtection';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';
import { supabase } from '@/integrations/supabase/client';

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
    
    // Set up supabase auth listener for session persistence
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('User signed in: ', session?.user?.id);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
      }
    });
    
    // Cleanup subscription when unmounting
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <NetworkMonitorProvider>
            <Router>
              <NetworkStatusMonitor />
              <NetworkStatusBanner />
              <AppRoutes routes={routes} />
              <CookieConsent />
              <Toaster />
            </Router>
          </NetworkMonitorProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
