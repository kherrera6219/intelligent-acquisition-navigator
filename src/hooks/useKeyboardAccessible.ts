
import { useState, useEffect } from 'react';
import { isKeyboardUser } from '@/utils/keyboardNavigationDetector';

/**
 * Hook to detect if the user is using keyboard navigation
 * @returns Boolean indicating if the user is using keyboard navigation
 */
export function useKeyboardAccessible(): boolean {
  const [isKeyboardAccessible, setIsKeyboardAccessible] = useState<boolean>(isKeyboardUser());

  useEffect(() => {
    const checkKeyboardNav = () => {
      setIsKeyboardAccessible(isKeyboardUser());
    };

    // Check whenever the body class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkKeyboardNav();
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    // Initial check
    checkKeyboardNav();

    return () => {
      observer.disconnect();
    };
  }, []);

  return isKeyboardAccessible;
}
