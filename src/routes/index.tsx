
import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";

// Global loading component with minimal UI
export const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <Container className="py-8">
      <Card className="w-full bg-black/40 backdrop-blur-sm border-white/10 p-6 shadow-xl flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </Card>
    </Container>
  </div>
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
    element: (
      <Suspense fallback={<PageLoader />}>
        {wrapWithLayout(DashboardPage)}
      </Suspense>
    )
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<PageLoader />}>
        {wrapWithLayout(AuthPage, false)}
      </Suspense>
    )
  },
  {
    path: "/acquisition/document-control",
    element: (
      <Suspense fallback={<PageLoader />}>
        {wrapWithLayout(DocumentControlPage, true, "user")}
      </Suspense>
    )
  },
  {
    path: "/acquisition/market-research",
    element: (
      <Suspense fallback={<PageLoader />}>
        {wrapWithLayout(MarketResearchPage, true, "user")}
      </Suspense>
    )
  },
  {
    path: "/acquisition/solicitation-review",
    element: (
      <Suspense fallback={<PageLoader />}>
        {wrapWithLayout(SolicitationReviewPage, true, "manager")}
      </Suspense>
    )
  },
  {
    path: "/acquisition/texas-acquisition",
    element: (
      <Suspense fallback={<PageLoader />}>
        {wrapWithLayout(TexasAcquisitionPage, true, "user")}
      </Suspense>
    )
  },
  {
    path: "/acquisition/federal",
    element: (
      <Suspense fallback={<PageLoader />}>
        {wrapWithLayout(FederalAcquisitionPage, true, "manager")}
      </Suspense>
    )
  },
  {
    path: "/acquisition/federal-acquisition",
    element: (
      <Suspense fallback={<PageLoader />}>
        {wrapWithLayout(FederalAcquisitionPage, true, "manager")}
      </Suspense>
    )
  }
];
