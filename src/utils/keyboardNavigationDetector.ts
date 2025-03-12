
/**
 * Utility to detect and manage keyboard navigation for improved accessibility
 * This helps differentiate between mouse users and keyboard users
 * to show appropriate focus indicators only when needed
 */

export const initKeyboardNavigationDetector = (): void => {
  // Don't initialize more than once
  if (window.keyboardNavigationDetectorInitialized) return;
  
  // Function to add keyboard user class
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-user');
    }
  };
  
  // Function to remove keyboard user class on mouse interaction
  const handleMouseDown = (): void => {
    document.body.classList.remove('keyboard-user');
  };
  
  // Add event listeners
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('mousedown', handleMouseDown);
  
  // Mark as initialized
  window.keyboardNavigationDetectorInitialized = true;
  
  // Set initial state - assume not keyboard user until Tab is pressed
  document.body.classList.remove('keyboard-user');
};

// Helper to check if a user is currently navigating via keyboard
export const isKeyboardUser = (): boolean => {
  return document.body.classList.contains('keyboard-user');
};

// Types for TypeScript
declare global {
  interface Window {
    keyboardNavigationDetectorInitialized?: boolean;
  }
}

export default initKeyboardNavigationDetector;
