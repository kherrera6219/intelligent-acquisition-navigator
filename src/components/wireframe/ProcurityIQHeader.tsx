
import React from 'react';
import { Bell, Search, HelpCircle, Settings, User } from 'lucide-react';

interface ProcurityIQHeaderProps {
  pageTitle: string;
}

export const ProcurityIQHeader: React.FC<ProcurityIQHeaderProps> = ({ pageTitle }) => {
  return (
    <header className="procurity-header">
      <div className="procurity-header-container">
        <div className="procurity-header-left">
          <div className="procurity-logo">
            <span className="procurity-logo-text">ProcurityIQ</span>
          </div>
          <h2 className="procurity-header-title">{pageTitle}</h2>
        </div>
        
        <div className="procurity-header-search">
          <div className="procurity-search-container">
            <Search className="procurity-search-icon" size={16} />
            <input 
              type="text" 
              className="procurity-search-input" 
              placeholder="Search..." 
              aria-label="Search"
            />
          </div>
        </div>
        
        <div className="procurity-header-actions">
          <button className="procurity-icon-button" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button className="procurity-icon-button" aria-label="Help">
            <HelpCircle size={18} />
          </button>
          <button className="procurity-icon-button" aria-label="Settings">
            <Settings size={18} />
          </button>
          <button className="procurity-user-button" aria-label="User profile">
            <div className="procurity-user-avatar">
              <User size={18} />
            </div>
            <span className="procurity-user-name">Olivia</span>
          </button>
        </div>
      </div>
    </header>
  );
};
