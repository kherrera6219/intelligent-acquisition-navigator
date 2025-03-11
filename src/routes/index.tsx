import { createBrowserRouter } from "react-router-dom";
import { routes as appRoutes } from "./AppRoutes";
import { routes as authRoutes } from "./authRoutes";
import { routes as dashboardRoutes } from "./dashboardRoutes";
import { routes as settingsRoutes } from "./settingsRoutes";
import { routes as acquisitionRoutes } from "./acquisitionRoutes";
import { PageLoader } from "./PageLoader";
import { lazyImport } from "./lazyComponents";

// Lazy import for the new Microsoft Fluent Dashboard example
const { MsFluentDashboardExample } = lazyImport(
  () => import("@/pages/MsFluentDashboardExample"),
  "MsFluentDashboardExample"
);

// All routes
const allRoutes = [
  // Add our new Microsoft Fluent Dashboard example route
  {
    path: "/ms-fluent-dashboard",
    element: <PageLoader component={MsFluentDashboardExample} />,
  },
  ...appRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...settingsRoutes,
  ...acquisitionRoutes,
];

// Create the router with all routes
export const router = createBrowserRouter(allRoutes);
