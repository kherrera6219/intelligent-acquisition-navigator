
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import {
  DashboardPage,
  DocumentControlPage,
  MarketResearchPage,
  SolicitationReviewPage,
  TexasAcquisitionPage,
  FederalAcquisitionPage,
  AuthPage,
  AnalyticsPage,
  ProposalsPage,
  HomePage,
  HelpPage,
  FeaturesPage,
  PricingPage,
  AboutPage,
  ContactPage,
  PrivacyPage,
  SettingsPage,
  SitemapPage,
  NotFoundPage,
  ProposalDetailPage,
  KnowledgeBasePage,
  ProfilePage
} from "./lazyComponents";

export const routes: RouteObject[] = [
  // Public Routes (external)
  {
    path: "/",
    element: wrapWithLayout(HomePage, false)
  },
  {
    path: "/about",
    element: wrapWithLayout(AboutPage, false)
  },
  {
    path: "/contact",
    element: wrapWithLayout(ContactPage, false)
  },
  {
    path: "/privacy",
    element: wrapWithLayout(PrivacyPage, false)
  },
  {
    path: "/features",
    element: wrapWithLayout(FeaturesPage, false)
  },
  {
    path: "/pricing",
    element: wrapWithLayout(PricingPage, false)
  },
  {
    path: "/auth",
    element: wrapWithLayout(AuthPage, false)
  },
  {
    path: "/help",
    element: wrapWithLayout(HelpPage, false)
  },
  {
    path: "/sitemap",
    element: wrapWithLayout(SitemapPage, false)
  },

  // Make previously protected routes accessible without authentication
  {
    path: "/dashboard",
    element: wrapWithLayout(DashboardPage, false)
  },
  {
    path: "/analytics",
    element: wrapWithLayout(AnalyticsPage, false)
  },
  {
    path: "/proposals",
    element: wrapWithLayout(ProposalsPage, false)
  },
  {
    path: "/proposals/:id",
    element: wrapWithLayout(ProposalDetailPage, false)
  },
  {
    path: "/settings",
    element: wrapWithLayout(SettingsPage, false)
  },
  {
    path: "/profile",
    element: wrapWithLayout(ProfilePage, false)
  },
  {
    path: "/acquisition/document-control",
    element: wrapWithLayout(DocumentControlPage, false)
  },
  {
    path: "/acquisition/market-research",
    element: wrapWithLayout(MarketResearchPage, false)
  },
  {
    path: "/acquisition/solicitation-review",
    element: wrapWithLayout(SolicitationReviewPage, false)
  },
  {
    path: "/acquisition/texas-acquisition",
    element: wrapWithLayout(TexasAcquisitionPage, false)
  },
  {
    path: "/acquisition/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage, false)
  },
  {
    path: "/knowledge-base",
    element: wrapWithLayout(KnowledgeBasePage, false)
  },
  
  // Catch-all route for 404
  {
    path: "*",
    element: wrapWithLayout(NotFoundPage, false)
  }
];
