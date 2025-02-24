
import { RouteObject } from "react-router-dom";
import { Suspense, lazy, ComponentType } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { PageLoader } from "./PageLoader";

// Enhanced LazyComponent with error boundary
export const LazyComponent = ({ Component }: { Component: ComponentType }) => (
  <PageErrorBoundary>
    <Component />
  </PageErrorBoundary>
);

// Function to wrap pages with layout and authentication checks
export const wrapWithLayout = (Component: React.ComponentType, requiresAuth: boolean = true, requiredRole?: string) => (
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

export type RouteDefinition = RouteObject & {
  requiresAuth?: boolean;
  requiredRole?: string;
};
