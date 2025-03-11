
import { lazy, ComponentType, Suspense, ReactNode } from "react";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { PageLoader } from "@/components/ui/universal/PageLoader";

interface LazyComponentProps {
  Component: ComponentType;
}

// Enhanced LazyComponent with error boundary and suspense
export const LazyComponent = ({ Component }: LazyComponentProps): JSX.Element => {
  return (
    <PageErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    </PageErrorBoundary>
  );
};

// Helper to create lazy-loaded components
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): T {
  const LazyComponent = lazy(importFn);
  return LazyComponent as T;
}

// Lazy loaded pages
export const LazyHomePage = lazy(() => import('@/pages/HomePage'));
export const LazyDashboardPage = lazy(() => import('@/pages/DashboardPage'));
export const LazyChatPage = lazy(() => import('@/pages/ChatPage'));
export const LazyAnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
export const LazyProposalsPage = lazy(() => import('@/pages/ProposalsPage'));
export const LazySettingsPage = lazy(() => import('@/pages/SettingsPage'));
export const LazyProfilePage = lazy(() => import('@/pages/ProfilePage'));
export const LazyKnowledgeBasePage = lazy(() => import('@/pages/KnowledgeBasePage'));
export const LazyAuthenticationPage = lazy(() => import('@/pages/auth/AuthenticationPage'));
