
import React from "react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/universal/Container";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Container className="py-8">
        <Card className="w-full bg-black/40 backdrop-blur-sm border-white/5 p-6">
          {children}
        </Card>
      </Container>
    </div>
  );
};
