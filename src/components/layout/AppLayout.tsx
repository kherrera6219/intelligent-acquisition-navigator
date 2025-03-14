
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';
import { NavigationSidebar } from './NavigationSidebar';
import { SkipLinks } from '@/components/ui/universal/SkipLinks';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  isInternal?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showSidebar = true,
  isInternal = true
}) => {
  return (
    <div className="ms-app-layout min-h-screen flex flex-col">
      <SkipLinks />
      
      {isInternal ? <UniversalInternalHeader /> : <Header />}
      
      <div className="flex flex-1">
        {showSidebar && (
          <aside className="ms-app-sidebar hidden lg:block" id="navigation">
            <NavigationSidebar />
          </aside>
        )}
        
        <main className="ms-app-main flex-1" id="main-content" tabIndex={-1}>
          <NetworkStatusBanner />
          <div className="ms-container py-6">
            {children}
          </div>
        </main>
      </div>
      
      {isInternal ? <InternalFooter /> : <Footer />}
    </div>
  );
};
