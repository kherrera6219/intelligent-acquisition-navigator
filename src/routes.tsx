
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import NotFoundPage from '@/pages/NotFoundPage';
import { ProtectedPageLayout } from './components/layout/ProtectedPageLayout';
import { ExternalPageLayout } from './components/layout/ExternalPageLayout';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Simple wrapper for public routes
const PublicWrapper = () => {
  return <Outlet />;
};

// Create browser router with proper route configuration
export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <PublicWrapper />,
    children: [
      {
        index: true,
        element: (
          <ExternalPageLayout>
            <HomePage />
          </ExternalPageLayout>
        ),
      },
      {
        path: "auth/*",
        element: (
          <ExternalPageLayout showHeader={false} showFooter={false}>
            <AuthPage />
          </ExternalPageLayout>
        ),
      },
      // External pages
      {
        path: "about",
        element: (
          <ExternalPageLayout>
            <Outlet />
          </ExternalPageLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import('./pages/AboutPage')
          }
        ]
      },
      {
        path: "features",
        element: (
          <ExternalPageLayout>
            <Outlet />
          </ExternalPageLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import('./pages/FeaturesPage')
          }
        ]
      },
      {
        path: "pricing",
        element: (
          <ExternalPageLayout>
            <Outlet />
          </ExternalPageLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import('./pages/PricingPage')
          }
        ]
      },
      {
        path: "contact",
        element: (
          <ExternalPageLayout>
            <Outlet />
          </ExternalPageLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import('./pages/ContactPage')
          }
        ]
      },
      {
        path: "help",
        element: (
          <ExternalPageLayout>
            <Outlet />
          </ExternalPageLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import('./pages/HelpPage')
          }
        ]
      },
      {
        path: "privacy",
        element: (
          <ExternalPageLayout>
            <Outlet />
          </ExternalPageLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import('./pages/PrivacyPage')
          }
        ]
      },
      {
        path: "terms",
        element: (
          <ExternalPageLayout>
            <Outlet />
          </ExternalPageLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import('./pages/TermsPage')
          }
        ]
      },
      {
        path: "sitemap",
        element: (
          <ExternalPageLayout>
            <Outlet />
          </ExternalPageLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import('./pages/SitemapPage')
          }
        ]
      }
    ]
  },
  {
    path: "/dashboard/*",
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout>
          <AppRoutes />
        </ProtectedPageLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
