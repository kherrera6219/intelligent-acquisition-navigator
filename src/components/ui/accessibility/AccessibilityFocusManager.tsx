
import React, { useEffect } from 'react';
import { useKeyboardAccessibility } from '@/hooks/useKeyboardAccessibility';

/**
 * A component that manages accessibility focus states
 * for the application. It tracks keyboard navigation and
 * adds appropriate classes to improve focus visibility.
 */
export const AccessibilityFocusManager: React.FC = () => {
  const isKeyboardUser = useKeyboardAccessibility();

  // Add aria-live region for important announcements
  useEffect(() => {
    // Create aria-live regions for screen readers if they don't exist
    if (!document.getElementById('aria-live-polite')) {
      const politeAnnouncer = document.createElement('div');
      politeAnnouncer.id = 'aria-live-polite';
      politeAnnouncer.className = 'sr-only';
      politeAnnouncer.setAttribute('aria-live', 'polite');
      politeAnnouncer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(politeAnnouncer);
    }

    if (!document.getElementById('aria-live-assertive')) {
      const assertiveAnnouncer = document.createElement('div');
      assertiveAnnouncer.id = 'aria-live-assertive';
      assertiveAnnouncer.className = 'sr-only';
      assertiveAnnouncer.setAttribute('aria-live', 'assertive');
      assertiveAnnouncer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(assertiveAnnouncer);
    }

    return () => {
      // Clean up on unmount
      const politeAnnouncer = document.getElementById('aria-live-polite');
      const assertiveAnnouncer = document.getElementById('aria-live-assertive');
      
      if (politeAnnouncer) document.body.removeChild(politeAnnouncer);
      if (assertiveAnnouncer) document.body.removeChild(assertiveAnnouncer);
    };
  }, []);

  return null; // This component doesn't render anything
};
