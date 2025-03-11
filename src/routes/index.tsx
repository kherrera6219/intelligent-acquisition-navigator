
import { createBrowserRouter } from "react-router-dom";
import appRoutes, { AppRoutes } from "./AppRoutes";
import authRoutes from "./authRoutes";
import dashboardRoutes from "./dashboardRoutes";
import settingsRoutes from "./settingsRoutes";
import acquisitionRoutes from "./acquisitionRoutes";
import { lazy } from "react";

// Lazy import for the Microsoft Fluent Dashboard example
const MsFluentDashboardExample = lazy(() => import("@/pages/MsFluentDashboardExample"));

// New route for Microsoft Fluent Dashboard example
const msFluentRoute = {
  path: "/ms-fluent-dashboard",
  element: <MsFluentDashboardExample />
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
