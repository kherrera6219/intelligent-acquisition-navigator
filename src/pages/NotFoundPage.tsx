
import React from 'react';
import { Button } from "@/components/ui/button";
import { Container } from '@/components/ui/universal/Container';
import { Link } from "react-router-dom";
import { Card } from '@/components/ui/universal/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { Home, Map, HelpCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <main className="flex-grow">
      <Container>
        <div className="py-6 bg-noise"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
              radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
            `,
            backgroundAttachment: 'fixed'
          }}
        >
          <PageHeader
            title="Page Not Found"
            description="We couldn't find the page you're looking for"
          />
          
          <div className="flex items-center justify-center mt-12">
            <Card 
              variant="metal" 
              className="max-w-md w-full text-center p-8 sm:p-12 space-y-6 animate-fade-in"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white">404</h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-8">
                The page you're looking for doesn't exist or has been moved
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/" className="block">
                  <Button 
                    variant="default" 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Return Home
                  </Button>
                </Link>
                
                <Link to="/sitemap" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Map className="h-4 w-4" />
                    View Sitemap
                  </Button>
                </Link>
              </div>
              
              <div className="pt-4">
                <Link to="/help" className="text-primary hover:text-primary/80 flex items-center justify-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Need help?</span>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default NotFoundPage;
