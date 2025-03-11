
import { useState, useEffect } from 'react';
import { ChecklistItem } from '@/contexts/ImprovementContext';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const useOfflineChecklistData = (
  onlineData: ChecklistItem[],
  isLoading: boolean,
  error: Error | null
) => {
  const [offlineData, setOfflineData] = useState<ChecklistItem[]>([]);
  const [pendingUpdates, setPendingUpdates] = useState<{
    id: number;
    updates: Partial<ChecklistItem>;
  }[]>([]);
  const isOnline = useNetworkStatus();

  // Load cached data from localStorage when offline
  useEffect(() => {
    if (!isOnline && !isLoading) {
      const cachedData = localStorage.getItem('checklist_items');
      if (cachedData) {
        try {
          setOfflineData(JSON.parse(cachedData));
        } catch (e) {
          console.error('Error parsing cached checklist data:', e);
        }
      }
    }
  }, [isOnline, isLoading]);

  // Cache data to localStorage when online
  useEffect(() => {
    if (isOnline && onlineData.length > 0 && !isLoading && !error) {
      localStorage.setItem('checklist_items', JSON.stringify(onlineData));
      setOfflineData(onlineData);
    }
  }, [isOnline, onlineData, isLoading, error]);

  // Sync pending updates when online
  useEffect(() => {
    const syncPendingUpdates = async () => {
      if (isOnline && pendingUpdates.length > 0) {
        console.log('Syncing pending updates:', pendingUpdates);
        // This would be where we'd send the updates to the server
        // For now, we'll just clear the pending updates
        setPendingUpdates([]);
      }
    };

    syncPendingUpdates();
  }, [isOnline, pendingUpdates]);

  const updateItemOffline = (id: number, updates: Partial<ChecklistItem>) => {
    // Update in local state
    setOfflineData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );

    // Cache to localStorage
    const updatedData = offlineData.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    localStorage.setItem('checklist_items', JSON.stringify(updatedData));

    // Add to pending updates if offline
    if (!isOnline) {
      setPendingUpdates((prev) => [...prev, { id, updates }]);
    }
  };

  // Return the data that should be used (online or offline)
  const effectiveData = isOnline ? onlineData : offlineData;

  return {
    data: effectiveData.length > 0 ? effectiveData : onlineData,
    updateItemOffline,
    hasPendingUpdates: pendingUpdates.length > 0,
    pendingUpdatesCount: pendingUpdates.length,
  };
};
