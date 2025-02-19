
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";

const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));

export const settingsRoutes: RouteObject[] = [
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Settings />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Help />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/sitemap",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Sitemap />
        </MainLayout>
      </ProtectedRoute>
    )
  }
];
