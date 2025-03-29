
import React, { useEffect } from 'react';

interface AccessibilityEnhancementsProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const AccessibilityEnhancements: React.FC<AccessibilityEnhancementsProps> = ({
  title,
  description,
  children
}) => {
  // Update document title for screen readers
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
  
  // Add aria-description meta tag
  useEffect(() => {
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [description]);
  
  return (
    <>
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded focus:outline-none"
      >
        Skip to main content
      </a>
      
      {/* Main content with proper landmarks */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
};
