
import { createBrowserRouter } from "react-router-dom";
import appRoutes, { AppRoutes } from "./AppRoutes";
import authRoutes from "./authRoutes";
import dashboardRoutes from "./dashboardRoutes";
import settingsRoutes from "./settingsRoutes";
import acquisitionRoutes from "./acquisitionRoutes";
import { lazy, Suspense } from "react";
import { PageLoader } from "./PageLoader";

// Lazy import for the Microsoft Fluent Dashboard example
const MsFluentDashboardExample = lazy(() => import("@/pages/MsFluentDashboardExample"));

// Higher-order component for lazy loading with Microsoft UI loading styles
const withFluentLoading = (Component: React.ComponentType) => (props: any) => (
  <Suspense fallback={<PageLoader variant="fluent" message="Loading content" />}>
    <Component {...props} />
  </Suspense>
);

// New route for Microsoft Fluent Dashboard example
const msFluentRoute = {
  path: "/ms-fluent-dashboard",
  element: withFluentLoading(MsFluentDashboardExample)()
};

// All routes
const allRoutes = [
  msFluentRoute,
  ...appRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...settingsRoutes,
  ...acquisitionRoutes,
];

// Create the router with all routes
export const router = createBrowserRouter(allRoutes);
export { allRoutes as routes, AppRoutes };
