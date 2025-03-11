
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNetworkMonitor } from './NetworkMonitorProvider';

/**
 * Network status monitor component that provides real-time feedback
 * about the application's connectivity state without rendering any UI
 */
export const NetworkStatusMonitor: React.FC = () => {
  const { isOnline, reconnecting } = useNetworkMonitor();
  
  // This component doesn't render any UI directly
  return null;
};
