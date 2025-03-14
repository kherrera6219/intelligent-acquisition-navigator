
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';
import { ProtectedPageLayout } from './components/layout/ProtectedPageLayout';
import { ExternalPageLayout } from './components/layout/ExternalPageLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppRoutes } from './routes/AppRoutes';

// Lazy-load page components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AuthenticationPage = React.lazy(() => import('./pages/auth/AuthenticationPage'));
const DashboardHomePage = React.lazy(() => import('./pages/dashboard/DashboardHomePage'));

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
            <AuthenticationPage />
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
            async lazy() {
              const { default: AboutPage } = await import('./pages/AboutPage');
              return { Component: AboutPage };
            }
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
            async lazy() {
              const { default: FeaturesPage } = await import('./pages/FeaturesPage');
              return { Component: FeaturesPage };
            }
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
            async lazy() {
              const { default: PricingPage } = await import('./pages/PricingPage');
              return { Component: PricingPage };
            }
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
            async lazy() {
              const { default: ContactPage } = await import('./pages/ContactPage');
              return { Component: ContactPage };
            }
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
            async lazy() {
              const { default: HelpPage } = await import('./pages/HelpPage');
              return { Component: HelpPage };
            }
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
            async lazy() {
              const { default: PrivacyPage } = await import('./pages/PrivacyPage');
              return { Component: PrivacyPage };
            }
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
            async lazy() {
              // Use PrivacyPage with a "terms" pageType prop for Terms page
              const { default: PrivacyPage } = await import('./pages/PrivacyPage');
              return { 
                Component: () => <PrivacyPage pageType="terms" /> 
              };
            }
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
            async lazy() {
              const { default: SitemapPage } = await import('./pages/SitemapPage');
              return { Component: SitemapPage };
            }
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
