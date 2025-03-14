
import { useState, useEffect } from 'react';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { useImprovementActions } from './useImprovementActions';
import { ChecklistItem } from '@/types/checklist';

export const useOfflineChecklistData = () => {
  const { isOnline } = useNetworkMonitor();
  const [localItems, setLocalItems] = useState<ChecklistItem[]>([]);
  const [pendingChanges, setPendingChanges] = useState<any[]>([]);
  const { updateItem } = useImprovementActions();

  useEffect(() => {
    // Load locally stored checklist items on mount
    const loadOfflineData = () => {
      try {
        const storedItems = localStorage.getItem('checklist_items');
        const storedChanges = localStorage.getItem('pending_changes');
        
        if (storedItems) {
          setLocalItems(JSON.parse(storedItems));
        }
        
        if (storedChanges) {
          setPendingChanges(JSON.parse(storedChanges));
        }
      } catch (error) {
        console.error('Error loading offline data:', error);
      }
    };
    
    loadOfflineData();
  }, []);

  useEffect(() => {
    // Sync pending changes when back online
    const syncPendingChanges = async () => {
      if (isOnline && pendingChanges.length > 0) {
        console.log('Syncing pending changes:', pendingChanges.length);
        
        for (const change of pendingChanges) {
          try {
            await updateItem(change.id, change.data);
            // Remove this change from pending changes
            setPendingChanges(prev => prev.filter(c => c.id !== change.id));
          } catch (error) {
            console.error('Error syncing change:', error);
          }
        }
        
        // Update localStorage with remaining changes
        localStorage.setItem('pending_changes', JSON.stringify(pendingChanges));
      }
    };
    
    syncPendingChanges();
  }, [isOnline, pendingChanges, updateItem]);

  const saveLocalChange = (id: string, data: any) => {
    // Add to pending changes
    const newChange = { id, data, timestamp: Date.now() };
    setPendingChanges(prev => [...prev.filter(c => c.id !== id), newChange]);
    
    // Update localStorage
    try {
      localStorage.setItem('pending_changes', JSON.stringify([
        ...pendingChanges.filter(c => c.id !== id),
        newChange
      ]));
    } catch (error) {
      console.error('Error saving local change:', error);
    }
    
    // Update local items
    setLocalItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
    
    try {
      localStorage.setItem('checklist_items', JSON.stringify(localItems));
    } catch (error) {
      console.error('Error saving local items:', error);
    }
  };

  return {
    localItems,
    pendingChanges,
    saveLocalChange,
    hasPendingChanges: pendingChanges.length > 0
  };
};
