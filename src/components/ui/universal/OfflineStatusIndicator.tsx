
import React from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNetworkMonitor } from './NetworkMonitorProvider';

interface OfflineStatusIndicatorProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
  iconOnly?: boolean;
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  className,
  showLabel = true,
  compact = false,
  iconOnly = false
}) => {
  const { isOnline, reconnecting } = useNetworkMonitor();
  
  const iconSize = compact ? 'h-3 w-3' : 'h-4 w-4';
  const baseClasses = 'inline-flex items-center gap-1.5 rounded-full';
  const variantClasses = isOnline
    ? 'text-green-400'
    : 'text-red-400';
  
  // If iconOnly, just render the icon
  if (iconOnly) {
    if (reconnecting) {
      return <RefreshCw className={cn(iconSize, 'text-yellow-400 animate-spin', className)} aria-label="Reconnecting" />;
    }
    
    return isOnline
      ? <Wifi className={cn(iconSize, 'text-green-400', className)} aria-label="Online" />
      : <WifiOff className={cn(iconSize, 'text-red-400', className)} aria-label="Offline" />;
  }
  
  const containerClasses = cn(
    baseClasses,
    variantClasses,
    compact ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
    className
  );
  
  // If reconnecting, show that state
  if (reconnecting) {
    return (
      <div className={cn(containerClasses, 'text-yellow-400 bg-yellow-500/10')} role="status">
        <RefreshCw className={cn(iconSize, 'animate-spin')} aria-hidden="true" />
        {showLabel && <span>Reconnecting</span>}
      </div>
    );
  }
  
  return (
    <div className={cn(containerClasses, isOnline ? 'bg-green-500/10' : 'bg-red-500/10')} role="status">
      {isOnline 
        ? <Wifi className={iconSize} aria-hidden="true" />
        : <WifiOff className={iconSize} aria-hidden="true" />
      }
      {showLabel && <span>{isOnline ? 'Online' : 'Offline'}</span>}
    </div>
  );
};
