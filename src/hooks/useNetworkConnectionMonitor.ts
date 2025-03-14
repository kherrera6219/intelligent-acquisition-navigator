
import { useEffect, useCallback } from 'react';
import { ConnectionMonitorOptions, ConnectionQuality, ConnectionCheckResult } from './network/types';
import { checkServerConnection } from './network/connectionUtils';
import { useNetworkState } from './network/useNetworkState';
import { useNetworkEvents } from './network/useNetworkEvents';

export function useNetworkConnectionMonitor(options: ConnectionMonitorOptions = {}) {
  const {
    pingEndpoint = '/api/ping',
    pingInterval = 30000,
    showToasts = true,
    onConnectionChange
  } = options;
  
  const {
    connectionQuality,
    setConnectionQuality,
    isReconnecting,
    setIsReconnecting,
    updateNetworkInfo,
    updateConnectionStatus
  } = useNetworkState();
  
  const { handleOnline, handleOffline } = useNetworkEvents({
    connectionQuality,
    updateConnectionStatus,
    updateNetworkInfo,
    setIsReconnecting,
    showToasts,
    onConnectionChange,
    pingEndpoint
  });

  // Forcibly refresh connection status
  const refreshConnectionStatus = useCallback(async () => {
    setIsReconnecting(true);
    const result = await checkServerConnection(pingEndpoint);
    
    const newState = {
      isOnline: result.success,
      latency: result.latency,
      connectionType: connectionQuality.connectionType,
      effectiveConnectionType: connectionQuality.effectiveConnectionType,
      downlink: connectionQuality.downlink,
      lastChecked: new Date()
    };
    
    setConnectionQuality(newState);
    updateNetworkInfo();
    setIsReconnecting(false);
    
    if (onConnectionChange) {
      onConnectionChange(newState);
    }
    
    return result.success;
  }, [pingEndpoint, connectionQuality, setConnectionQuality, updateNetworkInfo, setIsReconnecting, onConnectionChange]);

  // Setup event listeners for online/offline events
  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Setup connection change event listener if available
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);
      // Initialize network info
      updateNetworkInfo();
    }

    // Initial check with server
    if (navigator.onLine) {
      checkServerConnection(pingEndpoint).then((result) => {
        if (!result.success && connectionQuality.isOnline) {
          handleOffline();
        }
      });
    }

    // Set up periodic check
    const intervalId = setInterval(() => {
      if (navigator.onLine) {
        checkServerConnection(pingEndpoint).then((result) => {
          const newState = {
            isOnline: result.success,
            latency: result.latency,
            connectionType: connectionQuality.connectionType,
            effectiveConnectionType: connectionQuality.effectiveConnectionType,
            downlink: connectionQuality.downlink,
            lastChecked: new Date()
          };
          
          if (result.success !== connectionQuality.isOnline) {
            setConnectionQuality(newState);
            
            if (result.success) {
              handleOnline();
            } else {
              handleOffline();
            }
          } else if (result.success) {
            // Just update latency if we're still online
            setConnectionQuality(prev => ({
              ...prev,
              latency: result.latency,
              lastChecked: new Date()
            }));
          }
          
          if (onConnectionChange) {
            onConnectionChange(newState);
          }
        });
      }
    }, pingInterval);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
      clearInterval(intervalId);
    };
  }, [
    handleOnline, 
    handleOffline, 
    updateNetworkInfo, 
    pingEndpoint, 
    connectionQuality.isOnline,
    pingInterval,
    onConnectionChange,
    setConnectionQuality
  ]);

  return {
    ...connectionQuality,
    isReconnecting,
    refreshConnectionStatus
  };
}
