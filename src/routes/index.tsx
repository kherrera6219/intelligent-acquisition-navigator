
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import {
  DashboardPage,
  DocumentControlPage,
  MarketResearchPage,
  SolicitationReviewPage,
  TexasAcquisitionPage,
  FederalAcquisitionPage,
  AuthPage,
  AnalyticsPage
} from "./lazyComponents";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: wrapWithLayout(DashboardPage)
  },
  {
    path: "/dashboard",
    element: wrapWithLayout(DashboardPage)
  },
  {
    path: "/auth",
    element: wrapWithLayout(AuthPage, false)
  },
  {
    path: "/analytics",
    element: wrapWithLayout(AnalyticsPage, true, "user")
  },
  {
    path: "/acquisition/document-control",
    element: wrapWithLayout(DocumentControlPage, true, "user")
  },
  {
    path: "/acquisition/market-research",
    element: wrapWithLayout(MarketResearchPage, true, "user")
  },
  {
    path: "/acquisition/solicitation-review",
    element: wrapWithLayout(SolicitationReviewPage, true, "manager")
  },
  {
    path: "/acquisition/texas-acquisition",
    element: wrapWithLayout(TexasAcquisitionPage, true, "user")
  },
  {
    path: "/acquisition/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage, true, "manager")
  }
];
