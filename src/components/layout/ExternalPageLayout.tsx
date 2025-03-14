
import React from 'react';
import { ExternalFooter } from './ExternalFooter';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useThemeTransition } from '@/hooks/use-theme-transition';

interface ExternalPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const ExternalPageLayout: React.FC<ExternalPageLayoutProps> = ({ 
  children,
  title,
  description,
  showHeader = true,
  showFooter = true
}) => {
  // Apply theme transitions
  useThemeTransition();
  
  // Set document title and meta description if provided
  React.useEffect(() => {
    if (title) {
      document.title = `${title} | Acquisition Knowledge Framework`;
    }
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
        {showHeader && (
          <header>
            {/* Header content can be added here */}
          </header>
        )}
        
        <main className="flex-grow">
          {children}
        </main>
        
        {showFooter && <ExternalFooter />}
      </div>
    </ThemeProvider>
  );
};
