
import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from './routes'; // Fixed import
import AppRoutes from './routes/AppRoutes'; 
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import CookieConsent from '@/components/CookieConsent';
import { NetworkStatusMonitor } from '@/components/ui/universal/NetworkStatusMonitor';
import { initOfflineDB, clearExpiredCache } from '@/utils/offlineStorage';
import { generateCsrfToken } from '@/utils/csrfProtection';

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
          <Router>
            <NetworkStatusMonitor />
            <AppRoutes routes={routes} />
            <CookieConsent />
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
