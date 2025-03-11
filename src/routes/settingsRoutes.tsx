
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";

const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const KnowledgeBasePage = lazy(() => import("@/pages/KnowledgeBasePage"));
const FederalKnowledgeBasePage = lazy(() => import("@/pages/FederalKnowledgeBasePage"));
const TexasAcquisitionPage = lazy(() => import("@/pages/TexasAcquisitionPage"));
const FederalAcquisitionPage = lazy(() => import("@/pages/acquisition/FederalAcquisitionPage"));
const DocumentControlPage = lazy(() => import("@/pages/acquisition/DocumentControlPage"));
const MarketResearchPage = lazy(() => import("@/pages/acquisition/MarketResearchPage"));
const CompliancePage = lazy(() => import("@/pages/acquisition/CompliancePage"));
const LegalReviewPage = lazy(() => import("@/pages/acquisition/LegalReviewPage"));
const SmallBusinessPage = lazy(() => import("@/pages/acquisition/SmallBusinessPage"));
const QualityAssurancePage = lazy(() => import("@/pages/acquisition/QualityAssurancePage"));
const SolicitationReviewPage = lazy(() => import("@/pages/acquisition/SolicitationReviewPage"));
const SourceSelectionPage = lazy(() => import("@/pages/acquisition/SourceSelectionPage"));
const ContractManagementPage = lazy(() => import("@/pages/acquisition/ContractManagementPage"));

const routes: RouteObject[] = [
  {
    path: "/settings",
    element: wrapWithLayout(SettingsPage)
  },
  {
    path: "/knowledge-base",
    element: wrapWithLayout(KnowledgeBasePage)
  },
  {
    path: "/federal-knowledge-base",
    element: wrapWithLayout(FederalKnowledgeBasePage)
  },
  {
    path: "/texas-acquisition",
    element: wrapWithLayout(TexasAcquisitionPage)
  },
  {
    path: "/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage)
  },
  {
    path: "/document-control",
    element: wrapWithLayout(DocumentControlPage)
  },
  {
    path: "/market-research",
    element: wrapWithLayout(MarketResearchPage)
  },
  {
    path: "/compliance",
    element: wrapWithLayout(CompliancePage)
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
  },
  {
    path: "/solicitation-review",
    element: wrapWithLayout(SolicitationReviewPage)
  },
  {
    path: "/source-selection",
    element: wrapWithLayout(SourceSelectionPage)
  },
  {
    path: "/contract-management",
    element: wrapWithLayout(ContractManagementPage)
  },
];

export default routes;
