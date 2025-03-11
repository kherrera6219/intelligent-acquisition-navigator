
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";

// Lazy-load acquisition components for better performance
const MarketResearchPage = lazy(() => import("@/pages/acquisition/MarketResearchPage"));
const DocumentControlPage = lazy(() => import("@/pages/acquisition/DocumentControlPage"));
const SolicitationReviewPage = lazy(() => import("@/pages/acquisition/SolicitationReviewPage"));
const FederalAcquisitionPage = lazy(() => import("@/pages/acquisition/FederalAcquisitionPage"));
const CompliancePage = lazy(() => import("@/pages/acquisition/CompliancePage"));
const SourceSelectionPage = lazy(() => import("@/pages/acquisition/SourceSelectionPage"));
const ContractManagementPage = lazy(() => import("@/pages/acquisition/ContractManagementPage"));
const LegalReviewPage = lazy(() => import("@/pages/acquisition/LegalReviewPage"));
const SmallBusinessPage = lazy(() => import("@/pages/acquisition/SmallBusinessPage"));
const QualityAssurancePage = lazy(() => import("@/pages/acquisition/QualityAssurancePage"));
const TexasAcquisitionPage = lazy(() => import("@/pages/acquisition/TexasAcquisition"));

const routes: RouteObject[] = [
  {
    path: "/market-research",
    element: wrapWithLayout(MarketResearchPage)
  },
  {
    path: "/document-control",
    element: wrapWithLayout(DocumentControlPage)
  },
  {
    path: "/solicitation-review",
    element: wrapWithLayout(SolicitationReviewPage)
  },
  {
    path: "/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage)
  },
  {
    path: "/texas-acquisition",
    element: wrapWithLayout(TexasAcquisitionPage)
  },
  {
    path: "/compliance",
    element: wrapWithLayout(CompliancePage)
  },
  {
    path: "/source-selection",
    element: wrapWithLayout(SourceSelectionPage)
  },
  {
    path: "/contract-management",
    element: wrapWithLayout(ContractManagementPage)
  },
  {
    path: "/legal-review",
    element: wrapWithLayout(LegalReviewPage)
  },
  {
    path: "/small-business",
    element: wrapWithLayout(SmallBusinessPage)
  },
  {
    path: "/quality-assurance",
    element: wrapWithLayout(QualityAssurancePage)
  }
];

export default routes;
