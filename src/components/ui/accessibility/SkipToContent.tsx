
import React from 'react';

interface SkipToContentProps {
  targetId: string;
  label?: string;
}

export const SkipToContent: React.FC<SkipToContentProps> = ({ 
  targetId, 
  label = "Skip to main content" 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.tabIndex = -1;
      target.focus();
      // Reset tabIndex after a delay to not interfere with natural tab order
      setTimeout(() => {
        target.removeAttribute('tabIndex');
      }, 100);
    }
  };

  return (
    <a 
      href={`#${targetId}`}
      onClick={handleClick}
      className="skip-link"
      data-testid="skip-to-content"
    >
      {label}
    </a>
  );
};

export default SkipToContent;
