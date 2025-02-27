
export const updateLastActivity = () => {
  localStorage.setItem('lastActivity', Date.now().toString());
};

export const getLastActivity = (): number => {
  const lastActivity = localStorage.getItem('lastActivity');
  return lastActivity ? parseInt(lastActivity, 10) : Date.now();
};

export const setupActivityTracking = (updateCallback: () => void) => {
  // List of events to track
  const events = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
    'click',
    'focus' // Adding focus event for better tracking
  ];

  const handleActivity = () => {
    updateLastActivity();
    updateCallback();
  };

  // Add event listeners
  events.forEach(event => {
    document.addEventListener(event, handleActivity);
  });

  // Return cleanup function
  return () => {
    events.forEach(event => {
      document.removeEventListener(event, handleActivity);
    });
  };
};

// Add function to sync session data with database
export const syncSessionWithDatabase = async (userId: string | undefined, event: string, metadata: any = {}) => {
  if (!userId) return;
  
  try {
    const { error } = await fetch('/api/session-sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        event,
        timestamp: new Date().toISOString(),
        metadata
      })
    });
    
    if (error) {
      console.error('Error syncing session with database:', error);
    }
  } catch (err) {
    console.error('Failed to sync session with database:', err);
  }
};
