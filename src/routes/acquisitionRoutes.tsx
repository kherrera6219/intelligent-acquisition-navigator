
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";

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
const KnowledgeBasePage = lazy(() => import("@/pages/KnowledgeBasePage"));

export const acquisitionRoutes: RouteObject[] = [
  {
    path: "/document-control",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <DocumentControlPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/market-research",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <MarketResearchPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/solicitation-review",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <SolicitationReviewPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/federal-acquisition",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <FederalAcquisitionPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/texas-acquisition",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <TexasAcquisitionPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/compliance",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CompliancePage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/source-selection",
    element: (
      <ProtectedRoute>
        <MainLayout requiredRole="manager">
          <SourceSelectionPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/contract-management",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <ContractManagementPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/legal-review",
    element: (
      <ProtectedRoute requiredRole="manager">
        <MainLayout>
          <LegalReviewPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/small-business",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <SmallBusinessPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/quality-assurance",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <QualityAssurancePage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/knowledge-base",
    element: (
      <MainLayout>
        <KnowledgeBasePage />
      </MainLayout>
    )
  }
];
