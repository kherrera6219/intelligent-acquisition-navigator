
/**
 * Accessibility utility functions for enhancing web applications
 */

/**
 * Announces a message to screen readers using ARIA live regions
 * @param message The message to announce
 * @param priority The priority level ('polite' or 'assertive')
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  // Create a live region if it doesn't exist
  let liveRegion = document.getElementById(`aria-live-${priority}`);
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = `aria-live-${priority}`;
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.setAttribute('role', 'status');
    liveRegion.style.position = 'absolute';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.margin = '-1px';
    liveRegion.style.padding = '0';
    liveRegion.style.overflow = 'hidden';
    liveRegion.style.clip = 'rect(0, 0, 0, 0)';
    liveRegion.style.whiteSpace = 'nowrap';
    liveRegion.style.border = '0';
    document.body.appendChild(liveRegion);
  }

  // Update the live region text to trigger announcement
  liveRegion.textContent = '';
  
  // Use setTimeout to ensure the DOM update is processed
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 50);
}

/**
 * Trap focus within a specified element (for modals, dialogs, etc.)
 * @param containerElement The element to trap focus within
 * @returns A function to remove the focus trap
 */
export function trapFocus(containerElement: HTMLElement): () => void {
  const focusableElements = containerElement.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  // Focus the first element
  firstElement?.focus();
  
  const handleTabKey = (e: KeyboardEvent) => {
    // Handle Tab and Shift+Tab navigation
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
    
    // Handle Escape key
    if (e.key === 'Escape') {
      removeFocusTrap();
    }
  };
  
  // Add event listener
  containerElement.addEventListener('keydown', handleTabKey);
  
  // Return cleanup function
  const removeFocusTrap = () => {
    containerElement.removeEventListener('keydown', handleTabKey);
  };
  
  return removeFocusTrap;
}

/**
 * Creates an accessible keyboard shortcut
 * @param key The key to listen for (e.g., 'Escape', 'Enter')
 * @param callback The function to execute when the key is pressed
 * @param options Additional options like modifier keys
 * @returns A function to remove the event listener
 */
export function createKeyboardShortcut(
  key: string,
  callback: () => void,
  options: { ctrl?: boolean; shift?: boolean; alt?: boolean; meta?: boolean } = {}
): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    const { ctrl = false, shift = false, alt = false, meta = false } = options;
    
    if (
      e.key === key &&
      e.ctrlKey === ctrl &&
      e.shiftKey === shift &&
      e.altKey === alt &&
      e.metaKey === meta
    ) {
      e.preventDefault();
      callback();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Enhances an element with proper ARIA attributes
 * @param element The HTML element to enhance
 * @param options ARIA attributes to add
 */
export function enhanceWithARIA(
  element: HTMLElement,
  options: {
    role?: string;
    label?: string;
    description?: string;
    expanded?: boolean;
    hidden?: boolean;
    selected?: boolean;
    checked?: boolean;
    level?: number;
  }
): void {
  const {
    role,
    label,
    description,
    expanded,
    hidden,
    selected,
    checked,
    level
  } = options;
  
  if (role) element.setAttribute('role', role);
  if (label) element.setAttribute('aria-label', label);
  if (description) element.setAttribute('aria-describedby', description);
  if (expanded !== undefined) element.setAttribute('aria-expanded', expanded.toString());
  if (hidden !== undefined) element.setAttribute('aria-hidden', hidden.toString());
  if (selected !== undefined) element.setAttribute('aria-selected', selected.toString());
  if (checked !== undefined) element.setAttribute('aria-checked', checked.toString());
  if (level) element.setAttribute('aria-level', level.toString());
}

/**
 * Generate a unique ID for ARIA labeling
 * @param prefix An optional prefix for the ID
 * @returns A unique ID string
 */
export function generateAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Detect if a user is using a screen reader
 * Note: This is not 100% reliable but can provide a hint
 * @returns A promise that resolves to a boolean indicating if a screen reader might be in use
 */
export async function detectScreenReader(): Promise<boolean> {
  // Check if the user has any accessibility features enabled
  const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for common screen reader detection elements
  const axsAttributes = document.querySelectorAll('[aria-label], [role]').length > 0;
  
  // Many screen readers set this flag
  const hasAXSObject = 'accessibility' in window || 'accessibilityDisplay' in document;
  
  return hasReducedMotion || axsAttributes || hasAXSObject;
}
