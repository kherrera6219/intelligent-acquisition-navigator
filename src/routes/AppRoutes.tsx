
import React, { Suspense } from 'react';
import { useRoutes, Navigate, RouteObject } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingState } from '@/components/ui/universal/LoadingState';
import routes from '@/routes';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

// Import route collections
import landingRoutes from './landingRoutes';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import acquisitionRoutes from './acquisitionRoutes';
import settingsRoutes from './settingsRoutes';

// Import specific pages for route definitions that aren't in collections
import { lazy } from 'react';

const ChatPage = lazy(() => import('@/pages/ChatPage'));
const ImproveApp = lazy(() => import('@/pages/ImproveApp'));
const KnowledgeBasePage = lazy(() => import('@/pages/KnowledgeBasePage'));
const ValidationPage = lazy(() => import('@/pages/ValidationPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ActivityPage = lazy(() => import('@/pages/ActivityPage'));
const CodeReviewPage = lazy(() => import('@/pages/CodeReviewPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

export const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  // Process routes to handle protection based on auth state
  const processedRoutes = React.useMemo(() => {
    if (isLoading) {
      return routes.map(route => ({
        ...route,
        element: <LoadingState message="Loading authentication..." />
      }));
    }

    return routes.map(route => {
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
          routePath?.startsWith('/proposals') || 
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
