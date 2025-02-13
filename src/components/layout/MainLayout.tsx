
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Navigation />
      
      <main 
        id="main-content" 
        className={cn(
          "transition-all duration-300",
          !isHomePage && "ml-64 p-8"
        )}
      >
        {children}
      </main>
    </div>
  );
};
