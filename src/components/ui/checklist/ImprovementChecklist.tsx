import React, { useState, useEffect } from 'react';
import { useImprovement } from "@/contexts/ImprovementContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ChecklistSearch } from "./ChecklistSearch";
import { ChecklistPagination } from "./ChecklistPagination";
import { useOfflineChecklistData } from "@/hooks/useOfflineChecklistData";
import { ChecklistHeader } from "./ChecklistHeader";
import { ChecklistItems } from "./ChecklistItems";
import { ChecklistError } from "./ChecklistError";
import { ChecklistCompleted } from "./ChecklistCompleted";
import { ChecklistFeedback } from "./ChecklistFeedback";

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
  const [filter, setFilter] = useState<{ completed?: boolean; pending?: boolean }>({});
  const itemsPerPage = 5;

  const { 
    data: offlineChecklist, 
    updateItemOffline,
    hasPendingUpdates,
    pendingUpdatesCount 
  } = useOfflineChecklistData(checklist, isLoading, error);

  const filteredChecklist = offlineChecklist.filter(item => {
    const searchRegex = new RegExp(searchQuery, 'i');
    const matchesSearch = searchRegex.test(item.title) || searchRegex.test(item.description);
    
    if (filter.completed !== undefined) {
      return matchesSearch && item.completed === filter.completed;
    }
    if (filter.pending !== undefined) {
      return matchesSearch && item.completed === !filter.pending;
    }
    
    return matchesSearch;
  });

  const paginatedChecklist = filteredChecklist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter]);

  const handleToggleItem = (id: number) => {
    const item = offlineChecklist.find(i => i.id === id);
    if (!item) return;
    
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
      <ChecklistError 
        error={error}
        hasOfflineData={offlineChecklist.length > 0}
        offlineItemsCount={offlineChecklist.length}
      />
    );
  }

  return (
    <div className="w-full px-4 md:px-6 py-6">
      <ChecklistHeader 
        totalItems={offlineChecklist.length}
        completedCount={completedCount}
        hasPendingUpdates={hasPendingUpdates}
        pendingUpdatesCount={pendingUpdatesCount}
      />

      <ChecklistSearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        filterOptions={filter}
        onFilterChange={setFilter}
      />

      <ChecklistItems 
        items={paginatedChecklist}
        currentItem={currentItem}
        onToggle={handleToggleItem}
      />

      {filteredChecklist.length > itemsPerPage && (
        <ChecklistPagination 
          totalItems={filteredChecklist.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      <ChecklistCompleted show={completedCount === offlineChecklist.length} />

      {showFeedback && (
        <ChecklistFeedback 
          onClose={() => setShowFeedback(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};
