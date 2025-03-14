
import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import { lazy } from "react";
import { LoadingPage } from "@/components/LoadingPage";

// Import route collections
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import acquisitionRoutes from './acquisitionRoutes';
import settingsRoutes from './settingsRoutes';

// Lazy load pages
const LandingPage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/About"));
const FeaturesPage = lazy(() => import("@/pages/FeaturesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const HelpPage = lazy(() => import("@/pages/HelpPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const ImproveApp = lazy(() => import("@/pages/ImproveApp"));
const SitemapPage = lazy(() => import("@/pages/SitemapPage"));
const ApiDocsPage = lazy(() => import("@/pages/developer/ApiDocsPage"));
const ComponentLibraryPage = lazy(() => import("@/pages/developer/ComponentLibraryPage"));
const KnowledgeBasePage = lazy(() => import("@/pages/KnowledgeBasePage"));
const ValidationPage = lazy(() => import("@/pages/ValidationPage"));

// Combine main routes
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
