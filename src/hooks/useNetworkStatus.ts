
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NetworkStatus {
  isOnline: boolean;
  isReconnecting: boolean;
  supabaseConnected: boolean;
  lastChecked: Date | null;
}

export function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isReconnecting: false,
    supabaseConnected: false,
    lastChecked: null
  });

  // Check Supabase connection
  const checkSupabaseConnection = useCallback(async () => {
    try {
      // Using a lightweight health check table to verify database connection
      const { data, error } = await supabase
        .from('health_check')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      // If we get here, even with no data, the connection is working
      setStatus(prev => ({ 
        ...prev, 
        supabaseConnected: !error,
        lastChecked: new Date()
      }));
      
      return !error;
    } catch (err) {
      setStatus(prev => ({ 
        ...prev, 
        supabaseConnected: false,
        lastChecked: new Date()
      }));
      return false;
    }
  }, []);

  // Handle online/offline events
  const handleOnline = useCallback(() => {
    setStatus(prev => ({ 
      ...prev, 
      isOnline: true,
      isReconnecting: true 
    }));
    
    // When we come back online, check Supabase connection
    checkSupabaseConnection().then(() => {
      setStatus(prev => ({ ...prev, isReconnecting: false }));
    });
  }, [checkSupabaseConnection]);

  const handleOffline = useCallback(() => {
    setStatus(prev => ({ 
      ...prev, 
      isOnline: false,
      supabaseConnected: false
    }));
  }, []);

  // Setup event listeners
  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial check
    checkSupabaseConnection();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline, checkSupabaseConnection]);

  // Periodic check when online
  useEffect(() => {
    let intervalId: number;
    
    if (status.isOnline) {
      intervalId = window.setInterval(() => {
        checkSupabaseConnection();
      }, 30000); // Check every 30 seconds
    }
    
    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [status.isOnline, checkSupabaseConnection]);

  return status;
}
