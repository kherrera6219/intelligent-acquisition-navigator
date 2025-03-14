
import React from 'react';
import { cn } from '@/lib/utils';
import { setAccessibleFocus, announceToScreenReader } from '@/utils/a11y';

interface SkipToContentProps {
  targetId: string;
  label?: string;
  className?: string;
}

export const SkipToContent: React.FC<SkipToContentProps> = ({ 
  targetId, 
  label = "Skip to main content",
  className
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Find the target element
    const target = document.getElementById(targetId);
    
    if (target) {
      // Focus on the target element
      setAccessibleFocus(targetId, `Skipped to ${label}`);
      
      // Announce to screen reader
      announceToScreenReader(`Navigated to ${label}`);
    }
  };

  return (
    <a 
      href={`#${targetId}`}
      onClick={handleClick}
      className={cn(
        "skip-link focus-visible:bg-primary focus-visible:text-primary-foreground",
        className
      )}
      aria-label={label}
      data-testid="skip-to-content"
    >
      {label}
    </a>
  );
};

export default SkipToContent;
