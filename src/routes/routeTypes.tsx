
import { RouteObject } from "react-router-dom";
import { Suspense, lazy, ComponentType } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { PageLoader } from "./PageLoader";

interface LazyComponentProps {
  Component: ComponentType;
}

// Enhanced LazyComponent with error boundary and suspense
export const LazyComponent: React.FC<LazyComponentProps> = ({ Component }) => {
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
  // Move error boundary to the outermost layer to catch all errors
  const element = (
    <PageErrorBoundary>
      {requiresAuth ? (
        <ProtectedRoute requiredRole={requiredRole}>
          <MainLayout>
            <LazyComponent Component={Component} />
          </MainLayout>
        </ProtectedRoute>
      ) : (
        <MainLayout>
          <LazyComponent Component={Component} />
        </MainLayout>
      )}
    </PageErrorBoundary>
  );
  
  return element;
};

// Route definition type using specific properties we need from RouteObject
export interface RouteDefinition extends Pick<RouteObject, 'path' | 'element' | 'children'> {
  requiresAuth?: boolean;
  requiredRole?: string;
}

