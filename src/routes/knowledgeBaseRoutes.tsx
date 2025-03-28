
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import { lazy } from "react";

// Lazy-load knowledge base components
const KnowledgeBasePage = lazy(() => import("../pages/knowledge-base/KnowledgeBasePage"));
const FederalKnowledgeBasePage = lazy(() => import("../pages/FederalKnowledgeBasePage"));

const routes: RouteObject[] = [
  {
    path: "/knowledge-base",
    element: wrapWithLayout(KnowledgeBasePage, true)
  },
  {
    path: "/federal-knowledge-base",
    element: wrapWithLayout(FederalKnowledgeBasePage, true)
  }
];

export default routes;
