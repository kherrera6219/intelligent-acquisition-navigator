
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNetworkErrorMonitor } from '@/hooks/useNetworkErrorMonitor';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { checkSupabaseConnection, getLastSyncTime, setLastSyncTime } from '@/utils/supabaseHelper';
import { NetworkStatusBanner } from './NetworkStatusBanner';

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
  const [lastSyncTime, setLastSyncTimeState] = useState<Date | null>(getLastSyncTime());
  const { toast } = useToast();
  
  // Check Supabase connection on mount and when online status changes
  useEffect(() => {
    const checkConnectionStatus = async () => {
      if (networkState.isOnline) {
        try {
          const isConnected = await checkSupabaseConnection();
          setSupabaseConnected(isConnected);
          
          if (isConnected) {
            // Update and persist the last sync time
            const currentTime = new Date();
            setLastSyncTimeState(currentTime);
            setLastSyncTime(currentTime);
          }
        } catch (error) {
          console.warn('Supabase connection check failed:', error);
          setSupabaseConnected(false);
        }
      } else {
        setSupabaseConnected(false);
      }
    };
    
    checkConnectionStatus();
    
    // Set up periodic connection check
    const intervalId = setInterval(() => {
      if (networkState.isOnline) {
        checkConnectionStatus();
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
      {!networkState.isOnline && <NetworkStatusBanner />}
      {children}
    </NetworkContext.Provider>
  );
};

// Hook for consuming the context
export const useNetworkMonitor = () => useContext(NetworkContext);
