
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
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
      
      <AnimatePresence mode="wait">
        <motion.main 
          id="main-content" 
          className={cn(
            "transition-all duration-300",
            !isAuthPage && !isHomePage && "ml-64 p-8",
            isAuthPage && "flex items-center justify-center min-h-screen"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <ScrollArea className="h-full w-full">
            {children}
          </ScrollArea>
        </motion.main>
      </AnimatePresence>
    </div>
  );
};
