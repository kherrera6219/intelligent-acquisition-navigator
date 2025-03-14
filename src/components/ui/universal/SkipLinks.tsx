
import React from 'react';
import { SkipToContent } from '@/components/ui/accessibility/SkipToContent';

export const SkipLinks: React.FC = () => {
  return (
    <div className="skip-links">
      <SkipToContent targetId="main-content" />
      <SkipToContent targetId="navigation" label="Skip to navigation" />
      <SkipToContent targetId="search" label="Skip to search" />
    </div>
  );
};
