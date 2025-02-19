
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

// Lazy-loaded pages
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const DocumentControlPage = lazy(() => import("@/pages/acquisition/DocumentControlPage"));
const MarketResearchPage = lazy(() => import("@/pages/acquisition/MarketResearchPage"));
const SolicitationReviewPage = lazy(() => import("@/pages/acquisition/SolicitationReviewPage"));
const TexasAcquisitionPage = lazy(() => import("@/pages/TexasAcquisitionPage"));
const FederalAcquisitionPage = lazy(() => import("@/pages/acquisition/FederalAcquisitionPage"));
const AuthPage = lazy(() => import("@/pages/auth/AuthenticationPage"));

// Function to wrap pages with layout and authentication checks
const wrapWithLayout = (Component: React.ComponentType, requiresAuth: boolean = true, requiredRole?: string) => (
  <PageErrorBoundary>
    {requiresAuth ? (
      <ProtectedRoute requiredRole={requiredRole}>
        <MainLayout>
          <Component />
        </MainLayout>
      </ProtectedRoute>
    ) : (
      <Component />
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
