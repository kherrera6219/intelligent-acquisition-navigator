
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
  const isAuthPage = ['/login', '/signup', '/reset-password'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {!isAuthPage && <Navigation />}
      
      <main 
        id="main-content" 
        className={cn(
          "transition-all duration-300",
          !isAuthPage && !isHomePage && "ml-64 p-8",
          isAuthPage && "flex items-center justify-center min-h-screen"
        )}
      >
        {children}
      </main>
    </div>
  );
};
