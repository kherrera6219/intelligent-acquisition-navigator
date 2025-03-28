
import React from 'react';
import { Bell, Search, HelpCircle, Settings, User } from 'lucide-react';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

interface ProcurityIQHeaderProps {
  pageTitle: string;
}

export const ProcurityIQHeader: React.FC<ProcurityIQHeaderProps> = ({ pageTitle }) => {
  return (
    <header className="ms-fluent-header sticky top-0 z-40 w-full bg-background/60 backdrop-blur-lg border-b border-border/40">
      <div className="ms-container ms-flex justify-between h-16">
        <div className="ms-flex gap-4">
          <div className="ms-logo flex items-center">
            <MsGradientText className="text-lg font-semibold" gradient="primary">
              ProcurityIQ
            </MsGradientText>
          </div>
          <div className="ms-v-divider hidden md:block" />
          <h2 className="ms-heading-5 hidden md:flex items-center">{pageTitle}</h2>
        </div>
        
        <div className="ms-flex-responsive">
          <div className="ms-search-container relative max-w-md w-full">
            <div className="ms-input-with-icon ms-flex w-full max-w-sm items-center">
              <Search className="ms-input-icon" size={18} />
              <input 
                type="text" 
                className="ms-input" 
                placeholder="Search..." 
                aria-label="Search"
              />
            </div>
          </div>
          
          <div className="ms-h-stack">
            <button className="ms-icon-button" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <button className="ms-icon-button" aria-label="Help">
              <HelpCircle size={20} />
            </button>
            <button className="ms-icon-button" aria-label="Settings">
              <Settings size={20} />
            </button>
            <button className="ms-user-profile ms-flex gap-2 items-center ms-text-sm px-2 py-1 rounded-full hover:bg-accent/10">
              <div className="ms-avatar ms-avatar-sm">
                <User size={18} />
              </div>
              <span className="ms-user-name">Olivia</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
