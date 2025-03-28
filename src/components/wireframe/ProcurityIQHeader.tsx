
import React from 'react';
import { Bell, Search, HelpCircle, Settings, User, ChevronDown } from 'lucide-react';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

interface ProcurityIQHeaderProps {
  pageTitle: string;
}

export const ProcurityIQHeader: React.FC<ProcurityIQHeaderProps> = ({ pageTitle }) => {
  return (
    <header className="ms-fluent-header sticky top-0 z-40 w-full bg-background/60 backdrop-blur-lg border-b border-border/40 h-16">
      <div className="ms-container h-full">
        <div className="ms-flex justify-between h-full">
          <div className="ms-flex gap-4">
            <div className="ms-logo flex items-center">
              <MsGradientText className="text-lg font-semibold" gradient="primary">
                ProcurityIQ
              </MsGradientText>
            </div>
            <div className="ms-v-divider h-full flex items-center">
              <div className="h-8 border-r border-border/40 mx-2 hidden md:block"></div>
            </div>
            <h2 className="ms-heading-5 hidden md:flex items-center text-lg font-medium">{pageTitle}</h2>
          </div>
          
          <div className="ms-flex-responsive ms-flex gap-4">
            <div className="ms-search-container relative max-w-md w-full hidden md:block">
              <div className="ms-input-with-icon ms-flex w-full max-w-sm items-center relative">
                <Search className="ms-input-icon absolute left-3 text-muted-foreground" size={18} />
                <input 
                  type="text" 
                  className="ms-input pl-10 pr-4 py-2 w-full bg-muted/50 border border-border/40 rounded-md text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/70 transition-all" 
                  placeholder="Search..." 
                  aria-label="Search"
                />
              </div>
            </div>
            
            <div className="ms-h-stack ms-flex gap-2">
              <button className="ms-icon-button p-2 rounded-full hover:bg-accent/20 transition-colors" aria-label="Notifications">
                <Bell size={20} className="text-foreground/70" />
              </button>
              <button className="ms-icon-button p-2 rounded-full hover:bg-accent/20 transition-colors" aria-label="Help">
                <HelpCircle size={20} className="text-foreground/70" />
              </button>
              <button className="ms-icon-button p-2 rounded-full hover:bg-accent/20 transition-colors" aria-label="Settings">
                <Settings size={20} className="text-foreground/70" />
              </button>
              <button className="ms-user-profile ms-flex gap-2 items-center ms-text-sm px-3 py-1.5 rounded-full hover:bg-accent/20 transition-colors">
                <div className="ms-avatar ms-avatar-sm bg-primary/20 text-primary h-8 w-8 rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
                <span className="ms-user-name hidden sm:inline">Olivia</span>
                <ChevronDown size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
