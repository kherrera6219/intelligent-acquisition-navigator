import { lazy } from 'react';

// Lazy load components to improve initial load time
export const LazyHomePage = lazy(() => import('../pages/HomePage'));
export const LazyAboutPage = lazy(() => import('../pages/About'));
export const LazyFeaturesPage = lazy(() => import('../pages/FeaturesPage'));
export const LazyPricingPage = lazy(() => import('../pages/PricingPage'));
export const LazyContactPage = lazy(() => import('../pages/ContactPage'));
export const LazyPrivacyPage = lazy(() => import('../pages/PrivacyPage'));
export const LazyHelpPage = lazy(() => import('../pages/HelpPage'));
export const LazyChatPage = lazy(() => import('../pages/ChatPage'));
export const LazyAnalyticsPage = lazy(() => import('../pages/AnalyticsPage'));
export const LazyDashboardPage = lazy(() => import('../pages/DashboardPage'));
export const LazyProposalsPage = lazy(() => import('../pages/ProposalsPage'));
export const LazyProposalDetailPage = lazy(() => import('../pages/ProposalDetailPage'));
export const LazySettingsPage = lazy(() => import('../pages/SettingsPage'));
export const LazyProfilePage = lazy(() => import('../pages/ProfilePage'));
export const LazySitemapPage = lazy(() => import('../pages/SitemapPage'));
export const LazyNotFoundPage = lazy(() => import('../pages/NotFoundPage'));
export const LazyPageLoader = lazy(() => import('../components/ui/universal/PageLoader'));
export const LazyKnowledgeBasePage = lazy(() => import('../pages/KnowledgeBasePage'));
export const LazyFederalKnowledgeBasePage = lazy(() => import('../pages/FederalKnowledgeBasePage'));
export const LazyAuthenticationPage = lazy(() => import('../pages/auth/AuthenticationPage'));
export const LazyPasswordResetPage = lazy(() => import('../pages/auth/PasswordResetPage'));
export const LazyPasswordResetRequestPage = lazy(() => import('../pages/auth/PasswordResetRequestPage'));
export const LazyMsFluentDashboardExample = lazy(() => import('../pages/MsFluentDashboardExample'));
export const LazyTexasAcquisitionPage = lazy(() => import('../pages/TexasAcquisitionPage'));
export const LazyImproveApp = lazy(() => import('../pages/ImproveApp'));

export function lazyImport<T extends React.ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return {
    default: lazy(factory)
  };
}

// Helper function for importing default exports
export function importDefault<T>(module: Promise<{ default: T }>): Promise<{ default: T }> {
  return module;
}

// Wrapper for PageLoader component
export const { PageLoader } = {
  PageLoader: lazy(() => import("./PageLoader").then(module => ({ default: module.PageLoader })))
};

// Use this function to create lazy components for routing
export function createLazyComponent(path: string) {
  return lazy(() => import(path));
}
