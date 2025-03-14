
import React from 'react';
import { Link } from 'react-router-dom';

export const SkipLinks: React.FC = () => {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <a href="#navigation" className="skip-link">Skip to navigation</a>
    </div>
  );
};
