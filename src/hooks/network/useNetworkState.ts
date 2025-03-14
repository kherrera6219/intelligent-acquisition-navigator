
import { useState, useCallback } from 'react';
import { ConnectionQuality } from './types';
import { getNetworkInformation } from './connectionUtils';

/**
 * Hook for managing network state information
 */
export function useNetworkState() {
  const [connectionQuality, setConnectionQuality] = useState<ConnectionQuality>({
    isOnline: navigator.onLine,
    latency: null,
    connectionType: null,
    effectiveConnectionType: null,
    downlink: null,
    lastChecked: new Date()
  });
  
  const [isReconnecting, setIsReconnecting] = useState(false);

  // Update network information when available
  const updateNetworkInfo = useCallback(() => {
    const { connectionType, effectiveConnectionType, downlink } = getNetworkInformation();
    
    setConnectionQuality(prev => ({
      ...prev,
      connectionType,
      effectiveConnectionType,
      downlink,
      lastChecked: new Date()
    }));
  }, []);
  
  // Update connection status
  const updateConnectionStatus = useCallback((isOnline: boolean, latency: number | null) => {
    setConnectionQuality(prev => ({
      ...prev,
      isOnline,
      latency,
      lastChecked: new Date()
    }));
  }, []);
  
  return {
    connectionQuality,
    setConnectionQuality,
    isReconnecting,
    setIsReconnecting,
    updateNetworkInfo,
    updateConnectionStatus
  };
}
