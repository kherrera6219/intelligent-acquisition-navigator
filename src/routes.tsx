import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ProtectedPageLayout } from './components/layout/ProtectedPageLayout';
import { ExternalPageLayout } from './components/layout/ExternalPageLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppRoutes } from './routes/AppRoutes';

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
        async lazy() {
          const { default: HomePage } = await import('./pages/HomePage');
          return { Component: HomePage };
        }
      },
      {
        path: "auth/*",
        async lazy() {
          const { default: AuthenticationPage } = await import('./pages/auth/AuthenticationPage');
          return { 
            Component: () => (
              <ExternalPageLayout 
                showHeader={false} 
                showFooter={false}
              >
                <AuthenticationPage />
              </ExternalPageLayout>
            )
          };
        }
      },
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
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout>
          <Outlet />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { default: DashboardHomePage } = await import('./pages/dashboard/DashboardHomePage');
          return { Component: DashboardHomePage };
        }
      }
    ]
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout>
          <Outlet />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { default: AnalyticsPage } = await import('./pages/AnalyticsPage');
          return { Component: AnalyticsPage };
        }
      }
    ]
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout>
          <Outlet />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { default: SettingsPage } = await import('./pages/SettingsPage');
          return { Component: SettingsPage };
        }
      }
    ]
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout>
          <Outlet />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { default: ProfilePage } = await import('./pages/ProfilePage');
          return { Component: ProfilePage };
        }
      }
    ]
  },
  {
    path: "/federal-acquisition",
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout>
          <Outlet />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { default: FederalAcquisitionPage } = await import('./pages/acquisition/FederalAcquisitionPage');
          return { Component: FederalAcquisitionPage };
        }
      }
    ]
  },
  {
    path: "/texas-acquisition",
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout>
          <Outlet />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { default: TexasAcquisitionPage } = await import('./pages/acquisition/TexasAcquisition');
          return { Component: TexasAcquisitionPage };
        }
      }
    ]
  },
  {
    path: "/knowledge-base",
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout>
          <Outlet />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { default: KnowledgeBasePage } = await import('./pages/KnowledgeBasePage');
          return { Component: KnowledgeBasePage };
        }
      }
    ]
  },
  {
    path: "/proposals",
    element: (
      <ProtectedRoute>
        <ProtectedPageLayout>
          <Outlet />
        </ProtectedPageLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { default: ProposalsPage } = await import('./pages/ProposalsPage');
          return { Component: ProposalsPage };
        }
      },
      {
        path: ":id",
        async lazy() {
          const { default: ProposalDetailPage } = await import('./pages/ProposalDetailPage');
          return { Component: ProposalDetailPage };
        }
      }
    ]
  },
  {
    path: "*",
    async lazy() {
      const { default: NotFoundPage } = await import('./pages/NotFoundPage');
      return { Component: NotFoundPage };
    }
  }
]);
