import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const NetworkStatusBanner: React.FC = () => {
  const isOnline = useNetworkStatus();
  const [visible, setVisible] = useState(false);
  const [recentlyChanged, setRecentlyChanged] = useState(false);
  const [offlineDuration, setOfflineDuration] = useState(0);
  const [offlineTimestamp, setOfflineTimestamp] = useState<number | null>(null);

  useEffect(() => {
    // Show banner immediately when offline
    if (!isOnline) {
      setVisible(true);
      setRecentlyChanged(true);
      
      // Record when we went offline
      if (offlineTimestamp === null) {
        setOfflineTimestamp(Date.now());
      }
    }
    
    // When coming back online, keep banner visible briefly and show duration
    if (isOnline && recentlyChanged) {
      if (offlineTimestamp !== null) {
        // Calculate duration in seconds
        const duration = Math.round((Date.now() - offlineTimestamp) / 1000);
        setOfflineDuration(duration);
        setOfflineTimestamp(null);
      }
      
      const timer = setTimeout(() => {
        setVisible(false);
        setRecentlyChanged(false);
      }, 5000); // Show for 5 seconds when coming back online
      
      return () => clearTimeout(timer);
    }
    
    // Track network status changes
    if (isOnline !== undefined) {
      setRecentlyChanged(true);
    }
    
  }, [isOnline, recentlyChanged, offlineTimestamp]);

  // If not visible, don't render anything
  if (!visible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-center px-4 py-3 text-sm font-medium w-full transition-colors ${
        isOnline 
          ? 'bg-green-500/10 text-green-300 border-t border-green-500/20' 
          : 'bg-red-500/10 text-red-300 border-t border-red-500/20'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4" />
              <span>
                {offlineDuration > 0
                  ? `You're back online. Connection was lost for ${offlineDuration} seconds.`
                  : "You're back online. App has been synchronized."}
              </span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <span>You're offline. Some features may be unavailable until connection is restored.</span>
            </>
          )}
        </div>
        
        {isOnline && (
          <button 
            onClick={() => setVisible(false)}
            className="text-xs underline underline-offset-2"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};
