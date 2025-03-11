
import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ExternalFooter } from './ExternalFooter';
import { InternalFooter } from './InternalFooter';
import { NetworkStatusBanner } from '../ui/universal/NetworkStatusBanner';
import { EnhancedNetworkBanner } from '../ui/universal/EnhancedNetworkBanner';
import { PrivacyBanner } from '../ui/universal/PrivacyBanner';
import NetworkErrorBoundary from '../ui/universal/NetworkErrorBoundary';
import CookieConsent from '../CookieConsent';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps extends PropsWithChildren {
  variant?: 'default' | 'fluent' | 'minimal';
  showFooter?: boolean;
  showHeader?: boolean;
  showNetworkStatus?: boolean;
  showPrivacyBanner?: boolean;
  showCookieConsent?: boolean;
  className?: string;
  containerSize?: string;
  forceExternalHeader?: boolean;
  forceExternalFooter?: boolean;
}

export interface EnhancedNetworkBannerProps {
  isOnline: boolean;
}

export interface PrivacyBannerProps {
  onLearnMore: () => void;
  onClose: () => void;
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
  '/federal-acquisition',
  '/solicitation-review',
  '/document-control',
  '/market-research',
  '/compliance',
  '/legal-review',
  '/small-business',
  '/quality-assurance',
  '/source-selection',
  '/contract-management'
];

const homeRoutes = ['/', '/home'];

const externalRoutes = ['/', '/about', '/features', '/pricing', '/contact', '/help', '/privacy', '/terms'];

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  variant = 'default',
  showFooter = true,
  showHeader = true,
  showNetworkStatus = true,
  showPrivacyBanner = true,
  showCookieConsent = true,
  className = '',
  containerSize,
  forceExternalHeader,
  forceExternalFooter,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isExternalRoute = externalRoutes.includes(location.pathname);
  
  useKeyboardShortcuts();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const headerVariant = isScrolled ? 'compact' : 'default';
  
  const isHomePage = homeRoutes.includes(location.pathname);
  
  const isHeaderRoute = headerRoutes.includes(location.pathname);
  
  const shouldShowHeader = showHeader && (isHeaderRoute || isHomePage);
  
  const contentClassNames = {
    default: 'container mx-auto py-8 px-4 sm:px-6 lg:px-8',
    fluent: 'container mx-auto py-8 px-4 sm:px-6 lg:px-8',
    minimal: 'container mx-auto py-6 px-4 sm:px-6 lg:px-8',
  };
  
  const containerClasses = {
    default: 'min-h-screen flex flex-col bg-background',
    fluent: 'min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90',
    minimal: 'min-h-screen flex flex-col bg-background',
  };
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(showPrivacyBanner);
  
  const handleLearnMore = () => {
    console.log('Learn more about privacy');
  };
  
  const handleClosePrivacy = () => {
    setShowPrivacyNotice(false);
  };
  
  // Only show cookie consent on the homepage (/)
  const shouldShowCookieConsent = showCookieConsent && isHomePage;
  
  return (
    <div className={cn(containerClasses[variant], className)}>
      <NetworkErrorBoundary>
        {shouldShowHeader && !forceExternalHeader && (
          <Header />
        )}
        
        {showNetworkStatus && (
          <EnhancedNetworkBanner isOnline={isOnline} />
        )}
        
        {showPrivacyNotice && (
          <PrivacyBanner 
            onLearnMore={handleLearnMore}
            onClose={handleClosePrivacy}
          />
        )}
        
        <main className={cn("flex-grow", contentClassNames[variant])}>
          {children}
        </main>
        
        {showFooter && (
          forceExternalFooter ? <ExternalFooter /> : (isExternalRoute ? <ExternalFooter /> : <InternalFooter />)
        )}
        
        {shouldShowCookieConsent && <CookieConsent />}
      </NetworkErrorBoundary>
    </div>
  );
};

export default MainLayout;
