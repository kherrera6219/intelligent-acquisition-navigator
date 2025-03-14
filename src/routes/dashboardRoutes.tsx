
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import { lazy } from "react";

// Lazy-load dashboard components
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const ActivityPage = lazy(() => import("@/pages/dashboard/ActivityPage"));

const routes: RouteObject[] = [
  {
    path: "/dashboard",
    element: wrapWithLayout(DashboardPage, true)
  },
  {
    path: "/analytics",
    element: wrapWithLayout(AnalyticsPage, true, "manager")
  },
  {
    path: "/activity",
    element: wrapWithLayout(ActivityPage, true)
  }
];

export default routes;
