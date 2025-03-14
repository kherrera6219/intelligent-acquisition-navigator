
import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { LoadingPage } from "@/components/LoadingPage";

// Import route collections
import landingRoutes from './landingRoutes';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import acquisitionRoutes from './acquisitionRoutes';
import settingsRoutes from './settingsRoutes';

// Import specific pages for route definitions that aren't in collections
import {
  ChatPage,
  ImproveApp,
  ApiDocsPage,
  ComponentLibraryPage,
  KnowledgeBasePage,
  ValidationPage,
  NotFoundPage
} from './lazyComponents';
import { wrapWithLayout } from './routeTypes';

// Additional utility routes that don't fit in other route groups
const utilityRoutes = [
  {
    path: "/chat",
    element: wrapWithLayout(ChatPage)
  },
  {
    path: "/improve",
    element: wrapWithLayout(ImproveApp, false)
  },
  {
    path: "/api-docs",
    element: wrapWithLayout(ApiDocsPage, false)
  },
  {
    path: "/component-library",
    element: wrapWithLayout(ComponentLibraryPage, false)
  },
  {
    path: "/knowledge-base",
    element: wrapWithLayout(KnowledgeBasePage)
  },
  {
    path: "/validation",
    element: wrapWithLayout(ValidationPage)
  },
  {
    path: "*",
    element: wrapWithLayout(NotFoundPage, false)
  }
];

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Landing routes */}
        {landingRoutes.map((route, index) => (
          <Route key={`landing-${index}`} path={route.path} element={route.element} />
        ))}
        
        {/* Auth routes */}
        {authRoutes.map((route, index) => (
          <Route key={`auth-${index}`} path={route.path} element={route.element} />
        ))}
        
        {/* Dashboard routes */}
        {dashboardRoutes.map((route, index) => (
          <Route key={`dashboard-${index}`} path={route.path} element={route.element} />
        ))}
        
        {/* Acquisition routes */}
        {acquisitionRoutes.map((route, index) => (
          <Route key={`acquisition-${index}`} path={route.path} element={route.element} />
        ))}
        
        {/* Settings routes */}
        {settingsRoutes.map((route, index) => (
          <Route key={`settings-${index}`} path={route.path} element={route.element} />
        ))}
        
        {/* Additional utility routes */}
        {utilityRoutes.map((route, index) => (
          <Route key={`utility-${index}`} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}
