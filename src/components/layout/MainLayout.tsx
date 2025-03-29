
import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { UniversalExternalFooter } from './UniversalExternalFooter';
import { InternalFooter } from './InternalFooter';
import { NetworkStatusMonitor } from '../ui/universal/NetworkStatusMonitor';
import { PrivacyBanner } from '../ui/universal/PrivacyBanner';
import NetworkErrorBoundary from '../ui/universal/NetworkErrorBoundary';
import CookieConsent from '../CookieConsent';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { SkipLinks } from '../ui/universal/SkipLinks';
import { useNetworkMonitor } from '../ui/universal/NetworkMonitorProvider';
import { BreakpointDebugger } from '../ui/universal/BreakpointDebugger';

interface MainLayoutProps extends PropsWithChildren {
  variant?: 'default' | 'fluent' | 'minimal' | 'modern';
  showFooter?: boolean;
  showHeader?: boolean;
  showNetworkStatus?: boolean;
  showPrivacyBanner?: boolean;
  showCookieConsent?: boolean;
  className?: string;
  containerSize?: string;
  forceExternalHeader?: boolean;
  forceExternalFooter?: boolean;
  showBreakpointDebugger?: boolean;
}

export interface PrivacyBannerProps {
  onLearnMore: () => void;
  onClose: () => void;
}

// Define which routes should have which header and footer
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
  '/contract-management',
  '/activity'
];

const homeRoutes = ['/', '/home'];

const externalRoutes = ['/', '/about', '/features', '/pricing', '/contact', '/help', '/privacy', '/terms', '/sitemap'];

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
  showBreakpointDebugger = process.env.NODE_ENV === 'development',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isOnline, isReconnecting, supabaseConnected } = useNetworkMonitor();
  
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
    modern: 'container mx-auto py-6 px-4 sm:px-6 lg:px-8'
  };
  
  const containerClasses = {
    default: 'min-h-screen flex flex-col bg-background',
    fluent: 'min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90',
    minimal: 'min-h-screen flex flex-col bg-background',
    modern: 'min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800'
  };
  
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(showPrivacyBanner);
  
  const handleLearnMore = () => {
    console.log('Learn more about privacy');
  };
  
  const handleClosePrivacy = () => {
    setShowPrivacyNotice(false);
  };
  
  // Only show cookie consent on the homepage (/)
  const shouldShowCookieConsent = showCookieConsent && isHomePage;
  
  const isExternalRoute = externalRoutes.includes(location.pathname);
  
  // Network status components
  const showNetworkBanner = showNetworkStatus && (!isOnline || !supabaseConnected || isReconnecting);
  
  return (
    <div className={cn(containerClasses[variant], className)}>
      <NetworkErrorBoundary>
        <SkipLinks />
        
        {shouldShowHeader && (
          <Header variant={variant === 'modern' ? 'glass' : headerVariant} />
        )}
        
        {showNetworkBanner && (
          <NetworkStatusMonitor />
        )}
        
        {showPrivacyNotice && (
          <PrivacyBanner 
            onLearnMore={handleLearnMore}
            onClose={handleClosePrivacy}
          />
        )}
        
        <main id="main-content" className={cn("flex-grow", contentClassNames[variant])} tabIndex={-1}>
          {children}
        </main>
        
        {showFooter && (
          forceExternalFooter ? <UniversalExternalFooter /> : (isExternalRoute ? <UniversalExternalFooter /> : <InternalFooter />)
        )}
        
        {shouldShowCookieConsent && <CookieConsent />}
        
        {showBreakpointDebugger && <BreakpointDebugger />}
      </NetworkErrorBoundary>
    </div>
  );
};

export default MainLayout;
