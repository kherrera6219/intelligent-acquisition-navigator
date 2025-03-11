
import React, { Suspense } from 'react';
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Container } from "@/components/ui/universal/Container";
import { Header } from "./Header";
import UniversalInternalHeader from "./UniversalInternalHeader";
import { Footer } from "./Footer";
import { LoadingOverlay } from "@/components/ui/universal/LoadingOverlay";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { NetworkStatusBanner } from "@/components/ui/universal/NetworkStatusBanner";
import { VerificationBanner } from "@/components/auth/VerificationBanner";
import { useAuthState } from "@/hooks/useAuthState";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  containerSize = "full",
  className
}) => {
  const { isAuthenticated } = useAuthState();
  const { pathname } = useLocation();
  
  const isInternalPage = isAuthenticated && showHeader;
  const isDashboardPage = pathname === "/dashboard";
  
  // Special classes for specific pages
  const getPageSpecificClasses = () => {
    if (isDashboardPage) {
      return "dashboard-layout";
    }
    
    if (pathname.includes("acquisition")) {
      return "acquisition-layout";
    }
    
    return "";
  };

  // Determine background styles for internal pages
  const getBackgroundStyles = () => {
    if (isInternalPage) {
      return {
        backgroundImage: `
          linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
          radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
        `,
        backgroundAttachment: 'fixed',
        backgroundColor: 'var(--background)'
      };
    }
    
    return {
      backgroundImage: `
        linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
        radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
      `,
      backgroundAttachment: 'fixed'
    };
  };

  return (
    <ThemeProvider>
      <PageErrorBoundary>
        <div className={`min-h-screen w-full flex flex-col bg-background overflow-x-hidden ${getPageSpecificClasses()}`}>
          {/* Accessible Skip Link */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Skip to main content
          </a>

          {showHeader && (
            isInternalPage ? <UniversalInternalHeader /> : <Header />
          )}
          
          <VerificationBanner />
          
          <main 
            id="main-content" 
            role="main" 
            className={`flex-1 w-full py-3 sm:py-4 md:py-6 ${isInternalPage ? 'mt-16' : ''} ${className || ''} bg-noise`}
            tabIndex={-1}
            style={getBackgroundStyles()}
          >
            <div className="w-full h-full min-h-[calc(100vh-theme(spacing.40))] overflow-hidden animate-fade-in">
              <Suspense fallback={<LoadingOverlay />}>
                {children}
              </Suspense>
            </div>
          </main>

          {showFooter && <Footer />}
          <NetworkStatusBanner />
        </div>
      </PageErrorBoundary>
    </ThemeProvider>
  );
};
