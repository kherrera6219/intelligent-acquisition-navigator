
import React from 'react';
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black">
        {/* Accessible Skip Link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-black focus:text-white">
          Skip to main content
        </a>

        <Header />
        
        <main id="main-content" role="main" className="flex-1">
          <Container className="py-8">
            <Card className="w-full bg-black/40 backdrop-blur-sm border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl focus-within:shadow-2xl">
              {children}
            </Card>
          </Container>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};
