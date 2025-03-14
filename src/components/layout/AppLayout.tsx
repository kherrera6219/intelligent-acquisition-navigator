
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';
import { NavigationSidebar } from './NavigationSidebar';
import { SkipLinks } from '@/components/ui/universal/SkipLinks';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showSidebar = true 
}) => {
  return (
    <div className="ms-app-layout min-h-screen">
      <SkipLinks />
      <Header />
      
      {showSidebar && (
        <aside className="ms-app-sidebar" id="navigation">
          <NavigationSidebar />
        </aside>
      )}
      
      <main className="ms-app-main" id="main-content" tabIndex={-1}>
        <NetworkStatusBanner />
        <div className="ms-container py-6">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
