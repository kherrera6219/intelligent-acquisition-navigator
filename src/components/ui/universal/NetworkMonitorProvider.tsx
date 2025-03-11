
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNetworkErrorMonitor } from '@/hooks/useNetworkErrorMonitor';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Create context
interface NetworkContextType {
  isOnline: boolean;
  reconnecting: boolean;
  supabaseConnected: boolean;
  lastSyncTime: Date | null;
}

const NetworkContext = createContext<NetworkContextType>({
  isOnline: true,
  reconnecting: false,
  supabaseConnected: false,
  lastSyncTime: null
});

// Provider component
export const NetworkMonitorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const networkState = useNetworkErrorMonitor();
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const { toast } = useToast();
  
  // Check Supabase connection on mount and when online status changes
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      if (networkState.isOnline) {
        try {
          // Simple ping to see if Supabase is reachable
          const { data, error } = await supabase.from('_healthcheck').select('*').limit(1);
          
          // If no error or got a helpful error (e.g. table doesn't exist), consider connected
          const isConnected = !error || (error && error.code === 'PGRST116');
          setSupabaseConnected(isConnected);
          
          if (isConnected) {
            setLastSyncTime(new Date());
          }
        } catch (error) {
          console.warn('Supabase connection check failed:', error);
          setSupabaseConnected(false);
        }
      } else {
        setSupabaseConnected(false);
      }
    };
    
    checkSupabaseConnection();
    
    // Set up periodic connection check
    const intervalId = setInterval(() => {
      if (networkState.isOnline) {
        checkSupabaseConnection();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [networkState.isOnline]);
  
  // Show toast notifications on network status changes
  useEffect(() => {
    if (!networkState.isOnline) {
      toast({
        title: "You're Offline",
        description: "Working in offline mode. Some features may be limited.",
        variant: "destructive",
        duration: 5000,
      });
    } else if (networkState.reconnecting) {
      toast({
        title: "Reconnecting...",
        description: "Attempting to restore your connection.",
        duration: 3000,
      });
    }
  }, [networkState.isOnline, networkState.reconnecting, toast]);
  
  // Context value
  const contextValue = {
    ...networkState,
    supabaseConnected,
    lastSyncTime
  };
  
  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
};

// Hook for consuming the context
export const useNetworkMonitor = () => useContext(NetworkContext);
