
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/ui/universal/PageLoader";
import appRoutes from "./AppRoutes";
import authRoutes from "./authRoutes";
import dashboardRoutes from "./dashboardRoutes";
import settingsRoutes from "./settingsRoutes";
import acquisitionRoutes from "./acquisitionRoutes";

// Lazy import for Microsoft Fluent Dashboard
const MsFluentDashboardExample = lazy(() => import("@/pages/MsFluentDashboardExample"));

// Higher-order component for lazy loading with Microsoft UI loading styles
const withFluentLoading = (Component: React.ComponentType) => () => (
  <Suspense fallback={<PageLoader variant="fluent" message="Loading content" />}>
    <Component />
  </Suspense>
);

// Microsoft Fluent Dashboard route properly typed as RouteObject
const msFluentRoute: RouteObject = {
  path: "/ms-fluent-dashboard",
  element: withFluentLoading(MsFluentDashboardExample)()
};

// Combine all routes
const allRoutes: RouteObject[] = [
  msFluentRoute,
  ...appRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...settingsRoutes,
  ...acquisitionRoutes
];

// Create the router with all routes
export const router = createBrowserRouter(allRoutes);

// Export routes for sitemap
export { allRoutes as routes };
