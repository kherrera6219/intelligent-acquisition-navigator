
export const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour
export const ACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const setupActivityTracking = (
  callback: () => void
): (() => void) => {
  const updateActivity = () => callback();

  window.addEventListener('mousemove', updateActivity);
  window.addEventListener('keydown', updateActivity);
  window.addEventListener('click', updateActivity);
  window.addEventListener('touchstart', updateActivity);

  return () => {
    window.removeEventListener('mousemove', updateActivity);
    window.removeEventListener('keydown', updateActivity);
    window.removeEventListener('click', updateActivity);
    window.removeEventListener('touchstart', updateActivity);
  };
};
