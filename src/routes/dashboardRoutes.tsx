
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const AnalyticsPage = lazy(() => import("@/pages/analytics/AnalyticsPage"));
const ProposalsPage = lazy(() => import("@/pages/ProposalsPage"));
const ProposalDetailPage = lazy(() => import("@/pages/ProposalDetailPage"));

const routes: RouteObject[] = [
  {
    path: "/dashboard",
    element: wrapWithLayout(DashboardPage)
  },
  {
    path: "/home",
    element: wrapWithLayout(DashboardPage)
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
