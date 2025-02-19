
import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { lazy } from "react";

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

// Lazy load routes
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FeaturesPage = lazy(() => import("@/pages/FeaturesPage"));
const HelpPage = lazy(() => import("@/pages/HelpPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const KnowledgeBasePage = lazy(() => import("@/pages/KnowledgeBasePage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const ProposalsPage = lazy(() => import("@/pages/ProposalsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const SitemapPage = lazy(() => import("@/pages/SitemapPage"));
const TexasAcquisitionPage = lazy(() => import("@/pages/TexasAcquisitionPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Wrap routes with Suspense
const wrapRoutesWithSuspense = (routes: RouteObject[]): RouteObject[] => {
  return routes.map(route => ({
    ...route,
    element: <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
  }));
};

// Import route configurations
import { authRoutes } from "./authRoutes";
import { acquisitionRoutes } from "./acquisitionRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { settingsRoutes } from "./settingsRoutes";

// Combine all routes
export const routes: RouteObject[] = [
  ...wrapRoutesWithSuspense(authRoutes),
  ...wrapRoutesWithSuspense(acquisitionRoutes),
  ...wrapRoutesWithSuspense(dashboardRoutes),
  ...wrapRoutesWithSuspense(settingsRoutes),
  {
    path: "*",
    element: <NotFoundPage />
  }
];
