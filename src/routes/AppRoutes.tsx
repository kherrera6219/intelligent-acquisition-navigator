import React from 'react';
import { Routes, Route, RouteObject } from 'react-router-dom';
import { wrapWithLayout } from "./routeTypes";
import { lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
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

// Define app routes
export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: wrapWithLayout(HomePage, false)
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
    path: "*", // Catch all for 404
    element: wrapWithLayout(NotFoundPage, false)
  }
];

interface AppRoutesProps {
  routes: RouteObject[];
}

// AppRoutes component for rendering routes
export const AppRoutes: React.FC<AppRoutesProps> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route 
          key={route.path || index}
          path={route.path}
          element={route.element}
        >
          {route.children?.map((childRoute, childIndex) => (
            <Route
              key={childRoute.path || childIndex}
              path={childRoute.path}
              element={childRoute.element}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default appRoutes;
