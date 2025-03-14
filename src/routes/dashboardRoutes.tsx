
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";

// Lazily load dashboard components
const DashboardHomePage = lazy(() => import("@/pages/dashboard/DashboardHomePage"));
const AnalyticsPage = lazy(() => import("@/pages/analytics/AnalyticsPage"));
const ProposalsPage = lazy(() => import("@/pages/proposals/ProposalsPage"));
const ProposalDetailPage = lazy(() => import("@/pages/proposals/ProposalDetailPage"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: wrapWithLayout(DashboardHomePage)
  },
  {
    path: "/dashboard",
    element: wrapWithLayout(DashboardHomePage)
  },
  {
    path: "/analytics",
    element: wrapWithLayout(AnalyticsPage)
  },
  {
    path: "/proposals",
    element: wrapWithLayout(ProposalsPage)
  },
  {
    path: "/proposals/:id",
    element: wrapWithLayout(ProposalDetailPage)
  }
];

export default routes;
