
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import { lazy } from "react";

// Lazy-load acquisition components
const FederalAcquisitionPage = lazy(() => import("../pages/acquisition/FederalAcquisitionPage"));
const TexasAcquisitionPage = lazy(() => import("../pages/acquisition/TexasAcquisitionPage"));
const MarketResearchPage = lazy(() => import("../pages/acquisition/MarketResearchPage"));
const SolicitationReviewPage = lazy(() => import("../pages/acquisition/SolicitationReviewPage"));
const DocumentControlPage = lazy(() => import("../pages/acquisition/DocumentControlPage"));
const CompliancePage = lazy(() => import("../pages/acquisition/CompliancePage"));
const LegalReviewPage = lazy(() => import("../pages/acquisition/LegalReviewPage"));
const SmallBusinessPage = lazy(() => import("../pages/acquisition/SmallBusinessPage"));
const QualityAssurancePage = lazy(() => import("../pages/acquisition/QualityAssurancePage"));
const SourceSelectionPage = lazy(() => import("../pages/acquisition/SourceSelectionPage"));
const ContractManagementPage = lazy(() => import("../pages/acquisition/ContractManagementPage"));

const routes: RouteObject[] = [
  {
    path: "/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage, true)
  },
  {
    path: "/texas-acquisition",
    element: wrapWithLayout(TexasAcquisitionPage, true)
  },
  {
    path: "/market-research",
    element: wrapWithLayout(MarketResearchPage, true)
  },
  {
    path: "/solicitation-review",
    element: wrapWithLayout(SolicitationReviewPage, true)
  },
  {
    path: "/document-control",
    element: wrapWithLayout(DocumentControlPage, true)
  },
  {
    path: "/compliance",
    element: wrapWithLayout(CompliancePage, true)
  },
  {
    path: "/legal-review",
    element: wrapWithLayout(LegalReviewPage, true, "manager")
  },
  {
    path: "/small-business",
    element: wrapWithLayout(SmallBusinessPage, true)
  },
  {
    path: "/quality-assurance",
    element: wrapWithLayout(QualityAssurancePage, true)
  },
  {
    path: "/source-selection",
    element: wrapWithLayout(SourceSelectionPage, true, "manager")
  },
  {
    path: "/contract-management",
    element: wrapWithLayout(ContractManagementPage, true)
  }
];

export default routes;
