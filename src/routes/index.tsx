
import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";

export const PageLoader = () => (
  <Container className="py-8">
    <Card className="w-full p-6 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </Card>
  </Container>
);

// Lazy-loaded pages with comprehensive error handling
const DashboardPage = lazy(() => 
  import("@/pages/DashboardPage").catch(() => {
    console.error("Failed to load DashboardPage");
    return { default: () => <div>Error loading dashboard</div> };
  })
);

const DocumentControlPage = lazy(() => 
  import("@/pages/acquisition/DocumentControlPage").catch(() => {
    console.error("Failed to load DocumentControlPage");
    return { default: () => <div>Error loading document control</div> };
  })
);

const MarketResearchPage = lazy(() => 
  import("@/pages/acquisition/MarketResearchPage").catch(() => {
    console.error("Failed to load MarketResearchPage");
    return { default: () => <div>Error loading market research</div> };
  })
);

const SolicitationReviewPage = lazy(() => 
  import("@/pages/acquisition/SolicitationReviewPage").catch(() => {
    console.error("Failed to load SolicitationReviewPage");
    return { default: () => <div>Error loading solicitation review</div> };
  })
);

const TexasAcquisitionPage = lazy(() => 
  import("@/pages/TexasAcquisitionPage").catch(() => {
    console.error("Failed to load TexasAcquisitionPage");
    return { default: () => <div>Error loading Texas acquisition</div> };
  })
);

const FederalAcquisitionPage = lazy(() => 
  import("@/pages/acquisition/FederalAcquisitionPage").catch(() => {
    console.error("Failed to load FederalAcquisitionPage");
    return { default: () => <div>Error loading federal acquisition</div> };
  })
);

const AuthPage = lazy(() => 
  import("@/pages/auth/AuthenticationPage").catch(() => {
    console.error("Failed to load AuthenticationPage");
    return { default: () => <div>Error loading authentication</div> };
  })
);

const AnalyticsPage = lazy(() => 
  import("@/pages/AnalyticsPage").catch(() => {
    console.error("Failed to load AnalyticsPage");
    return { default: () => <div>Error loading analytics</div> };
  })
);

// Enhanced LazyComponent with error boundary
const LazyComponent = ({ Component }: { Component: React.ComponentType }) => (
  <PageErrorBoundary>
    <Component />
  </PageErrorBoundary>
);

// Function to wrap pages with layout and authentication checks
const wrapWithLayout = (Component: React.ComponentType, requiresAuth: boolean = true, requiredRole?: string) => (
  <Suspense fallback={<PageLoader />}>
    {requiresAuth ? (
      <ProtectedRoute requiredRole={requiredRole}>
        <MainLayout>
          <LazyComponent Component={Component} />
        </MainLayout>
      </ProtectedRoute>
    ) : (
      <LazyComponent Component={Component} />
    )}
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: wrapWithLayout(DashboardPage)
  },
  {
    path: "/dashboard",
    element: wrapWithLayout(DashboardPage)
  },
  {
    path: "/auth",
    element: wrapWithLayout(AuthPage, false)
  },
  {
    path: "/analytics",
    element: wrapWithLayout(AnalyticsPage, true, "user")
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
