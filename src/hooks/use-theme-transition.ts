
import { useEffect } from 'react';

export function useThemeTransition() {
  useEffect(() => {
    // Add transitioning class when theme is about to change
    const handleThemeChange = () => {
      document.documentElement.classList.add('transitioning');
      
      // Remove class after transition completes to avoid affecting other interactions
      setTimeout(() => {
        document.documentElement.classList.remove('transitioning');
      }, 300); // Match this with the transition duration in CSS
    };

    // Listen for theme changes via storage events (when theme changes in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        handleThemeChange();
      }
    };

    // Initialize by importing the theme transitions CSS
    import('../styles/modules/theme-transitions.css');

    // Set up event listeners
    window.addEventListener('storage', handleStorageChange);
    
    // Create a mutation observer to detect when the 'dark' class is added/removed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' &&
          (mutation.target as Element).classList.contains('dark') !== 
          (mutation.oldValue || '').includes('dark')
        ) {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, { 
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class']
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);
}
