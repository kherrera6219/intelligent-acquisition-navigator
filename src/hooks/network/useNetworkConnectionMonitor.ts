
import { useState, useEffect, useCallback, useRef } from 'react';
import { ConnectionQuality, ConnectionMonitorOptions } from './types';
import { checkServerConnection, getNetworkInformation } from './connectionUtils';
import { useNetworkEvents } from './useNetworkEvents';
import { useNetworkState } from './useNetworkState';

/**
 * Hook for monitoring network connection status
 */
export function useNetworkConnectionMonitor(options: ConnectionMonitorOptions = {}) {
  const {
    pingEndpoint = '/api/ping',
    pingInterval = 30000,
    showToasts = true,
    onConnectionChange
  } = options;

  // States for network status
  const {
    connectionQuality,
    isReconnecting,
    setIsReconnecting,
    updateNetworkInfo,
    updateConnectionStatus
  } = useNetworkState();

  // Interval reference for cleanup
  const intervalRef = useRef<number | null>(null);

  // Network event handlers for online/offline events
  const { handleOnline, handleOffline } = useNetworkEvents({
    connectionQuality,
    updateConnectionStatus,
    updateNetworkInfo,
    setIsReconnecting,
    showToasts,
    onConnectionChange,
    pingEndpoint
  });

  // Function to perform periodic connectivity checks
  const checkConnection = useCallback(async () => {
    try {
      const result = await checkServerConnection(pingEndpoint);
      updateConnectionStatus(result.success, result.latency);
      
      // If connection status changes, update network info
      if (result.success) {
        updateNetworkInfo();
      }
      
      // Call the callback if provided
      if (onConnectionChange) {
        onConnectionChange({
          ...connectionQuality,
          isOnline: result.success,
          latency: result.latency,
          lastChecked: new Date()
        });
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      updateConnectionStatus(false, null);
    }
  }, [connectionQuality, updateConnectionStatus, updateNetworkInfo, onConnectionChange, pingEndpoint]);

  // Set up initial state and event listeners
  useEffect(() => {
    // Update network info immediately
    updateNetworkInfo();
    
    // Check initial connection status
    checkConnection();
    
    // Set up interval for periodic checks
    if (pingInterval > 0) {
      intervalRef.current = window.setInterval(checkConnection, pingInterval);
    }

    // Set up event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners and interval on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [checkConnection, handleOnline, handleOffline, pingInterval, updateNetworkInfo]);

  // Return the current connection state for use in components
  return {
    isOnline: connectionQuality.isOnline,
    latency: connectionQuality.latency,
    connectionType: connectionQuality.connectionType, 
    effectiveConnectionType: connectionQuality.effectiveConnectionType,
    downlink: connectionQuality.downlink,
    isReconnecting,
    checkConnection
  };
}
