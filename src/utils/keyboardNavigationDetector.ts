
/**
 * Utility for detecting keyboard navigation
 * Adds a class to the body when keyboard navigation is detected
 */
export const initKeyboardNavigationDetector = (): void => {
  // Add keyboard detection
  const handleFirstTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      
      // Once we know they're using keyboard, we don't need this listener anymore
      window.removeEventListener('keydown', handleFirstTab);
    }
  };

  // Add mouse detection to remove keyboard focus styles when mouse is used
  const handleMouseDown = () => {
    document.body.classList.remove('user-is-tabbing');
    
    // Re-add the keyboard listener
    window.addEventListener('keydown', handleFirstTab);
  };

  // Add the listeners
  window.addEventListener('keydown', handleFirstTab);
  window.addEventListener('mousedown', handleMouseDown);
  
  // Return cleanup function for React useEffect if needed
  return () => {
    window.removeEventListener('keydown', handleFirstTab);
    window.removeEventListener('mousedown', handleMouseDown);
  };
};
