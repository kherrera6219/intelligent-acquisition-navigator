
import { supabase } from "@/integrations/supabase/client";

/**
 * Logs user activity for audit purposes
 * @param userId The ID of the user performing the action
 * @param action The action being performed
 * @param resourceType The type of resource being acted upon
 * @param resourceId The ID of the resource being acted upon (optional)
 * @param details Additional details about the action (optional)
 */
export const logUserActivity = async (
  userId: string | undefined,
  action: string,
  resourceType: string,
  resourceId?: string,
  details?: Record<string, any>
) => {
  if (!userId) {
    console.warn('Attempted to log activity for undefined user ID');
    return;
  }

  try {
    const { error } = await supabase.from('audit_logs').insert({
      user_id: userId,
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      details
    });

    if (error) {
      console.error('Error logging user activity:', error);
    }
  } catch (err) {
    console.error('Failed to log user activity:', err);
  }
};

/**
 * Logs authentication events
 * @param userId The ID of the user
 * @param event The authentication event (login, logout, signup, etc.)
 * @param details Additional details about the event (optional)
 */
export const logAuthEvent = async (
  userId: string | undefined,
  event: 'login' | 'logout' | 'signup' | 'password_reset' | 'verification' | 'password_update',
  details?: Record<string, any>
) => {
  return logUserActivity(userId, event, 'authentication', undefined, details);
};

/**
 * Logs data access events
 * @param userId The ID of the user accessing the data
 * @param action The action being performed (read, create, update, delete)
 * @param resourceType The type of resource being accessed
 * @param resourceId The ID of the resource being accessed
 * @param details Additional details about the access (optional)
 */
export const logDataAccess = async (
  userId: string | undefined,
  action: 'read' | 'create' | 'update' | 'delete',
  resourceType: string,
  resourceId: string,
  details?: Record<string, any>
) => {
  return logUserActivity(userId, action, resourceType, resourceId, details);
};
