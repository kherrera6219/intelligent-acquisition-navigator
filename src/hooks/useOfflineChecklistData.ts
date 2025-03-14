
import { useState, useEffect, useCallback } from 'react';
import { ChecklistItem } from '@/types/checklist';

export const useOfflineChecklistData = () => {
  const [localItems, setLocalItems] = useState<ChecklistItem[]>([]);
  const [pendingUpdates, setPendingUpdates] = useState<Record<number, Partial<ChecklistItem>>>({});
  
  const STORAGE_KEY = 'checklist_items';
  const PENDING_UPDATES_KEY = 'checklist_pending_updates';

  // Load data from local storage on initial mount
  useEffect(() => {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if (storedItems) {
      try {
        setLocalItems(JSON.parse(storedItems));
      } catch (error) {
        console.error('Failed to parse stored checklist items:', error);
      }
    }

    const storedUpdates = localStorage.getItem(PENDING_UPDATES_KEY);
    if (storedUpdates) {
      try {
        setPendingUpdates(JSON.parse(storedUpdates));
      } catch (error) {
        console.error('Failed to parse stored pending updates:', error);
      }
    }
  }, []);

  // Update an item offline
  const updateItemOffline = useCallback((id: number, updates: Partial<ChecklistItem>) => {
    // Update local copy of items
    setLocalItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      );
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      
      return updatedItems;
    });

    // Track pending updates to sync when online
    setPendingUpdates(prev => {
      const newUpdates = { 
        ...prev,
        [id]: { ...prev[id], ...updates }
      };
      
      localStorage.setItem(PENDING_UPDATES_KEY, JSON.stringify(newUpdates));
      
      return newUpdates;
    });
  }, []);

  // Clear pending updates (after successful sync)
  const clearPendingUpdates = useCallback(() => {
    setPendingUpdates({});
    localStorage.removeItem(PENDING_UPDATES_KEY);
  }, []);

  // Get pending updates in a format ready for syncing
  const getPendingUpdatesForSync = useCallback(() => {
    return Object.entries(pendingUpdates).map(([idStr, updates]) => ({
      id: parseInt(idStr, 10),
      updates
    }));
  }, [pendingUpdates]);

  return {
    localItems,
    updateItemOffline,
    clearPendingUpdates,
    getPendingUpdatesForSync,
    hasPendingChanges: Object.keys(pendingUpdates).length > 0,
    pendingUpdatesCount: Object.keys(pendingUpdates).length
  };
};
