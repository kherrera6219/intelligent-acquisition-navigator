
import React, { createContext, useContext, useEffect } from 'react';
import { useNetworkErrorMonitor } from '@/hooks/useNetworkErrorMonitor';
import { useToast } from '@/hooks/use-toast';

// Create context
interface NetworkContextType {
  isOnline: boolean;
  reconnecting: boolean;
}

const NetworkContext = createContext<NetworkContextType>({
  isOnline: true,
  reconnecting: false
});

// Provider component
export const NetworkMonitorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const networkState = useNetworkErrorMonitor();
  const { toast } = useToast();
  
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
  
  return (
    <NetworkContext.Provider value={networkState}>
      {children}
    </NetworkContext.Provider>
  );
};

// Hook for consuming the context
export const useNetworkMonitor = () => useContext(NetworkContext);
