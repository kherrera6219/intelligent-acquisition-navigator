
import { supabase } from '@/integrations/supabase/client';
import type { Activity } from '@/types/dashboard';
import { recentActivities } from '@/data/dashboardMockData';

/**
 * Fetch recent activities from the API
 */
export const fetchRecentActivities = async (): Promise<Activity[]> => {
  try {
    // In a real implementation, this would fetch from Supabase or other data source
    // const { data, error } = await supabase
    //   .from('activities')
    //   .select('*')
    //   .order('timestamp', { ascending: false })
    //   .limit(20);
    
    // if (error) {
    //   throw new Error(`Failed to fetch activities: ${error.message}`);
    // }
    
    // return data as Activity[];
    
    // For demo purposes, we'll return mock data with a slight delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return recentActivities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

/**
 * Get all unique activity categories
 */
export const getActivityCategories = async (): Promise<string[]> => {
  try {
    // In a real implementation, this would fetch from Supabase or other data source
    // const { data, error } = await supabase
    //   .from('activities')
    //   .select('category')
    //   .order('category');
    
    // if (error) {
    //   throw new Error(`Failed to fetch activity categories: ${error.message}`);
    // }
    
    // Extract unique categories
    // const categories = [...new Set(data.map(item => item.category))];
    // return categories;
    
    // For demo purposes, extract from mock data
    const categories = [...new Set(recentActivities.map(activity => activity.category))];
    return categories;
  } catch (error) {
    console.error('Error fetching activity categories:', error);
    throw error;
  }
};

/**
 * Filter activities by category
 */
export const filterActivitiesByCategory = (
  activities: Activity[], 
  category: string | null
): Activity[] => {
  if (!category) return activities;
  return activities.filter(activity => activity.category === category);
};
