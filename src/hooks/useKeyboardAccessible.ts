
import { useEffect, useState } from 'react';
import { isKeyboardUser } from '@/utils/keyboardNavigationDetector';

/**
 * A hook that helps components detect if the user is navigating via keyboard
 * This can be used to conditionally apply focus styles
 */
export function useKeyboardAccessible() {
  const [isKeyboard, setIsKeyboard] = useState(false);
  
  useEffect(() => {
    // Set initial state
    setIsKeyboard(isKeyboardUser());
    
    // Set up a MutationObserver to watch for class changes on the body element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsKeyboard(isKeyboardUser());
        }
      });
    });
    
    // Start observing
    if (typeof document !== 'undefined') {
      observer.observe(document.body, { attributes: true });
    }
    
    // Clean up observer
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return isKeyboard;
}

export default useKeyboardAccessible;
