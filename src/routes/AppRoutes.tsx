
import React, { Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingState } from '@/components/ui/universal/LoadingState';

// Import route collections
import landingRoutes from './landingRoutes';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import acquisitionRoutes from './acquisitionRoutes';
import settingsRoutes from './settingsRoutes';

// Combine all route collections
const allRoutes = [
  ...landingRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...acquisitionRoutes,
  ...settingsRoutes
];

export const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  // Process routes to handle protection based on auth state
  const processedRoutes = React.useMemo(() => {
    if (isLoading) {
      return allRoutes.map(route => ({
        ...route,
        element: <LoadingState message="Loading authentication..." />
      }));
    }

    return allRoutes.map(route => {
      // Skip if the route has already been processed or doesn't contain "protect" metadata
      const routePath = route.path;
      
      if (routePath === '/login' || routePath === '/register' || routePath === '/forgot-password') {
        // Redirect to dashboard if already logged in
        if (user) {
          return {
            ...route,
            element: <Navigate to="/dashboard" replace />
          };
        }
      }
      
      if (routePath?.startsWith('/dashboard') || 
          routePath?.startsWith('/acquisition') || 
          routePath?.startsWith('/documents')) {
        // Protected routes
        if (!user) {
          return {
            ...route,
            element: <Navigate to="/login" replace />
          };
        }
      }
      
      return route;
    });
  }, [user, isLoading]);

  const element = useRoutes(processedRoutes);

  return (
    <Suspense fallback={<LoadingState message="Loading page..." />}>
      {element}
    </Suspense>
  );
};
