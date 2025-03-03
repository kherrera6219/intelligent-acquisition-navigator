
import React, { Suspense } from 'react';
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingOverlay } from "@/components/ui/universal/LoadingOverlay";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { NetworkStatusBanner } from "@/components/ui/universal/NetworkStatusBanner";
import { VerificationBanner } from "@/components/auth/VerificationBanner";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <PageErrorBoundary>
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-gray-900 to-black overflow-x-hidden">
          {/* Accessible Skip Link */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Skip to main content
          </a>

          <Header />
          <VerificationBanner />
          
          <main 
            id="main-content" 
            role="main" 
            className="flex-1 w-full"
          >
            <Container size="full" className="h-full py-4 sm:py-6 md:py-8">
              <Card 
                className="w-full h-full min-h-[calc(100vh-theme(spacing.32))] bg-black/40 backdrop-blur-sm border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl focus-within:shadow-2xl rounded-lg overflow-hidden"
                noShadow
              >
                <div className="animate-fade-in divide-y divide-white/10 h-full">
                  <Suspense fallback={<LoadingOverlay />}>
                    {children}
                  </Suspense>
                </div>
              </Card>
            </Container>
          </main>

          <Footer />
          <NetworkStatusBanner />
        </div>
      </PageErrorBoundary>
    </ThemeProvider>
  );
};
