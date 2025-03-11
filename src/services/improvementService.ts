
import { supabase } from '@/integrations/supabase/client';
import { ChecklistItem } from '@/contexts/ImprovementContext';

const TABLE_NAME = 'checklist_items';
const FEEDBACK_TABLE = 'user_feedback';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms

// Type for feedback data
export interface FeedbackData {
  feedback: string;
  rating: number;
  timestamp: string;
  completedCount: number;
}

// Function with retry mechanism
const withRetry = async <T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 1) throw error;
    
    console.log(`Operation failed, retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 1.5); // Exponential backoff
  }
};

// Function to fetch checklist items from Supabase
export const fetchChecklistItems = async (): Promise<ChecklistItem[]> => {
  return withRetry(async () => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching checklist items:', error);
      throw new Error(`Failed to fetch checklist items: ${error.message}`);
    }

    return data || [];
  });
};

// Function to update a checklist item
export const updateChecklistItem = async (
  id: number,
  updates: Partial<ChecklistItem>
): Promise<ChecklistItem> => {
  return withRetry(async () => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating checklist item:', error);
      throw new Error(`Failed to update checklist item: ${error.message}`);
    }

    return data;
  });
};

// Function to submit feedback
export const submitFeedback = async (
  feedbackData: FeedbackData
): Promise<void> => {
  return withRetry(async () => {
    const { error } = await supabase
      .from(FEEDBACK_TABLE)
      .insert([feedbackData]);

    if (error) {
      console.error('Error submitting feedback:', error);
      throw new Error(`Failed to submit feedback: ${error.message}`);
    }
  });
};

// Initialize checklist items if they don't exist
export const initializeChecklist = async (
  initialItems: ChecklistItem[]
): Promise<void> => {
  return withRetry(async () => {
    // First check if items already exist
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error checking for existing checklist items:', error);
      throw new Error(`Failed to check for existing items: ${error.message}`);
    }

    // If no items exist, insert the initial items
    if (data.length === 0) {
      const { error: insertError } = await supabase
        .from(TABLE_NAME)
        .insert(initialItems);

      if (insertError) {
        console.error('Error initializing checklist items:', insertError);
        throw new Error(`Failed to initialize checklist: ${insertError.message}`);
      }
    }
  });
};

// Search checklist items by query
export const searchChecklistItems = async (
  query: string
): Promise<ChecklistItem[]> => {
  return withRetry(async () => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('id');

    if (error) {
      console.error('Error searching checklist items:', error);
      throw new Error(`Failed to search checklist items: ${error.message}`);
    }

    return data || [];
  });
};

// Batch update checklist items (for syncing)
export const batchUpdateChecklistItems = async (
  updates: { id: number; updates: Partial<ChecklistItem> }[]
): Promise<void> => {
  return withRetry(async () => {
    // Note: Supabase doesn't have a batch update, so we'll do them sequentially
    for (const item of updates) {
      const { error } = await supabase
        .from(TABLE_NAME)
        .update(item.updates)
        .eq('id', item.id);
      
      if (error) {
        console.error(`Error batch updating checklist item ${item.id}:`, error);
        throw new Error(`Failed to update checklist item ${item.id}: ${error.message}`);
      }
    }
  });
};
