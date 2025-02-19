
import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { lazy } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";

// Loading component
export const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-3xl px-4">
      <Skeleton className="h-12 w-[250px]" />
      <Skeleton className="h-4 w-[300px]" />
      <div className="space-y-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);

// Lazy load pages
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const DocumentControlPage = lazy(() => import("@/pages/acquisition/DocumentControlPage"));
const MarketResearchPage = lazy(() => import("@/pages/acquisition/MarketResearchPage"));
const SolicitationReviewPage = lazy(() => import("@/pages/acquisition/SolicitationReviewPage"));
const TexasAcquisitionPage = lazy(() => import("@/pages/TexasAcquisitionPage"));
const FederalAcquisitionPage = lazy(() => import("@/pages/acquisition/FederalAcquisitionPage"));
const AuthPage = lazy(() => import("@/pages/auth/AuthenticationPage"));

// Wrap components with error boundary and layout
const wrapWithLayout = (Component: React.ComponentType, requiresAuth: boolean = true, requiredRole?: string) => {
  const WrappedComponent = () => (
    <PageErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        {requiresAuth ? (
          <ProtectedRoute requiredRole={requiredRole}>
            <MainLayout>
              <Component />
            </MainLayout>
          </ProtectedRoute>
        ) : (
          <Component />
        )}
      </Suspense>
    </PageErrorBoundary>
  );
  return <WrappedComponent />;
};

// Define routes
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
    path: "/acquisition/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage, true, "manager")
  }
];
