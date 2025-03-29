
import React from 'react';
import { UniversalExternalFooter } from './UniversalExternalFooter';
import { UniversalExternalHeader } from './UniversalExternalHeader';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useThemeTransition } from '@/hooks/use-theme-transition';
import { cn } from '@/lib/utils';

interface ExternalPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  headerVariant?: 'default' | 'transparent' | 'solid';
  className?: string;
  contentClassName?: string;
}

export const ExternalPageLayout: React.FC<ExternalPageLayoutProps> = ({ 
  children,
  title,
  description,
  showHeader = true,
  showFooter = true,
  headerVariant = 'default',
  className,
  contentClassName
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
      <div className={cn(
        "min-h-screen flex flex-col bg-background text-foreground transition-colors",
        className
      )}>
        {showHeader && (
          <UniversalExternalHeader variant={headerVariant} />
        )}
        
        <main className={cn(
          "flex-grow pt-16", // Add padding to account for fixed header
          contentClassName
        )}>
          {children}
        </main>
        
        {showFooter && <UniversalExternalFooter />}
      </div>
    </ThemeProvider>
  );
};

export default ExternalPageLayout;
