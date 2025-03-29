
import React from 'react';
import { cn } from '@/lib/utils';

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
  className?: string;
}

export const ApiEndpoint: React.FC<ApiEndpointProps> = ({ 
  method, 
  endpoint, 
  description,
  className
}) => {
  const getMethodColor = () => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'PUT': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'PATCH': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className={cn("p-4 rounded-md border border-border bg-muted/20", className)}>
      <div className="flex items-start">
        <div className={cn(
          "px-2 py-1 rounded text-xs font-mono font-bold w-16 text-center mr-3",
          getMethodColor()
        )}>
          {method}
        </div>
        <div className="flex-1">
          <div className="font-mono text-sm mb-1">{endpoint}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        <div>
          <button className="text-xs text-primary hover:underline">
            Try it
          </button>
        </div>
      </div>
    </div>
  );
};
