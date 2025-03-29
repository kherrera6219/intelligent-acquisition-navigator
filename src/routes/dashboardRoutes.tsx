
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '@/app/layout/Layout';

// Lazy-loaded dashboard pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const TypographyDemoPage = lazy(() => import('@/pages/TypographyDemoPage'));
const ValidationPage = lazy(() => import('@/pages/ValidationPage'));

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    )
  },
  {
    path: '/dashboard/home',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/typography',
    element: (
      <Layout>
        <TypographyDemoPage />
      </Layout>
    )
  },
  {
    path: '/validation',
    element: (
      <Layout>
        <ValidationPage />
      </Layout>
    )
  }
];

export default dashboardRoutes;
