
import { useState, useEffect } from 'react';
import { checkSupabaseHealth, HealthStatus } from '@/utils/supabaseHealth';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

export function useSupabaseHealth(checkIntervalMs = 60000) {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { isOnline } = useNetworkMonitor();

  const checkHealth = async () => {
    if (!isOnline) return;
    
    try {
      setIsChecking(true);
      const status = await checkSupabaseHealth();
      setHealth(status);
    } catch (error) {
      console.error('Error in health check:', error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkHealth();
    
    // Set up interval for periodic checks
    const intervalId = setInterval(() => {
      checkHealth();
    }, checkIntervalMs);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [isOnline, checkIntervalMs]);

  return {
    health,
    isChecking,
    checkHealth
  };
}
