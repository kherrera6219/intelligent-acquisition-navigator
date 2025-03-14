
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { useSupabaseHealth } from '@/hooks/useSupabaseHealth';
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export const SupabaseStatus: React.FC = () => {
  const { isOnline } = useNetworkMonitor();
  const { health, isChecking } = useSupabaseHealth();
  
  const getBadgeVariant = () => {
    if (!isOnline) return "destructive";
    if (!health) return "outline";
    
    switch (health.overall) {
      case 'error': return "destructive";
      case 'warning': return "secondary"; // Changed from "warning" to "secondary" to match available variants
      case 'ok': return "outline"; // Changed from "success" to "outline" 
      default: return "outline";
    }
  };
  
  const getStatusIcon = () => {
    if (!isOnline) return <AlertCircle className="h-3 w-3 text-destructive" />;
    if (!health) return <HelpCircle className="h-3 w-3 text-muted-foreground" />;
    
    switch (health.overall) {
      case 'error': return <AlertCircle className="h-3 w-3 text-destructive" />;
      case 'warning': return <AlertCircle className="h-3 w-3 text-amber-500" />; // Using amber color for warning
      case 'ok': return <CheckCircle className="h-3 w-3 text-green-500" />; // Using green color for success
      default: return <HelpCircle className="h-3 w-3 text-muted-foreground" />;
    }
  };
  
  const getStatusText = () => {
    if (!isOnline) return "Network Offline";
    if (!health) return "Checking Connection...";
    
    switch (health.overall) {
      case 'error': return "Supabase Connection Error";
      case 'warning': return "Supabase Connection Warning";
      case 'ok': return "Supabase Connected";
      default: return "Connection Status Unknown";
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5">
            <Badge variant={getBadgeVariant()} className={`h-2 w-2 rounded-full p-0 ${isChecking ? 'animate-pulse' : ''}`}>
              <span className="sr-only">{getStatusText()}</span>
            </Badge>
            {getStatusIcon()}
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-64 p-3">
          <div className="space-y-2">
            <p className="font-semibold">{getStatusText()}</p>
            
            {health && (
              <>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <span>API:</span>
                  <span className={`
                    ${health.api === 'ok' ? 'text-green-500' : ''}
                    ${health.api === 'warning' ? 'text-amber-500' : ''}
                    ${health.api === 'error' ? 'text-destructive' : ''}
                  `}>
                    {health.api.toUpperCase()}
                  </span>
                  
                  <span>Database:</span>
                  <span className={`
                    ${health.database === 'ok' ? 'text-green-500' : ''}
                    ${health.database === 'warning' ? 'text-amber-500' : ''}
                    ${health.database === 'error' ? 'text-destructive' : ''}
                  `}>
                    {health.database.toUpperCase()}
                  </span>
                  
                  <span>Auth:</span>
                  <span className={`
                    ${health.auth === 'ok' ? 'text-green-500' : ''}
                    ${health.auth === 'warning' ? 'text-amber-500' : ''}
                    ${health.auth === 'error' ? 'text-destructive' : ''}
                  `}>
                    {health.auth.toUpperCase()}
                  </span>
                  
                  <span>Latency:</span>
                  <span>{health.latency}ms</span>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Last checked: {health.lastChecked.toLocaleTimeString()}
                </p>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
