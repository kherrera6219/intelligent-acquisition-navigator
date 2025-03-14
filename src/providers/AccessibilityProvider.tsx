
import React, { createContext, useContext, useState, useEffect } from 'react';
import { announceToScreenReader } from '@/utils/a11y';

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: number;
  dyslexiaMode: boolean;
  reducedMotion: boolean;
  toggleHighContrast: () => void;
  toggleDyslexiaMode: () => void;
  toggleReducedMotion: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  announceToUser: (message: string, assertive?: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for user OS preferences on initial load
  useEffect(() => {
    // Check for high contrast preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
    if (prefersHighContrast) {
      setHighContrast(true);
    }
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setReducedMotion(true);
    }
  }, []);

  // Apply accessibility settings when they change
  useEffect(() => {
    // Apply high contrast
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Apply reduced motion
    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
    
    // Apply dyslexia-friendly mode
    if (dyslexiaMode) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }
  }, [highContrast, reducedMotion, dyslexiaMode]);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
    announceToScreenReader(`High contrast mode ${!highContrast ? 'enabled' : 'disabled'}`);
  };
  
  const toggleDyslexiaMode = () => {
    setDyslexiaMode(prev => !prev);
    announceToScreenReader(`Dyslexia friendly mode ${!dyslexiaMode ? 'enabled' : 'disabled'}`);
  };
  
  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
    announceToScreenReader(`Reduced motion ${!reducedMotion ? 'enabled' : 'disabled'}`);
  };
  
  const increaseFontSize = () => {
    setFontSize(prev => {
      const newSize = Math.min(prev + 2, 24);
      announceToScreenReader(`Font size increased to ${newSize} pixels`);
      return newSize;
    });
  };
  
  const decreaseFontSize = () => {
    setFontSize(prev => {
      const newSize = Math.max(prev - 2, 12);
      announceToScreenReader(`Font size decreased to ${newSize} pixels`);
      return newSize;
    });
  };
  
  const announceToUser = (message: string, assertive: boolean = false) => {
    announceToScreenReader(message, assertive ? 'assertive' : 'polite');
  };

  return (
    <AccessibilityContext.Provider 
      value={{ 
        highContrast, 
        fontSize,
        dyslexiaMode,
        reducedMotion,
        toggleHighContrast,
        toggleDyslexiaMode,
        toggleReducedMotion,
        increaseFontSize, 
        decreaseFontSize,
        announceToUser
      }}
    >
      <div 
        className={cn(
          highContrast && 'high-contrast',
          dyslexiaMode && 'dyslexia-mode',
          reducedMotion && 'reduced-motion'
        )}
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// Add missing cn helper function import
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
