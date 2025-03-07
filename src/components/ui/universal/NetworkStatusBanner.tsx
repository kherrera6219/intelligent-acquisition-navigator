import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const NetworkStatusBanner: React.FC = () => {
  const isOnline = useNetworkStatus();
  const [visible, setVisible] = useState(false);
  const [recentlyChanged, setRecentlyChanged] = useState(false);

  useEffect(() => {
    // Show banner immediately when offline
    if (!isOnline) {
      setVisible(true);
      setRecentlyChanged(true);
    }
    
    // When coming back online, keep banner visible briefly
    if (isOnline && recentlyChanged) {
      const timer = setTimeout(() => {
        setVisible(false);
        setRecentlyChanged(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    // Track network status changes
    if (isOnline !== undefined) {
      setRecentlyChanged(true);
    }
    
  }, [isOnline, recentlyChanged]);

  if (!visible) return null;

  return (
    <div 
      className={`flex items-center px-4 py-2 text-sm font-medium w-full transition-colors ${
        isOnline 
          ? 'bg-green-500/10 text-green-300' 
          : 'bg-red-500/10 text-red-300'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4" />
              <span>You're back online. App has been synchronized.</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <span>You're offline. Some features may be unavailable.</span>
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
