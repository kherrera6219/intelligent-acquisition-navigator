
import React, { memo, useState, useEffect, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChecklistFeedback } from "./ChecklistFeedback";
import { useImprovement, ChecklistItem } from "@/contexts/ImprovementContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ChecklistSearch } from "./ChecklistSearch";
import { ChecklistPagination } from "./ChecklistPagination";
import { useOfflineChecklistData } from "@/hooks/useOfflineChecklistData";

// Memoized checklist item component for performance optimization
const ChecklistItemComponent = memo(({ 
  item, 
  isCurrentItem, 
  onToggle 
}: { 
  item: ChecklistItem; 
  isCurrentItem: boolean; 
  onToggle: () => void 
}) => (
  <Card 
    key={item.id}
    className={cn(
      "p-3 sm:p-4 transition-all duration-300 cursor-pointer hover:bg-white/5",
      "transform hover:-translate-y-0.5 hover:shadow-lg",
      item.completed && "bg-green-950/10 border-green-800/20",
      isCurrentItem && "border-primary"
    )}
    onClick={onToggle}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <div className={cn(
        "pt-1",
        item.completed ? "text-green-500" : "text-primary"
      )}>
        {item.completed ? (
          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <Circle className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-medium text-sm sm:text-base break-words",
          item.completed && "text-green-400"
        )}>
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 break-words">
          {item.description}
        </p>
      </div>
    </div>
  </Card>
));

ChecklistItemComponent.displayName = 'ChecklistItemComponent';

export const ImprovementChecklist: React.FC = () => {
  const { 
    checklist, 
    toggleItem, 
    completedCount, 
    currentItem, 
    showFeedback, 
    setShowFeedback, 
    handleFeedbackSubmit,
    isLoading,
    error
  } = useImprovement();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Use the offline data hook
  const { 
    data: offlineChecklist, 
    updateItemOffline,
    hasPendingUpdates,
    pendingUpdatesCount 
  } = useOfflineChecklistData(checklist, isLoading, error);

  // Filter checklist items based on search query
  const filteredChecklist = useMemo(() => {
    return offlineChecklist.filter(item => {
      const searchRegex = new RegExp(searchQuery, 'i');
      return searchRegex.test(item.title) || searchRegex.test(item.description);
    });
  }, [offlineChecklist, searchQuery]);

  // Get current page items
  const paginatedChecklist = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredChecklist.slice(startIndex, endIndex);
  }, [filteredChecklist, currentPage, itemsPerPage]);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle checklist item toggle
  const handleToggleItem = (id: number) => {
    // Find the item
    const item = offlineChecklist.find(i => i.id === id);
    if (!item) return;
    
    // Update both online and offline state
    toggleItem(id);
    updateItemOffline(id, { completed: !item.completed });
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 text-center">
        <p className="text-red-500 mb-2">Error loading checklist</p>
        <p className="text-sm text-gray-400">{error.message}</p>
        {offlineChecklist.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-amber-400 mb-2">Using cached checklist data</p>
            {/* Display cached checklist here */}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-6 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Improvement Checklist</h2>
        <div className="flex items-center gap-2">
          <div className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            completedCount === offlineChecklist.length 
              ? "bg-green-500/20 text-green-400" 
              : "bg-blue-500/20 text-blue-400"
          )}>
            {completedCount} / {offlineChecklist.length} completed
          </div>
          {hasPendingUpdates && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
              {pendingUpdatesCount} pending sync
            </span>
          )}
        </div>
      </div>

      <ChecklistSearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      <div className="grid gap-3 sm:gap-4">
        {paginatedChecklist.length > 0 ? (
          paginatedChecklist.map((item) => (
            <ChecklistItemComponent 
              key={item.id}
              item={item} 
              isCurrentItem={currentItem === item.id - 1}
              onToggle={() => handleToggleItem(item.id)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            {searchQuery 
              ? "No items match your search. Try a different query."
              : "No checklist items available."}
          </div>
        )}
      </div>

      <ChecklistPagination 
        totalItems={filteredChecklist.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {completedCount === offlineChecklist.length && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
          <h3 className="text-green-400 font-medium mb-2">All items completed! 🎉</h3>
          <p className="text-sm text-gray-400">Great job! You've completed all improvement tasks.</p>
        </div>
      )}

      {showFeedback && (
        <ChecklistFeedback 
          onClose={() => setShowFeedback(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};
