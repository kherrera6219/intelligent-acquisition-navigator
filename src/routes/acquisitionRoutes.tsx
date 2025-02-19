
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";

const DocumentControlPage = lazy(() => import("@/pages/acquisition/DocumentControlPage"));
const MarketResearchPage = lazy(() => import("@/pages/acquisition/MarketResearchPage"));
const SolicitationReviewPage = lazy(() => import("@/pages/acquisition/SolicitationReviewPage"));
const FederalAcquisitionPage = lazy(() => import("@/pages/acquisition/FederalAcquisitionPage"));

export const acquisitionRoutes: RouteObject[] = [
  {
    path: "/acquisition/document-control",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <DocumentControlPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/acquisition/market-research",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <MarketResearchPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/acquisition/solicitation-review",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <SolicitationReviewPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/acquisition/federal",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <FederalAcquisitionPage />
        </MainLayout>
      </ProtectedRoute>
    )
  }
];
