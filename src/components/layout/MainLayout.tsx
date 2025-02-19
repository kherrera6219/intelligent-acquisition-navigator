
import React from "react";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      
      <main className="flex-1">
        <Container className="py-8">
          <Card className="w-full bg-black/40 backdrop-blur-sm border-white/10 p-6 shadow-xl">
            {children}
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
};
