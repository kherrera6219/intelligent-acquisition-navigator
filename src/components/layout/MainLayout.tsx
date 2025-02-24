
import React from 'react';
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-black/5">
        <Header />
        
        <main className="flex-1">
          <Container className="py-8">
            <Card className="w-full bg-white shadow-xl">
              {children}
            </Card>
          </Container>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};
