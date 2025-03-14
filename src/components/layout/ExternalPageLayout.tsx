
import React from 'react';
import { ExternalFooter } from './ExternalFooter';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useThemeTransition } from '@/hooks/use-theme-transition';

interface ExternalPageLayoutProps {
  children: React.ReactNode;
}

export const ExternalPageLayout: React.FC<ExternalPageLayoutProps> = ({ children }) => {
  // Apply theme transitions
  useThemeTransition();
  
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
        <main className="flex-grow">
          {children}
        </main>
        <ExternalFooter />
      </div>
    </ThemeProvider>
  );
};
