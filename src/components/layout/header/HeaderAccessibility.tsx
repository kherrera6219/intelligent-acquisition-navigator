
import React from 'react';
import { AccessibilityMenu } from '@/components/ui/accessibility/AccessibilityMenu';
import { SkipToContent } from '@/components/ui/accessibility/SkipToContent';

export const HeaderAccessibility: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <SkipToContent targetId="main-content" />
      <AccessibilityMenu className="ms-focus-outline" />
    </div>
  );
};

export default HeaderAccessibility;
