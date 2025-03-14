
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ChecklistErrorProps {
  error: Error | string;
  hasOfflineData: boolean;
  offlineItemsCount: number;
}

export const ChecklistError: React.FC<ChecklistErrorProps> = ({
  error,
  hasOfflineData,
  offlineItemsCount
}) => {
  return (
    <Card className="p-6 border-red-200 dark:border-red-900">
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
            Failed to load checklist
          </h3>
          <p className="text-red-700 dark:text-red-300 mt-2">
            {typeof error === 'string' ? error : error.message}
          </p>
          
          {hasOfflineData && (
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                You're viewing {offlineItemsCount} items from your last session. 
                Some data might be out of date.
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <Button className="space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
