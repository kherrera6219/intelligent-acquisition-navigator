
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { routes } from '@/routes';
import { RouteObject } from 'react-router-dom';

const SitemapPage: React.FC = () => {
  // Cast routes to RouteObject[] to ensure TypeScript knows it's an array
  const routeObjects = routes as RouteObject[];
  
  // Group routes by section
  const routesByType = routeObjects.reduce((acc: Record<string, string[]>, route: RouteObject) => {
    const path = route.path || "";
    
    if (path === '*') return acc; // Skip 404 route
    
    let type = 'Other';
    
    if (path.startsWith('/dashboard') || path.startsWith('/proposals') || path.startsWith('/analytics')) {
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
               path.startsWith('/chat') || path.startsWith('/improve')) {
      type = 'Main';
    }
    
    acc[type] = [...(acc[type] || []), path];
    return acc;
  }, {});

  return (
    <Container className="py-8">
      <PageHeader
        title="Sitemap"
        description="Navigation map of all pages in the application"
      />

      <div className="space-y-8 mt-8">
        {Object.entries(routesByType).map(([type, paths]) => (
          <div key={type}>
            <h2 className="text-xl font-semibold mb-4">{type}</h2>
            <Card className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {paths.map(path => (
                  <Button
                    key={path}
                    variant="outline"
                    className="justify-start"
                    asChild
                  >
                    <Link to={path}>
                      {path === '/' ? 'Home' : path.replace(/^\/([\w-]+).*$/, '$1')}
                    </Link>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default SitemapPage;
