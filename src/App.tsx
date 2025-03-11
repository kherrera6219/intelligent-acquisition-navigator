
import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import CookieConsent from '@/components/CookieConsent';
import { NetworkStatusMonitor } from '@/components/ui/universal/NetworkStatusMonitor';
import { NetworkMonitorProvider } from '@/components/ui/universal/NetworkMonitorProvider';
import { initOfflineDB, clearExpiredCache } from '@/utils/offlineStorage';
import { generateCsrfToken } from '@/utils/csrfProtection';
import { supabase } from '@/integrations/supabase/client';
import { checkSupabaseConnection } from '@/utils/supabaseHelper';

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
        
        // Check Supabase connection status
        const isConnected = await checkSupabaseConnection();
        console.log('Supabase connection:', isConnected ? 'Connected' : 'Disconnected');
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
            <NetworkStatusMonitor />
            <RouterProvider router={router} />
            <CookieConsent />
            <Toaster />
          </NetworkMonitorProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
