
import React from 'react';
import { Helmet } from 'react-helmet';
import { Header } from './Header';
import { ExternalFooter } from './ExternalFooter';
import { SkipLinks } from '../ui/universal/SkipLinks';

interface ExternalPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  noIndex?: boolean;
}

export const ExternalPageLayout: React.FC<ExternalPageLayoutProps> = ({
  children,
  title,
  description,
  showHeader = true,
  showFooter = true,
  noIndex = false
}) => {
  const pageTitle = title ? `${title} | ProcurityIQ` : 'ProcurityIQ';
  
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gray-900">
        <SkipLinks />
        
        {showHeader && <Header />}
        
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          {children}
        </main>
        
        {showFooter && <ExternalFooter />}
      </div>
    </>
  );
};
