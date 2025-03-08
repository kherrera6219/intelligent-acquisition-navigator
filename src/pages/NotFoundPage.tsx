
import React from 'react';
import { Button } from "@/components/ui/button";
import { Container } from '@/components/ui/universal/Container';
import { Link } from "react-router-dom";
import { GlassCard } from '@/components/ui/universal/GlassCard';
import { PageHeader } from '@/components/layout/PageHeader';

const NotFoundPage: React.FC = () => {
  return (
    <main className="flex-grow">
      <Container>
        <div className="py-6">
          <PageHeader
            title="Page Not Found"
            description="We couldn't find the page you're looking for"
          />
          
          <div className="flex items-center justify-center mt-12">
            <GlassCard className="max-w-md w-full text-center p-8 sm:p-12 space-y-6 animate-fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">404</h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-8">
                The page you're looking for doesn't exist or has been moved
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
        </div>
      </Container>
    </main>
  );
};

export default NotFoundPage;
