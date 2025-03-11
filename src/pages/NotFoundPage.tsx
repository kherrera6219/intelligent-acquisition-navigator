
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/universal/Card';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

const NotFoundPage: React.FC = () => {
  const { isOnline } = useNetworkMonitor();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-noise">
      <Card className="max-w-md w-full p-6 border border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="text-center">
          <div className="bg-gray-800/50 mx-auto rounded-full w-20 h-20 flex items-center justify-center mb-4">
            <span className="text-4xl font-bold">404</span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          
          <p className="text-gray-400 mb-6">
            {!isOnline 
              ? "You're currently offline. This page may be unavailable without an internet connection."
              : "The page you're looking for doesn't exist or has been moved."}
          </p>
          
          <div className="space-y-3">
            <Link to="/" className="w-full">
              <Button variant="default" className="w-full flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Return Home</span>
              </Button>
            </Link>
            
            <Link to="/sitemap" className="w-full">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span>Browse Sitemap</span>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              className="w-full flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
