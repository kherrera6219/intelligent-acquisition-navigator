
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NetworkStatus {
  isOnline: boolean;
  isReconnecting: boolean;
  supabaseConnected: boolean;
  lastOnlineAt: Date | null;
  lastSyncTime: Date | null;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);
  const [lastOnlineAt, setLastOnlineAt] = useState<Date | null>(isOnline ? new Date() : null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Check Supabase connection
  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('health_check')
        .select('id')
        .limit(1)
        .timeout(5000);
        
      const isConnected = !error;
      setSupabaseConnected(isConnected);
      
      if (isConnected) {
        setLastSyncTime(new Date());
      }
      
      return isConnected;
    } catch (error) {
      console.error('Error checking Supabase connection:', error);
      setSupabaseConnected(false);
      return false;
    }
  };

  useEffect(() => {
    // Set up event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineAt(new Date());
      setIsReconnecting(true);
      
      // Check Supabase connection after coming back online
      checkSupabaseConnection().finally(() => {
        setIsReconnecting(false);
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSupabaseConnected(false);
    };

    // Set up event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial connection check
    checkSupabaseConnection();

    // Set up periodic connection check when online
    let intervalId: number | undefined;
    if (isOnline) {
      intervalId = window.setInterval(() => {
        checkSupabaseConnection();
      }, 60000); // Check every minute
    }

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isOnline]);

  return {
    isOnline,
    isReconnecting,
    supabaseConnected,
    lastOnlineAt,
    lastSyncTime
  };
};
