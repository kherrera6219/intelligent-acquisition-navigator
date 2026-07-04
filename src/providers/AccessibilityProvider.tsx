
import React, { createContext, useContext, useState } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: number;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

  return (
    <AccessibilityContext.Provider 
      value={{ 
        highContrast, 
        fontSize, 
        toggleHighContrast, 
        increaseFontSize, 
        decreaseFontSize 
      }}
    >
      <div 
        className={`${highContrast ? 'high-contrast' : ''}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
