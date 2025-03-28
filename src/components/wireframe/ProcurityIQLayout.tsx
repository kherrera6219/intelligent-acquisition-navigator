
import React, { ReactNode } from 'react';
import { Layout } from '@/app/layout/Layout';
import { ProcurityIQSidebar } from './ProcurityIQSidebar';
import { ProcurityIQHeader } from './ProcurityIQHeader';

interface ProcurityIQLayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
  currentSection?: string;
}

export const ProcurityIQLayout: React.FC<ProcurityIQLayoutProps> = ({
  children,
  pageTitle,
  pageDescription,
  currentSection
}) => {
  return (
    <div className="ms-layout-container min-h-screen flex flex-col bg-background">
      <ProcurityIQHeader pageTitle={pageTitle} />
      
      <div className="ms-grid-sidebar flex-grow">
        <ProcurityIQSidebar currentSection={currentSection} />
        
        <main className="ms-container px-4 sm:px-6 lg:px-8 py-6">
          <div className="ms-page-header mb-6">
            <h1 className="ms-heading-2 text-2xl font-semibold mb-2">{pageTitle}</h1>
            {pageDescription && (
              <p className="ms-text-muted ms-text-lg text-muted-foreground">{pageDescription}</p>
            )}
          </div>
          
          <div className="ms-card ms-card-padding mt-6 bg-card rounded-lg border border-border/40 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
