
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChecklistHeaderProps {
  totalItems: number;
  completedCount: number;
  hasPendingUpdates: boolean;
  pendingUpdatesCount: number;
}

export const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({
  totalItems,
  completedCount,
  hasPendingUpdates,
  pendingUpdatesCount
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white">Improvement Checklist</h2>
      <div className="flex items-center gap-2">
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          completedCount === totalItems 
            ? "bg-green-500/20 text-green-400" 
            : "bg-blue-500/20 text-blue-400"
        )}>
          {completedCount} / {totalItems} completed
        </div>
        {hasPendingUpdates && (
          <Badge variant="outline" className="bg-amber-100/10 text-amber-400 border-amber-400/30">
            {pendingUpdatesCount} pending sync
          </Badge>
        )}
      </div>
    </div>
  );
};
