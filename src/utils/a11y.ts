
/**
 * Accessibility utility functions for Microsoft Fluent design compliance
 */

/**
 * Announces a message to screen readers
 * @param message Message to announce
 * @param priority Priority of the announcement (polite or assertive)
 */
export const announceToScreenReader = (
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const element = document.getElementById(`aria-live-${priority}`);
  if (element) {
    // Clear and re-add content to trigger announcement
    element.textContent = '';
    setTimeout(() => {
      element.textContent = message;
    }, 50);
  }
};

/**
 * Sets focus to an element with appropriate announcements
 * @param elementId ID of the element to focus
 * @param announcement Optional message to announce when focus moves
 */
export const setAccessibleFocus = (
  elementId: string,
  announcement?: string
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    // Make the element focusable if it's not already
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '-1');
    }
    
    // Focus the element
    element.focus();
    
    // Announce the focus change if a message was provided
    if (announcement) {
      announceToScreenReader(announcement);
    }
    
    // Remove tabindex if we added it
    if (element.getAttribute('tabindex') === '-1') {
      setTimeout(() => {
        element.removeAttribute('tabindex');
      }, 100);
    }
  }
};

/**
 * Trap focus within a container (for modals, dialogs, etc.)
 * @param containerId ID of the container element
 * @returns Function to remove the focus trap
 */
export const trapFocus = (containerId: string): (() => void) => {
  const container = document.getElementById(containerId);
  if (!container) return () => {};
  
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  container.addEventListener('keydown', handleKeyDown);
  firstElement.focus();
  
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Enhances an element with proper ARIA attributes based on its state
 */
export const enhanceElementWithARIA = (
  element: HTMLElement,
  attributes: Record<string, string | boolean | number>
): void => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      element.setAttribute(`aria-${key}`, value.toString());
    } else if (value !== undefined && value !== null) {
      element.setAttribute(`aria-${key}`, value.toString());
    }
  });
};
