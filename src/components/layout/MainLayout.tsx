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
import { PageLoader } from "@/components/ui/universal/PageLoader";

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  forceExternalHeader?: boolean; // Prop to force external header even when authenticated
  variant?: "default" | "fluent" | "minimal";
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  containerSize = "full",
  className,
  forceExternalHeader = false,
  variant = "default"
}) => {
  const { isAuthenticated } = useAuthState();
  const { pathname } = useLocation();
  
  // Use internal header for authenticated users, unless specifically forcing external header
  const useInternalHeader = isAuthenticated && !forceExternalHeader && showHeader;
  const isDashboardPage = pathname.includes("/dashboard") || pathname === "/ms-fluent-dashboard";
  const isAcquisitionPage = pathname.includes("acquisition") || 
                            pathname.includes("solicitation") || 
                            pathname.includes("compliance") ||
                            pathname.includes("market-research") ||
                            pathname.includes("document-control") ||
                            pathname.includes("source-selection") ||
                            pathname.includes("contract-management") ||
                            pathname.includes("legal-review") ||
                            pathname.includes("small-business") ||
                            pathname.includes("quality-assurance");
  
  // Special classes for specific pages
  const getPageSpecificClasses = () => {
    if (isDashboardPage) {
      return "ms-dashboard-layout";
    }
    
    if (isAcquisitionPage) {
      return "ms-acquisition-layout";
    }
    
    // Add more page-specific classes as needed
    if (pathname.includes("auth")) {
      return "ms-auth-layout";
    }
    
    if (pathname.includes("profile")) {
      return "ms-profile-layout";
    }
    
    return "";
  };

  // Determine background styles based on fluent design principles
  const getBackgroundStyles = () => {
    if (variant === "minimal") {
      return {};
    }
    
    return {
      backgroundImage: `
        linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%),
        radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 75%)
      `,
      backgroundAttachment: 'fixed',
      backgroundColor: 'var(--background)'
    };
  };

  return (
    <ThemeProvider>
      <PageErrorBoundary>
        <div className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden relative">
          {/* Accessible Skip Link */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Skip to main content
          </a>

          {showHeader && (
            useInternalHeader ? <UniversalInternalHeader /> : <Header />
          )}
          
          <VerificationBanner />
          
          <main 
            id="main-content" 
            role="main" 
            className={`flex-1 w-full pb-3 sm:pb-4 md:pb-6 ${useInternalHeader ? 'mt-16' : ''} ${getPageSpecificClasses()} ${className || ''} bg-noise ms-motion-fadeIn`}
            tabIndex={-1}
            style={{
              ...getBackgroundStyles(),
              minHeight: useInternalHeader ? 'calc(100vh - 4rem)' : 'min(100vh, 100%)',
            }}
          >
            <div className="w-full h-full min-h-full overflow-hidden">
              <Container size={containerSize} className={`h-full ${containerSize === "full" ? "px-0 sm:px-0 md:px-4 lg:px-8 xl:px-12 2xl:px-16" : ""}`}>
                <Suspense fallback={<PageLoader variant="ms-fluent" message="Loading content" />}>
                  {children}
                </Suspense>
              </Container>
            </div>
          </main>

          {showFooter && <Footer />}
          <NetworkStatusBanner />
        </div>
      </PageErrorBoundary>
    </ThemeProvider>
  );
};
