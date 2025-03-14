/**
 * Accessibility utilities for improving focus management,
 * screen reader announcements, and keyboard navigation.
 */

/**
 * Announces a message to screen readers using aria-live regions
 * @param message The message to announce
 * @param priority 'polite' (default) or 'assertive'
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const elementId = priority === 'assertive' ? 'aria-live-assertive' : 'aria-live-polite';
  const element = document.getElementById(elementId);
  
  if (element) {
    element.textContent = message;
  } else {
    console.warn(`Aria live region with id '${elementId}' not found.`);
  }
};

/**
 * Sets focus to an element and announces the action to screen readers
 * @param elementId The ID of the element to focus
 * @param announcement Optional message to announce to screen readers
 */
export const setAccessibleFocus = (elementId: string, announcement?: string) => {
  const element = document.getElementById(elementId);
  
  if (element) {
    // Focus the element
    element.focus();
    
    // Optionally announce the action
    if (announcement) {
      announceToScreenReader(announcement);
    }
  } else {
    console.warn(`Element with id '${elementId}' not found for focus.`);
  }
};

/**
 * Detects if the user is navigating with a keyboard
 * @returns A function to set up keyboard navigation detection
 */
export const detectKeyboardNavigation = () => {
  const handleFirstTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-user');
      
      // Remove the event listener after first detection
      window.removeEventListener('keydown', handleFirstTab);
      
      // Add listener to detect mouse usage
      window.addEventListener('mousedown', handleMouseDown);
    }
  };
  
  const handleMouseDown = () => {
    // User is using a mouse, remove keyboard-focused styles
    document.body.classList.remove('keyboard-user');
    
    // But keep listening for Tab key again
    window.addEventListener('keydown', handleFirstTab);
  };
  
  // Set up the initial listener
  window.addEventListener('keydown', handleFirstTab);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handleFirstTab);
    window.removeEventListener('mousedown', handleMouseDown);
  };
};

/**
 * Creates a trap focus within a specified element
 * @param containerId The ID of the container element
 * @returns A function to remove the focus trap
 */
export const createFocusTrap = (containerId: string) => {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.warn(`Focus trap container with id '${containerId}' not found.`);
    return () => {};
  }
  
  // Get all focusable elements
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) {
    return () => {};
  }
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      // Shift + Tab on first element focuses last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab on last element focuses first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  // Add event listener
  container.addEventListener('keydown', handleKeyDown);
  
  // Focus the first element
  firstElement.focus();
  
  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};
