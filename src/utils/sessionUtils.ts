
/**
 * Sets up tracking for user activity
 * @param callback Function to call when activity is detected
 * @returns Cleanup function to remove event listeners
 */
export function setupActivityTracking(callback: () => void): () => void {
  const activityEvents = [
    'mousedown', 'mousemove', 'keydown', 
    'scroll', 'touchstart', 'click', 
    'focus', 'visibilitychange'
  ];
  
  // Function to handle activity events
  const handleActivity = () => {
    const now = Date.now();
    // Call the callback
    callback();
    // Update localStorage for cross-tab synchronization
    try {
      localStorage.setItem('last_activity', now.toString());
    } catch (error) {
      console.warn('Failed to update localStorage', error);
    }
  };
  
  // Add event listeners
  activityEvents.forEach(event => {
    window.addEventListener(event, handleActivity, { passive: true });
  });
  
  // Setup periodic checks for storage changes from other tabs
  const storageCheckInterval = setInterval(() => {
    try {
      const storedActivity = localStorage.getItem('last_activity');
      if (storedActivity) {
        const storedTime = parseInt(storedActivity, 10);
        // If there's recent activity in another tab
        if (storedTime > Date.now() - 5000) { // Within last 5 seconds
          callback();
        }
      }
    } catch (error) {
      console.warn('Failed to check localStorage', error);
    }
  }, 5000);
  
  // Initial activity trigger
  handleActivity();
  
  // Return cleanup function
  return () => {
    activityEvents.forEach(event => {
      window.removeEventListener(event, handleActivity);
    });
    clearInterval(storageCheckInterval);
  };
}

/**
 * Syncs session data with database to track user sessions
 * @param userId The user ID to track
 * @param eventType Type of event to log
 * @param metadata Additional metadata to store
 */
export async function syncSessionData(
  userId: string | undefined, 
  eventType: 'login' | 'logout' | 'session_refresh' | 'activity',
  metadata: Record<string, any> = {}
): Promise<void> {
  if (!userId) return;
  
  try {
    // This would normally use supabase.from('user_sessions').insert()
    // Just simulate the operation for now since we don't want to import supabase here
    console.log('Syncing session data:', { userId, eventType, metadata });
    
    // In a real implementation, this would be:
    /*
    const { error } = await supabase.from('user_sessions').insert([
      {
        user_id: userId,
        event_type: eventType,
        metadata: { 
          ...metadata,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
      }
    ]);
    
    if (error) {
      console.error('Failed to sync session data:', error);
    }
    */
  } catch (error) {
    console.error('Error syncing session data:', error);
  }
}

/**
 * Marks a session as expired in localStorage for cross-tab synchronization
 */
export function markSessionExpired(): void {
  try {
    localStorage.setItem('session_expired', 'true');
    // Clear after a short delay to allow other tabs to detect it
    setTimeout(() => {
      localStorage.removeItem('session_expired');
    }, 5000);
  } catch (error) {
    console.warn('Failed to mark session as expired', error);
  }
}
