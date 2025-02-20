
import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";

// Simple loading spinner for lazy-loaded components
export const PageLoader = () => (
  <Container className="py-8">
    <Card className="w-full p-6 shadow-xl flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </Card>
  </Container>
);

// Lazy-loaded pages with proper chunk names
const DashboardPage = lazy(() => import("@/pages/DashboardPage" /* webpackChunkName: "dashboard" */));
const DocumentControlPage = lazy(() => import("@/pages/acquisition/DocumentControlPage" /* webpackChunkName: "document-control" */));
const MarketResearchPage = lazy(() => import("@/pages/acquisition/MarketResearchPage" /* webpackChunkName: "market-research" */));
const SolicitationReviewPage = lazy(() => import("@/pages/acquisition/SolicitationReviewPage" /* webpackChunkName: "solicitation-review" */));
const TexasAcquisitionPage = lazy(() => import("@/pages/TexasAcquisitionPage" /* webpackChunkName: "texas-acquisition" */));
const FederalAcquisitionPage = lazy(() => import("@/pages/acquisition/FederalAcquisitionPage" /* webpackChunkName: "federal-acquisition" */));
const AuthPage = lazy(() => import("@/pages/auth/AuthenticationPage" /* webpackChunkName: "auth" */));

const LazyComponent = ({ Component }: { Component: React.ComponentType }) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// Function to wrap pages with layout and authentication checks
const wrapWithLayout = (Component: React.ComponentType, requiresAuth: boolean = true, requiredRole?: string) => (
  <PageErrorBoundary>
    {requiresAuth ? (
      <ProtectedRoute requiredRole={requiredRole}>
        <MainLayout>
          <LazyComponent Component={Component} />
        </MainLayout>
      </ProtectedRoute>
    ) : (
      <LazyComponent Component={Component} />
    )}
  </PageErrorBoundary>
);

// Define application routes with access control
export const routes: RouteObject[] = [
  {
    path: "/",
    element: wrapWithLayout(DashboardPage)
  },
  {
    path: "/auth",
    element: wrapWithLayout(AuthPage, false)
  },
  {
    path: "/acquisition/document-control",
    element: wrapWithLayout(DocumentControlPage, true, "user")
  },
  {
    path: "/acquisition/market-research",
    element: wrapWithLayout(MarketResearchPage, true, "user")
  },
  {
    path: "/acquisition/solicitation-review",
    element: wrapWithLayout(SolicitationReviewPage, true, "manager")
  },
  {
    path: "/acquisition/texas-acquisition",
    element: wrapWithLayout(TexasAcquisitionPage, true, "user")
  },
  {
    path: "/acquisition/federal",
    element: wrapWithLayout(FederalAcquisitionPage, true, "manager")
  },
  {
    path: "/acquisition/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage, true, "manager")
  }
];
