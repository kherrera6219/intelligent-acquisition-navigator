
import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { NetworkStatusIcon } from './NetworkStatusIcon';
import { cn } from '@/lib/utils';

interface EnhancedNetworkBannerProps {
  isOnline: boolean;
  className?: string;
}

export const EnhancedNetworkBanner: React.FC<EnhancedNetworkBannerProps> = ({
  isOnline,
  className
}) => {
  const [visible, setVisible] = useState(!isOnline);
  const [recentlyChanged, setRecentlyChanged] = useState(false);
  
  useEffect(() => {
    if (isOnline) {
      setRecentlyChanged(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setRecentlyChanged(false);
      }, 3000); // Auto-hide banner after 3 seconds when back online
      
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
      setRecentlyChanged(true);
      const timer = setTimeout(() => {
        setRecentlyChanged(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!visible) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg",
        "flex items-center justify-between gap-3 w-[calc(100%-2rem)] max-w-md",
        recentlyChanged ? "animate-slide-up" : "",
        isOnline 
          ? "bg-green-500/20 border border-green-500/30 text-green-500" 
          : "bg-red-500/20 border border-red-500/30 text-red-500",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {isOnline ? (
          <NetworkStatusIcon isOnline={true} iconSize={20} />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <div>
          <p className="font-medium">
            {isOnline ? "You're back online" : "No internet connection"}
          </p>
          <p className="text-xs opacity-80">
            {isOnline 
              ? "Your internet connection has been restored." 
              : "You're working offline. Some features may be unavailable."}
          </p>
        </div>
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="text-current opacity-70 hover:opacity-100"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
};
