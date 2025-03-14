
import React from 'react';
import { ExternalFooter } from './ExternalFooter';
import { Header } from './Header';
import { Helmet } from 'react-helmet';

type ExternalPageLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export const ExternalPageLayout: React.FC<ExternalPageLayoutProps> = ({
  children,
  title,
  description = 'Acquisition Knowledge Framework helps improve federal acquisition workflows.',
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Helmet>
        <title>{title} | AKF</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <ExternalFooter />
    </div>
  );
};
