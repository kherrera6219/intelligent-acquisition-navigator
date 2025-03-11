
import { createBrowserRouter } from "react-router-dom";
import { routes as appRoutes } from "./AppRoutes";
import { routes as authRoutes } from "./authRoutes";
import { routes as dashboardRoutes } from "./dashboardRoutes";
import { routes as settingsRoutes } from "./settingsRoutes";
import { routes as acquisitionRoutes } from "./acquisitionRoutes";
import { lazy } from "react";

// Lazy import for the Microsoft Fluent Dashboard example
const MsFluentDashboardExample = lazy(() => import("@/pages/MsFluentDashboardExample"));

// New route for Microsoft Fluent Dashboard example
const msFluentRoute = {
  path: "/ms-fluent-dashboard",
  element: (
    <MsFluentDashboardExample />
  ),
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
export const routes = allRoutes; // Also export the routes array for sitemap usage
