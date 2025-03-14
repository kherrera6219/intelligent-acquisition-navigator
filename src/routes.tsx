
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';

// Import route collections
import landingRoutes from './routes/landingRoutes';
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import acquisitionRoutes from './routes/acquisitionRoutes';
import settingsRoutes from './routes/settingsRoutes';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
const ChatPage = React.lazy(() => import('@/pages/ChatPage'));

// Define primary routes
export const routes: RouteObject[] = [
  // Public home route
  {
    path: '/',
    element: <HomePage />,
  },
  
  // Special utility routes
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="AI Chat Assistant">
          <ChatPage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
  
  // 404 route
  {
    path: '*',
    element: <NotFoundPage />,
  },
  
  // Import all routes from collections
  ...landingRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...acquisitionRoutes,
  ...settingsRoutes
];

export default routes;
