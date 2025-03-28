
import React, { Suspense, useEffect } from 'react';
import { useRoutes, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingState } from '@/components/ui/universal/LoadingState';
import { toast } from 'sonner';

// Import route collections
import landingRoutes from './landingRoutes';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import acquisitionRoutes from './acquisitionRoutes';
import settingsRoutes from './settingsRoutes';
import knowledgeBaseRoutes from './knowledgeBaseRoutes';

// Combine all route collections
const allRoutes = [
  ...landingRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...acquisitionRoutes,
  ...settingsRoutes,
  ...knowledgeBaseRoutes
];

export const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Log route changes in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Route changed to: ${location.pathname}`);
    }
  }, [location.pathname]);
  
  // Process routes to handle protection based on auth state
  const processedRoutes = React.useMemo(() => {
    if (isLoading) {
      return allRoutes.map(route => ({
        ...route,
        element: <LoadingState message="Loading authentication..." />
      }));
    }

    return allRoutes.map(route => {
      const routePath = route.path;
      
      // Redirect authenticated users away from auth pages
      if (routePath === '/login' || routePath === '/register' || routePath === '/forgot-password') {
        if (user) {
          return {
            ...route,
            element: <Navigate to="/dashboard" replace />
          };
        }
      }
      
      // Protect application routes
      if (routePath?.startsWith('/dashboard') || 
          routePath?.startsWith('/acquisition') || 
          routePath?.startsWith('/settings') ||
          routePath?.startsWith('/documents') ||
          routePath?.startsWith('/knowledge-base') ||
          routePath?.startsWith('/compliance') ||
          routePath?.startsWith('/analytics')) {
        if (!user) {
          // Save the attempted URL for redirect after login
          const returnUrl = encodeURIComponent(location.pathname + location.search);
          toast.error("Please log in to access this page");
          return {
            ...route,
            element: <Navigate to={`/login?returnUrl=${returnUrl}`} replace />
          };
        }
      }
      
      return route;
    });
  }, [user, isLoading, location]);

  const element = useRoutes(processedRoutes);

  return (
    <Suspense fallback={<LoadingState message="Loading page..." />}>
      {element}
    </Suspense>
  );
};

export default AppRoutes;
