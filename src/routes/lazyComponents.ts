
import { lazy, ComponentType, Suspense, ReactNode } from "react";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { PageLoader } from "@/components/ui/universal/PageLoader";

interface LazyComponentProps {
  Component: ComponentType;
}

// Enhanced LazyComponent with error boundary and suspense
export const LazyComponent = ({ Component }: LazyComponentProps): ReactNode => {
  return (
    <PageErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    </PageErrorBoundary>
  );
};

// Function to wrap pages with layout and authentication checks
export const wrapWithLayout = (
  Component: ComponentType,
  requiresAuth: boolean = true,
  requiredRole?: string
): JSX.Element => {
  // Import the required components
  const ProtectedRoute = lazy(() => import('@/components/auth/ProtectedRoute'));
  const MainLayout = lazy(() => import('@/components/layout/MainLayout'));
  
  // Move error boundary to the outermost layer to catch all errors
  const element = (
    <PageErrorBoundary>
      {requiresAuth ? (
        <Suspense fallback={<PageLoader />}>
          <ProtectedRoute requiredRole={requiredRole}>
            <MainLayout>
              <LazyComponent Component={Component} />
            </MainLayout>
          </ProtectedRoute>
        </Suspense>
      ) : (
        <Suspense fallback={<PageLoader />}>
          <MainLayout>
            <LazyComponent Component={Component} />
          </MainLayout>
        </Suspense>
      )}
    </PageErrorBoundary>
  );
  
  return element;
};

// Route definition type using specific properties we need from RouteObject
export interface RouteDefinition {
  path: string;
  element: JSX.Element;
  children?: RouteDefinition[];
  requiresAuth?: boolean;
  requiredRole?: string;
}
