
import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import { LoadingPage } from "@/components/LoadingPage";

// Import route collections
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import acquisitionRoutes from './acquisitionRoutes';
import settingsRoutes from './settingsRoutes';

// Import from lazy component file
import {
  LandingPage,
  AboutPage,
  FeaturesPage,
  ContactPage,
  PricingPage,
  HelpPage,
  PrivacyPage,
  ChatPage,
  ImproveApp,
  SitemapPage,
  ApiDocsPage,
  ComponentLibraryPage,
  KnowledgeBasePage,
  ValidationPage,
  NotFoundPage
} from './lazyComponents';

// Main routes
const mainRoutes = [
  {
    path: "/",
    element: wrapWithLayout(LandingPage, false)
  },
  {
    path: "/about",
    element: wrapWithLayout(AboutPage, false)
  },
  {
    path: "/features",
    element: wrapWithLayout(FeaturesPage, false)
  },
  {
    path: "/contact",
    element: wrapWithLayout(ContactPage, false)
  },
  {
    path: "/pricing",
    element: wrapWithLayout(PricingPage, false)
  },
  {
    path: "/help",
    element: wrapWithLayout(HelpPage, false)
  },
  {
    path: "/privacy",
    element: wrapWithLayout(PrivacyPage, false)
  },
  {
    path: "/chat",
    element: wrapWithLayout(ChatPage)
  },
  {
    path: "/improve",
    element: wrapWithLayout(ImproveApp, false)
  },
  {
    path: "/sitemap",
    element: wrapWithLayout(SitemapPage, false)
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
        {/* Main routes */}
        {mainRoutes.map((route, index) => (
          <Route key={`main-${index}`} path={route.path} element={route.element} />
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
      </Routes>
    </Suspense>
  );
}
