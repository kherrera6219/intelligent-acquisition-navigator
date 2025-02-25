
import React from 'react';
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black">
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <Container className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Welcome
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Sign in to your account to continue
              </p>
            </div>
            
            <Card 
              className="w-full bg-black/40 backdrop-blur-sm border-white/10 shadow-xl p-6 sm:p-8"
              noShadow
            >
              <div className="animate-fade-in space-y-6">
                {children}
              </div>
            </Card>
          </Container>
        </main>

        <footer className="py-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Your Organization. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};
