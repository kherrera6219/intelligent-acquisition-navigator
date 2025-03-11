
import { supabase } from '@/integrations/supabase/client';
import { ChecklistItem } from '@/contexts/ImprovementContext';

const TABLE_NAME = 'checklist_items';
const FEEDBACK_TABLE = 'user_feedback';

// Type for feedback data
export interface FeedbackData {
  feedback: string;
  rating: number;
  timestamp: string;
  completedCount: number;
}

// Function to fetch checklist items from Supabase
export const fetchChecklistItems = async (): Promise<ChecklistItem[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching checklist items:', error);
    throw new Error(`Failed to fetch checklist items: ${error.message}`);
  }

  return data || [];
};

// Function to update a checklist item
export const updateChecklistItem = async (
  id: number,
  updates: Partial<ChecklistItem>
): Promise<ChecklistItem> => {
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
};

// Function to submit feedback
export const submitFeedback = async (
  feedbackData: FeedbackData
): Promise<void> => {
  const { error } = await supabase
    .from(FEEDBACK_TABLE)
    .insert([feedbackData]);

  if (error) {
    console.error('Error submitting feedback:', error);
    throw new Error(`Failed to submit feedback: ${error.message}`);
  }
};

// Initialize checklist items if they don't exist
export const initializeChecklist = async (
  initialItems: ChecklistItem[]
): Promise<void> => {
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
};
