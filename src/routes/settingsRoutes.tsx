
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";

const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const KnowledgeBasePage = lazy(() => import("@/pages/KnowledgeBasePage"));
const FederalKnowledgeBasePage = lazy(() => import("@/pages/FederalKnowledgeBasePage"));

export const routes: RouteObject[] = [
  {
    path: "/settings",
    element: wrapWithLayout(SettingsPage)
  },
  {
    path: "/knowledge-base",
    element: wrapWithLayout(KnowledgeBasePage, false)
  },
  {
    path: "/federal-knowledge-base",
    element: wrapWithLayout(FederalKnowledgeBasePage)
  }
];
