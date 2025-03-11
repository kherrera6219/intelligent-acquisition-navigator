
import { supabase } from '@/integrations/supabase/client';
import { ChecklistItem } from '@/contexts/ImprovementContext';

export interface FeedbackData {
  userId?: string;
  rating: number;
  comments: string;
  timestamp: string;
}

// Function to fetch checklist items from the API
export const fetchChecklistItems = async (): Promise<ChecklistItem[]> => {
  try {
    // First try to fetch from Supabase if available
    const { data, error } = await supabase
      .from('checklist_items')
      .select('*')
      .order('id');
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data as ChecklistItem[];
    } else {
      // Fallback to local data if no data in Supabase or other error
      throw new Error('No data found');
    }
  } catch (error) {
    console.log('Failed to fetch from API, using local data', error);
    // Return default items from localStorage or just return an empty array
    const storedItems = localStorage.getItem('checklist_items');
    return storedItems ? JSON.parse(storedItems) : [];
  }
};

// Function to update a checklist item
export const updateChecklistItem = async (
  id: number, 
  updates: Partial<ChecklistItem>
): Promise<ChecklistItem> => {
  try {
    // Try to update in Supabase
    const { data, error } = await supabase
      .from('checklist_items')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();
    
    if (error) throw error;
    return data as ChecklistItem;
  } catch (error) {
    console.log('Failed to update in API, updating local storage', error);
    
    // Fallback to localStorage
    const storedItems = localStorage.getItem('checklist_items');
    let items: ChecklistItem[] = storedItems ? JSON.parse(storedItems) : [];
    
    items = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    
    localStorage.setItem('checklist_items', JSON.stringify(items));
    const updatedItem = items.find(item => item.id === id);
    
    if (!updatedItem) {
      throw new Error(`Item with id ${id} not found`);
    }
    
    return updatedItem;
  }
};

// Function to submit feedback
export const submitFeedback = async (feedbackData: FeedbackData): Promise<void> => {
  try {
    // Try to submit to Supabase
    const { error } = await supabase
      .from('user_feedback')
      .insert([feedbackData]);
    
    if (error) throw error;
  } catch (error) {
    console.log('Failed to submit feedback to API, storing locally', error);
    
    // Fallback to localStorage
    const storedFeedback = localStorage.getItem('user_feedback');
    const feedbackItems: FeedbackData[] = storedFeedback ? JSON.parse(storedFeedback) : [];
    
    feedbackItems.push(feedbackData);
    localStorage.setItem('user_feedback', JSON.stringify(feedbackItems));
  }
};
