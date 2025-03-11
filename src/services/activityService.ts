
import { supabase } from '@/integrations/supabase/client';
import type { RecentActivity } from '@/types/dashboard';
import { LucideIcon } from 'lucide-react';
import { AlertCircle, FileText, Users, Settings, Bell } from 'lucide-react';

// Map of icon names to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  AlertCircle,
  FileText,
  Users,
  Settings,
  Bell
};

// Fetch recent activities from Supabase
export const fetchRecentActivities = async (): Promise<RecentActivity[]> => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching recent activities:', error);
      throw error;
    }

    // Transform the data to match our RecentActivity type
    return (data || []).map(item => ({
      title: item.title,
      timestamp: item.timestamp,
      icon: iconMap[item.icon_name] || FileText, // Default to FileText if icon not found
      description: item.description,
      category: item.category
    }));
  } catch (error) {
    console.error('Failed to fetch recent activities:', error);
    return []; // Return empty array on error
  }
};

// Add a new activity to Supabase
export const addActivity = async (activity: {
  title: string;
  description?: string;
  category?: string;
  icon_name: string;
}): Promise<void> => {
  try {
    const { error } = await supabase.from('activities').insert([
      {
        title: activity.title,
        description: activity.description,
        category: activity.category,
        icon_name: activity.icon_name,
        timestamp: new Date().toISOString(),
      }
    ]);

    if (error) {
      console.error('Error adding activity:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to add activity:', error);
    throw error;
  }
};
