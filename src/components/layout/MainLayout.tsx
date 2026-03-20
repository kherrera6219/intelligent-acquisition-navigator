
import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/login', '/signup', '/reset-password', '/profile'].includes(location.pathname);
  const showNav = !isAuthPage && !isHomePage;

  // Close mobile nav on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        {/* Command palette — available app-wide */}
        <CommandPalette open={isCommandOpen} onOpenChange={setIsCommandOpen} />

        {showNav && (
          <>
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
              <Navigation
                onClose={() => setIsMobileNavOpen(false)}
                onOpenCommand={() => setIsCommandOpen(true)}
              />
            </div>

            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 bg-gray-900/95 backdrop-blur-sm border-b border-white/10 px-4 h-14">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Open navigation menu"
                className="text-gray-400 hover:text-white"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <span className="text-lg font-bold text-white flex-1">ProcurityIQ</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCommandOpen(true)}
                className="text-gray-400 hover:text-white gap-2 text-xs"
                aria-label="Open command palette"
              >
                <Search className="h-4 w-4" />
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </Button>
            </div>

            {/* Mobile nav overlay */}
            {isMobileNavOpen && (
              <div
                className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsMobileNavOpen(false)}
                aria-hidden="true"
              />
            )}

            {/* Mobile nav drawer */}
            <div
              className={cn(
                'lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 transition-transform duration-300 ease-in-out',
                isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
              )}
            >
              <div className="absolute top-3 right-3 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileNavOpen(false)}
                  aria-label="Close navigation menu"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <Navigation
                onClose={() => setIsMobileNavOpen(false)}
                onOpenCommand={() => { setIsMobileNavOpen(false); setIsCommandOpen(true); }}
              />
            </div>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            id="main-content"
            className={cn(
              'transition-all duration-300',
              showNav && 'lg:ml-64 lg:p-8 pt-14 lg:pt-0 p-4',
              isAuthPage && 'flex items-center justify-center min-h-screen'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ScrollArea className="h-full w-full">
              {children}
            </ScrollArea>
          </motion.main>
        </AnimatePresence>
      </div>
  );
};

export default MainLayout;
