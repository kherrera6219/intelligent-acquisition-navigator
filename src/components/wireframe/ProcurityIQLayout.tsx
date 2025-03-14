
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
    <div className="procurity-app-layout">
      <ProcurityIQHeader pageTitle={pageTitle} />
      
      <div className="procurity-main-container">
        <ProcurityIQSidebar currentSection={currentSection} />
        
        <main className="procurity-main-content">
          <div className="procurity-page-header">
            <h1 className="procurity-page-title">{pageTitle}</h1>
            {pageDescription && (
              <p className="procurity-page-description">{pageDescription}</p>
            )}
          </div>
          
          <div className="procurity-page-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
