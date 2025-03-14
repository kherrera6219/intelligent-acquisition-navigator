
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
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
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('@/pages/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('@/pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('@/pages/ResetPasswordPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
const ProposalsPage = React.lazy(() => import('@/pages/ProposalsPage'));
const ProposalDetailPage = React.lazy(() => import('@/pages/ProposalDetailPage'));
const DocumentsPage = React.lazy(() => import('@/pages/DocumentsPage'));
const ChatPage = React.lazy(() => import('@/pages/ChatPage'));

// Maintain explicit routes for backward compatibility
// These routes will eventually be fully migrated to their respective collection files
export const routes: RouteObject[] = [
  // Public routes that need to be maintained for backward compatibility
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  // Protected routes that need to be maintained for backward compatibility
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/proposals',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="Proposals">
          <ProposalsPage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/proposals/:id',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="Proposal Details">
          <ProposalDetailPage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/documents',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="Documents">
          <DocumentsPage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
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
