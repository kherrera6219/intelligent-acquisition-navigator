
import React from 'react';
import { cn } from '@/lib/utils';

interface SkipLinksProps {
  className?: string;
}

export const SkipLinks: React.FC<SkipLinksProps> = ({ className }) => {
  return (
    <div className={cn("skip-links", className)} role="navigation" aria-label="Skip links">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-link">
        Skip to navigation
      </a>
      <a href="#footer" className="skip-link">
        Skip to footer
      </a>
    </div>
  );
};
