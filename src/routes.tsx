import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';

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
const SettingsPage = React.lazy(() => import('@/pages/SettingsPage'));
const UserProfilePage = React.lazy(() => import('@/pages/UserProfilePage'));
const KnowledgeBasePage = React.lazy(() => import('@/pages/KnowledgeBasePage'));
const FederalKnowledgeBasePage = React.lazy(() => import('@/pages/FederalKnowledgeBasePage'));
const TexasAcquisition = React.lazy(() => import('@/pages/acquisition/TexasAcquisition'));
const ChatPage = React.lazy(() => import('@/pages/ChatPage'));
const FederalAcquisitionPage = React.lazy(() => import('@/pages/acquisition/FederalAcquisitionPage'));
const ContractManagementPage = React.lazy(() => import('@/pages/acquisition/ContractManagementPage'));
const MarketResearchPage = React.lazy(() => import('@/pages/acquisition/MarketResearchPage'));
const SourceSelectionPage = React.lazy(() => import('@/pages/acquisition/SourceSelectionPage'));
const CompliancePage = React.lazy(() => import('@/pages/acquisition/CompliancePage'));
const TexasAcquisitionPage = React.lazy(() => import('@/pages/TexasAcquisitionPage'));

export const routes: RouteObject[] = [
  // Public routes
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
  // Protected routes
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
    path: '/settings',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="Settings">
          <SettingsPage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="User Profile">
          <UserProfilePage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/knowledge-base',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="Knowledge Base">
          <KnowledgeBasePage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/federal-knowledge-base',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="Federal Knowledge Base">
          <FederalKnowledgeBasePage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/texas-acquisition',
    element: (
      <ProtectedRoute>
        <TexasAcquisition />
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
  {
    path: '/federal-acquisition',
    element: (
      <ProtectedRoute>
        <FederalAcquisitionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/texas-acquisition-chat',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="Texas Acquisition Chat">
          <TexasAcquisitionPage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/contract-management',
    element: (
      <ProtectedRoute>
        <ContractManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/market-research',
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout title="Market Research">
          <MarketResearchPage />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/source-selection',
    element: (
      <ProtectedRoute>
        <SourceSelectionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/compliance',
    element: (
      <ProtectedRoute>
        <CompliancePage />
      </ProtectedRoute>
    ),
  },
  // 404 route
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
