
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";

const DocumentControl = lazy(() => import("@/pages/acquisition/DocumentControl"));
const MarketResearch = lazy(() => import("@/pages/acquisition/MarketResearch"));
const SolicitationReview = lazy(() => import("@/pages/acquisition/SolicitationReview"));
const TexasAcquisition = lazy(() => import("@/pages/acquisition/TexasAcquisition"));
const FederalAcquisition = lazy(() => import("@/pages/acquisition/FederalAcquisition"));

export const acquisitionRoutes: RouteObject[] = [
  {
    path: "/acquisition/document-control",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <DocumentControl />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/acquisition/market-research",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <MarketResearch />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/acquisition/solicitation-review",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <SolicitationReview />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/acquisition/texas-acquisition",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <TexasAcquisition />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/acquisition/federal-acquisition",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <FederalAcquisition />
        </MainLayout>
      </ProtectedRoute>
    )
  }
];
