
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
    'click'
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
