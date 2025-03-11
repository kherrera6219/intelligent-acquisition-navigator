
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";

const DocumentControlPage = lazy(() => import("@/pages/acquisition/DocumentControlPage"));
const MarketResearchPage = lazy(() => import("@/pages/acquisition/MarketResearchPage"));
const SolicitationReviewPage = lazy(() => import("@/pages/acquisition/SolicitationReviewPage"));
const FederalAcquisitionPage = lazy(() => import("@/pages/acquisition/FederalAcquisitionPage"));
const TexasAcquisitionPage = lazy(() => import("@/pages/TexasAcquisitionPage"));
const CompliancePage = lazy(() => import("@/pages/acquisition/CompliancePage"));
const SourceSelectionPage = lazy(() => import("@/pages/acquisition/SourceSelectionPage"));
const ContractManagementPage = lazy(() => import("@/pages/acquisition/ContractManagementPage"));
const LegalReviewPage = lazy(() => import("@/pages/acquisition/LegalReviewPage"));
const SmallBusinessPage = lazy(() => import("@/pages/acquisition/SmallBusinessPage"));
const QualityAssurancePage = lazy(() => import("@/pages/acquisition/QualityAssurancePage"));
const TexasAcquisition = lazy(() => import("@/pages/acquisition/TexasAcquisition"));

const routes: RouteObject[] = [
  {
    path: "/document-control",
    element: wrapWithLayout(DocumentControlPage)
  },
  {
    path: "/market-research",
    element: wrapWithLayout(MarketResearchPage)
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
    element: wrapWithLayout(SourceSelectionPage, true, "manager")
  },
  {
    path: "/contract-management",
    element: wrapWithLayout(ContractManagementPage)
  },
  {
    path: "/legal-review",
    element: wrapWithLayout(LegalReviewPage, true, "manager")
  },
  {
    path: "/small-business",
    element: wrapWithLayout(SmallBusinessPage)
  },
  {
    path: "/quality-assurance",
    element: wrapWithLayout(QualityAssurancePage)
  },
  {
    path: "/texas-acquisition-detail",
    element: wrapWithLayout(TexasAcquisition)
  }
];

export { routes };
