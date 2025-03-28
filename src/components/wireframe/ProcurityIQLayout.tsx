
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
    <div className="ms-layout-container">
      <ProcurityIQHeader pageTitle={pageTitle} />
      
      <div className="ms-grid-sidebar">
        <ProcurityIQSidebar currentSection={currentSection} />
        
        <main className="ms-container ms-section">
          <div className="ms-page-header">
            <h1 className="ms-heading-2">{pageTitle}</h1>
            {pageDescription && (
              <p className="ms-text-muted ms-text-lg">{pageDescription}</p>
            )}
          </div>
          
          <div className="ms-card ms-card-padding mt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
