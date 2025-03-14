
/**
 * Utility to detect keyboard navigation and add a class to the body
 * This helps style focus states differently for keyboard vs. mouse users
 */

// Used to check if keyboard navigation is being used
export function isKeyboardUser(): boolean {
  // Only run in the browser
  if (typeof document === 'undefined') return false;
  
  return document.body.classList.contains('keyboard-user');
}

export function initKeyboardNavigationDetector(): (() => void) | void {
  // Only run in the browser
  if (typeof document === 'undefined') return;

  // Function to handle keyboard detection
  const handleFirstTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-user');
      
      // Remove the event listener after detecting keyboard use
      window.removeEventListener('keydown', handleFirstTab);
      
      // Add event listener for mouse use
      window.addEventListener('mousedown', handleMouseDown);
    }
  };

  // Function to handle mouse use
  const handleMouseDown = () => {
    document.body.classList.remove('keyboard-user');
    
    // Re-add keyboard detection when mouse is used
    window.addEventListener('keydown', handleFirstTab);
  };

  // Initialize the event listener
  window.addEventListener('keydown', handleFirstTab);

  // Clean up function
  const cleanup = () => {
    window.removeEventListener('keydown', handleFirstTab);
    window.removeEventListener('mousedown', handleMouseDown);
  };
  
  return cleanup;
}

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initKeyboardNavigationDetector);
}
