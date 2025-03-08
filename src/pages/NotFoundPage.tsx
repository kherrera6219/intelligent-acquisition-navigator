
import React from 'react';
import { Button } from "@/components/ui/button";
import { Container } from '@/components/ui/universal/Container';
import { Link } from "react-router-dom";
import { GlassCard } from '@/components/ui/universal/GlassCard';

const NotFoundPage: React.FC = () => {
  return (
    <main className="flex-grow">
      <Container>
        <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.40))]">
          <GlassCard className="max-w-md w-full text-center p-8 sm:p-12 space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">404</h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8">
              We couldn't find the page you're looking for
            </p>
            <Link to="/" className="block">
              <Button 
                variant="default" 
                size="lg"
                className="w-full sm:w-auto"
              >
                Return Home
              </Button>
            </Link>
          </GlassCard>
        </div>
      </Container>
    </main>
  );
};

export default NotFoundPage;
