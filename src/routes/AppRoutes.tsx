import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { wrapWithLayout } from "./routeTypes";
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingPage } from "@/components/LoadingPage";

// Lazy load pages
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
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const AnalyticsPage = lazy(() => import("@/pages/analytics/AnalyticsPage"));

// Acquisition pages - standardized imports
const MarketResearchPage = lazy(() => import("@/pages/acquisition/MarketResearchPage"));
const DocumentControlPage = lazy(() => import("@/pages/acquisition/DocumentControlPage"));
const SolicitationReviewPage = lazy(() => import("@/pages/acquisition/SolicitationReviewPage"));
const FederalAcquisitionPage = lazy(() => import("@/pages/acquisition/FederalAcquisitionPage"));
const CompliancePage = lazy(() => import("@/pages/acquisition/CompliancePage"));
const SourceSelectionPage = lazy(() => import("@/pages/acquisition/SourceSelectionPage"));
const ContractManagementPage = lazy(() => import("@/pages/acquisition/ContractManagementPage"));
const LegalReviewPage = lazy(() => import("@/pages/acquisition/LegalReviewPage"));
const SmallBusinessPage = lazy(() => import("@/pages/acquisition/SmallBusinessPage"));
const QualityAssurancePage = lazy(() => import("@/pages/acquisition/QualityAssurancePage"));

// Other specific pages
const KnowledgeBasePage = lazy(() => import("@/pages/KnowledgeBasePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ValidationPage = lazy(() => import("@/pages/ValidationPage"));
const ProposalsPage = lazy(() => import("@/pages/ProposalsPage"));
const ProposalDetailPage = lazy(() => import("@/pages/ProposalDetailPage"));

const appRoutes: RouteObject[] = [
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
    path: "/dashboard",
    element: wrapWithLayout(DashboardPage)
  },
  {
    path: "/analytics",
    element: wrapWithLayout(AnalyticsPage)
  },
  {
    path: "/market-research",
    element: wrapWithLayout(MarketResearchPage)
  },
  {
    path: "/document-control",
    element: wrapWithLayout(DocumentControlPage)
  },
  {
    path: "/solicitation-review",
    element: wrapWithLayout(SolicitationReviewPage)
  },
  {
    path: "/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage)
  },
  {
    path: "/compliance",
    element: wrapWithLayout(CompliancePage)
  },
  {
    path: "/source-selection",
    element: wrapWithLayout(SourceSelectionPage)
  },
  {
    path: "/contract-management",
    element: wrapWithLayout(ContractManagementPage)
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
    path: "/knowledge-base",
    element: wrapWithLayout(KnowledgeBasePage)
  },
  {
    path: "/profile",
    element: wrapWithLayout(ProfilePage)
  },
  {
    path: "/validation",
    element: wrapWithLayout(ValidationPage)
  },
  {
    path: "/proposals",
    element: wrapWithLayout(ProposalsPage)
  },
  {
    path: "/proposals/:id",
    element: wrapWithLayout(ProposalDetailPage)
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
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}
