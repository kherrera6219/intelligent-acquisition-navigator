
import React from 'react';
import { Header } from './Header';
import { ExternalFooter } from './ExternalFooter';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      {children}
      <ExternalFooter />
    </div>
  );
};
