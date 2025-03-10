
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Link } from 'react-router-dom';
import { routes } from '@/routes';
import { Card } from '@/components/ui/universal/Card';

const SitemapPage: React.FC = () => {
  // Categorize routes
  const marketingRoutes = routes.filter(route => 
    ["/", "/about", "/contact", "/features", "/pricing", "/help", "/privacy", "/sitemap"].includes(route.path || "")
  );
  
  const authRoutes = routes.filter(route => 
    ["/auth", "/auth/reset-password", "/auth/reset-password/confirm"].includes(route.path || "")
  );
  
  const appRoutes = routes.filter(route => 
    route.path?.startsWith("/dashboard") || 
    route.path?.startsWith("/analytics") || 
    route.path?.startsWith("/profile") || 
    route.path?.startsWith("/settings") ||
    route.path?.startsWith("/proposals")
  );
  
  const acquisitionRoutes = routes.filter(route => 
    (route.path?.includes("acquisition") || 
    route.path?.startsWith("/solicitation") || 
    route.path?.startsWith("/document-control") || 
    route.path?.startsWith("/market-research") || 
    route.path?.startsWith("/contract-management") ||
    route.path?.startsWith("/source-selection") ||
    route.path?.startsWith("/legal-review") ||
    route.path?.startsWith("/small-business") ||
    route.path?.startsWith("/quality-assurance") ||
    route.path?.startsWith("/compliance") ||
    route.path?.startsWith("/knowledge-base"))
  );

  return (
    <main className="flex-grow">
      <Container>
        <div className="space-y-8 py-6 bg-noise"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
              radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
            `,
            backgroundAttachment: 'fixed',
            backgroundColor: 'var(--background)'
          }}
        >
          <PageHeader
            title={<GradientText>Sitemap</GradientText>}
            description="Find and navigate to all pages of our application"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Marketing Pages */}
            <Card variant="metal" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Marketing Pages</h2>
              <ul className="space-y-2">
                {marketingRoutes.map((route, index) => (
                  <li key={`marketing-${index}`} className="hover:bg-gray-800/50 rounded">
                    <Link to={route.path || "#"} className="block px-3 py-2 transition-colors">
                      {route.path}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
            
            {/* Auth Pages */}
            <Card variant="metal" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Authentication</h2>
              <ul className="space-y-2">
                {authRoutes.map((route, index) => (
                  <li key={`auth-${index}`} className="hover:bg-gray-800/50 rounded">
                    <Link to={route.path || "#"} className="block px-3 py-2 transition-colors">
                      {route.path}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
            
            {/* Application Pages */}
            <Card variant="metal" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Application</h2>
              <ul className="space-y-2">
                {appRoutes.map((route, index) => (
                  <li key={`app-${index}`} className="hover:bg-gray-800/50 rounded">
                    <Link to={route.path || "#"} className="block px-3 py-2 transition-colors">
                      {route.path}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
            
            {/* Acquisition Pages */}
            <Card variant="metal" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Acquisition</h2>
              <ul className="space-y-2">
                {acquisitionRoutes.map((route, index) => (
                  <li key={`acquisition-${index}`} className="hover:bg-gray-800/50 rounded">
                    <Link to={route.path || "#"} className="block px-3 py-2 transition-colors">
                      {route.path}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SitemapPage;
