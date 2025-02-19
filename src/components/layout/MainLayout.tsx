
import { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { navigationItems } from '@/config/navigationItems';

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
      
      {!isAuthPage && !isHomePage && (
        <div className="fixed top-0 left-64 right-0 h-16 bg-background/80 backdrop-blur-sm border-b border-white/10 px-8 flex items-center justify-between z-50">
          <h1 className="text-xl font-semibold text-gradient">ProcurityIQ</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                Navigate <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-800/90 backdrop-blur-sm border-gray-700">
              {navigationItems.map((item) => (
                <DropdownMenuItem key={item.route} asChild className="text-gray-200 focus:bg-gray-700 focus:text-white">
                  <Link to={item.route} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.main 
          id="main-content" 
          className={cn(
            "transition-all duration-300",
            !isAuthPage && !isHomePage && "ml-64 p-8 pt-24",
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

export default MainLayout;
