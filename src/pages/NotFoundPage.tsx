
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/universal/Container';
import { Card } from '@/components/ui/card';
import { Home, Search, ArrowLeft, ExternalLink } from 'lucide-react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';

const NotFoundPage: React.FC = () => {
  return (
    <ExternalPageLayout 
      title="Page Not Found"
      description="The page you're looking for cannot be found."
    >
      <Container className="py-24">
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <div className="text-[120px] md:text-[180px] font-bold text-blue-500/10">404</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">Page Not Found</div>
              <div className="text-gray-400">The page you're looking for doesn't exist or has been moved.</div>
            </div>
          </div>
          
          <Card className="max-w-md w-full p-6 border border-gray-800 bg-gray-900/80 backdrop-blur-sm">
            <div className="space-y-4">
              <p className="text-gray-400 text-center mb-6">
                We're sorry, but the page you requested could not be found. Let's get you back on track.
              </p>
              
              <div className="grid gap-3">
                <Link to="/" className="w-full">
                  <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Return Home</span>
                  </Button>
                </Link>
                
                <Link to="/sitemap" className="w-full">
                  <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800 flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span>Browse Sitemap</span>
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-400 hover:text-white hover:bg-gray-800 flex items-center gap-2"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Go Back</span>
                </Button>
                
                <Link to="/contact" className="w-full">
                  <Button variant="link" className="w-full text-blue-400 hover:text-blue-300 flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>Contact Support</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </ExternalPageLayout>
  );
};

export default NotFoundPage;
