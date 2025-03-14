
import React, { createContext, useContext, useEffect, useState } from 'react';
import { NetworkStatusBanner } from './NetworkStatusBanner';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { SkipLinks } from './SkipLinks';
import { initKeyboardNavigationDetector } from '@/utils/keyboardNavigationDetector';

interface ApplicationStatusContextType {
  isOnline: boolean;
  reconnecting: boolean;
  lastSyncTime: Date | null;
  pendingActions: number;
}

const ApplicationStatusContext = createContext<ApplicationStatusContextType>({
  isOnline: true,
  reconnecting: false,
  lastSyncTime: null,
  pendingActions: 0
});

export const useApplicationStatus = () => useContext(ApplicationStatusContext);

export const ApplicationStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOnline, isReconnecting: reconnecting, lastSyncTime } = useNetworkMonitor();
  const [pendingActions, setPendingActions] = useState<number>(0);
  
  // Get pending actions count on mount
  useEffect(() => {
    const getPendingActionsCount = async () => {
      try {
        // This would be integrated with your actual offline storage system
        const offlineStorage = localStorage.getItem('pendingActions');
        if (offlineStorage) {
          const actions = JSON.parse(offlineStorage);
          setPendingActions(Array.isArray(actions) ? actions.length : 0);
        }
      } catch (error) {
        console.error('Error getting pending actions count:', error);
      }
    };
    
    getPendingActionsCount();
    
    // Set up keyboard navigation detection
    initKeyboardNavigationDetector();
  }, []);
  
  const contextValue = {
    isOnline,
    reconnecting,
    lastSyncTime,
    pendingActions
  };
  
  return (
    <ApplicationStatusContext.Provider value={contextValue}>
      <SkipLinks />
      <NetworkStatusBanner />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </ApplicationStatusContext.Provider>
  );
};
