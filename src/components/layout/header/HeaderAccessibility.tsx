
import React from 'react';
import { AccessibilityMenu } from '@/components/ui/accessibility/AccessibilityMenu';
import { SkipToContent } from '@/components/ui/accessibility/SkipToContent';
import { useAccessibility } from '@/providers/AccessibilityProvider';

export const HeaderAccessibility: React.FC = () => {
  const { highContrast } = useAccessibility();

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Accessibility controls">
      <SkipToContent targetId="main-content" />
      <AccessibilityMenu className="ms-focus-outline" />
      
      {/* Screen reader announcement about high contrast mode */}
      {highContrast && (
        <span className="sr-only" aria-live="polite">
          High contrast mode is currently enabled
        </span>
      )}
    </div>
  );
};

export default HeaderAccessibility;
