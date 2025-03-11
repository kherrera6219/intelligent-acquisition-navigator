import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NetworkStatusBanner } from '../ui/universal/NetworkStatusBanner';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { NetworkErrorBoundary } from '../ui/universal/NetworkErrorBoundary';
import { CookieConsent } from '../CookieConsent';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { PrivacyBanner } from '../landing/PrivacyBanner';
import { EnhancedNetworkBanner } from '../ui/universal/EnhancedNetworkBanner';

interface MainLayoutProps extends PropsWithChildren {
  variant?: 'default' | 'fluent' | 'minimal';
  showFooter?: boolean;
  showHeader?: boolean;
  showNetworkStatus?: boolean;
  showPrivacyBanner?: boolean;
  showCookieConsent?: boolean;
}

const headerRoutes = [
  '/',
  '/features',
  '/pricing',
  '/contact',
  '/about',
  '/help',
  '/privacy',
  '/terms',
  '/chat',
  '/analytics',
  '/dashboard',
  '/proposals',
  '/settings',
  '/profile',
  '/knowledge-base',
  '/federal-knowledge-base',
  '/texas-acquisition',
  '/improve',
];

const homeRoutes = ['/', '/home'];

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  variant = 'default',
  showFooter = true,
  showHeader = true,
  showNetworkStatus = true,
  showPrivacyBanner = true,
  showCookieConsent = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Install keyboard shortcuts
  useKeyboardShortcuts();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const headerVariant = isScrolled ? 'compact' : 'default';
  
  const isHomePage = homeRoutes.includes(location.pathname);
  
  const isHeaderRoute = headerRoutes.includes(location.pathname);
  
  const shouldShowHeader = showHeader && (isHeaderRoute || isHomePage);
  
  const contentClassNames = {
    default: 'container mx-auto py-12 px-4 sm:px-6 lg:px-8',
    fluent: 'container mx-auto py-12 px-4 sm:px-6 lg:px-8',
    minimal: 'container mx-auto py-12 px-4 sm:px-6 lg:px-8',
  };
  
  const containerClasses = {
    default: 'min-h-screen flex flex-col bg-background',
    fluent: 'min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90',
    minimal: 'min-h-screen flex flex-col bg-background',
  };
  
  return (
    <div className={containerClasses[variant]}>
      <NetworkErrorBoundary>
        {shouldShowHeader && (
          <Header
            variant={headerVariant}
            isScrolled={isScrolled}
            isHomePage={isHomePage}
          />
        )}
        
        {showNetworkStatus && <EnhancedNetworkBanner />}
        
        {showPrivacyBanner && <PrivacyBanner />}
        
        <main className={cn("flex-grow", contentClassNames)}>
          {children}
        </main>
        
        {showFooter && <Footer />}
        
        {showCookieConsent && <CookieConsent />}
      </NetworkErrorBoundary>
    </div>
  );
};

export default MainLayout;
