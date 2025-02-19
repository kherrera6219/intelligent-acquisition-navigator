
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
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Chat = lazy(() => import("@/pages/Chat"));
const Contact = lazy(() => import("@/pages/Contact"));
const Features = lazy(() => import("@/pages/Features"));
const Help = lazy(() => import("@/pages/Help"));
const Index = lazy(() => import("@/pages/Index"));
const KnowledgeBase = lazy(() => import("@/pages/KnowledgeBase"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Proposals = lazy(() => import("@/pages/Proposals"));
const Settings = lazy(() => import("@/pages/Settings"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));
const TexasAcquisition = lazy(() => import("@/pages/TexasAcquisition"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
    element: <NotFound />
  }
];
