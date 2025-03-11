
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";

const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const HelpPage = lazy(() => import("@/pages/HelpPage"));
const SitemapPage = lazy(() => import("@/pages/SitemapPage"));

export const settingsRoutes: RouteObject[] = [
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <SettingsPage />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/help",
    element: (
      <MainLayout>
        <HelpPage />
      </MainLayout>
    )
  },
  {
    path: "/sitemap",
    element: (
      <MainLayout>
        <SitemapPage />
      </MainLayout>
    )
  }
];
