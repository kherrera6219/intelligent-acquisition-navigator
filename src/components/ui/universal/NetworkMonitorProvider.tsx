
import React, { createContext, useContext } from 'react';
import { useNetworkErrorMonitor } from '@/hooks/useNetworkErrorMonitor';

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
  
  return (
    <NetworkContext.Provider value={networkState}>
      {children}
    </NetworkContext.Provider>
  );
};

// Hook for consuming the context
export const useNetworkMonitor = () => useContext(NetworkContext);
