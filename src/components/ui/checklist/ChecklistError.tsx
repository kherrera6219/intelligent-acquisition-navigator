
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ChecklistErrorProps {
  error: Error;
  hasOfflineData: boolean;
  offlineItemsCount: number;
}

export const ChecklistError: React.FC<ChecklistErrorProps> = ({ 
  error, 
  hasOfflineData,
  offlineItemsCount 
}) => {
  return (
    <div className="w-full p-6 text-center">
      <div className="flex flex-col items-center justify-center gap-3 py-10">
        <AlertTriangle className="h-12 w-12 text-amber-500" />
        <p className="text-red-500 font-medium text-lg">Error loading checklist</p>
        <p className="text-sm text-gray-400 max-w-md mx-auto">{error.message}</p>
      </div>
      {hasOfflineData && offlineItemsCount > 0 && (
        <div className="mt-4 p-4 bg-amber-950/20 border border-amber-500/20 rounded-lg">
          <p className="text-sm text-amber-400 font-medium mb-2">Using cached checklist data</p>
          <p className="text-xs text-gray-400">Changes will sync when connection is restored</p>
        </div>
      )}
    </div>
  );
};
