
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { routes } from '@/routes';
import { RouteObject } from 'react-router-dom';
import { Compass, ExternalLink } from 'lucide-react';

const SitemapPage: React.FC = () => {
  // Explicitly cast routes to RouteObject[] to ensure TypeScript knows it's an array
  const routeObjects = routes as RouteObject[];
  
  // Group routes by section
  const routesByType = routeObjects.reduce((acc: Record<string, string[]>, route: RouteObject) => {
    const path = route.path || "";
    
    if (path === '*') return acc; // Skip 404 route
    
    let type = 'Other';
    
    if (path.startsWith('/dashboard') || path.startsWith('/analytics') || path === '/ms-fluent-dashboard') {
      type = 'Dashboard';
    } else if (path.startsWith('/auth') || path === '/profile') {
      type = 'Authentication';
    } else if (path.startsWith('/market-research') || path.startsWith('/document-control') || 
               path.startsWith('/solicitation') || path.startsWith('/compliance') ||
               path.startsWith('/federal-acquisition') || path.startsWith('/texas-acquisition') ||
               path.startsWith('/source-selection') || path.startsWith('/contract-management') || 
               path.startsWith('/legal-review') || path.startsWith('/small-business') ||
               path.startsWith('/quality-assurance')) {
      type = 'Acquisition';
    } else if (path.startsWith('/settings') || path.startsWith('/knowledge-base')) {
      type = 'Settings';
    } else if (path === '/' || path.startsWith('/about') || path.startsWith('/features') || 
               path.startsWith('/pricing') || path.startsWith('/contact') || 
               path.startsWith('/help') || path.startsWith('/privacy') || 
               path.startsWith('/chat') || path.startsWith('/improve') ||
               path.startsWith('/sitemap')) {
      type = 'Main';
    } else if (path.startsWith('/api-docs') || path.startsWith('/component-library')) {
      type = 'Developer';
    }
    
    acc[type] = [...(acc[type] || []), path];
    return acc;
  }, {});

  // Sort the keys to ensure consistent display order
  const orderedTypes = ['Main', 'Dashboard', 'Acquisition', 'Authentication', 'Settings', 'Developer', 'Other'];

  return (
    <Container className="py-8">
      <PageHeader
        title="Sitemap"
        description="Navigation map of all pages in the application"
      />

      <div className="space-y-8 mt-8">
        {orderedTypes.map(type => {
          if (!routesByType[type] || routesByType[type].length === 0) return null;
          
          return (
            <div key={type} className="loading-fade-in">
              <div className="flex items-center mb-4">
                <Compass className="h-5 w-5 mr-2 text-blue-500" />
                <h2 className="text-xl font-semibold">{type}</h2>
              </div>
              <Card className="p-4 ms-fluent-panel">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {routesByType[type].sort().map(path => (
                    <Button
                      key={path}
                      variant="outline"
                      className="justify-start ms-nav-item group h-auto py-3"
                      asChild
                    >
                      <Link to={path} className="flex justify-between items-center w-full">
                        <span>
                          {path === '/' ? 'Home' : path.replace(/^\/([\w-]+).*$/, '$1').replace(/-/g, ' ')}
                        </span>
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default SitemapPage;
