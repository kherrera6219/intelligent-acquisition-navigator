
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
  NotFoundPage // Add this import
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

  // Protected Routes (internal)
  {
    path: "/dashboard",
    element: wrapWithLayout(DashboardPage)
  },
  {
    path: "/analytics",
    element: wrapWithLayout(AnalyticsPage, true, "user")
  },
  {
    path: "/proposals",
    element: wrapWithLayout(ProposalsPage, true, "user")
  },
  {
    path: "/settings",
    element: wrapWithLayout(SettingsPage, true, "user")
  },
  {
    path: "/acquisition/document-control",
    element: wrapWithLayout(DocumentControlPage, true, "user")
  },
  {
    path: "/acquisition/market-research",
    element: wrapWithLayout(MarketResearchPage, true, "user")
  },
  {
    path: "/acquisition/solicitation-review",
    element: wrapWithLayout(SolicitationReviewPage, true, "manager")
  },
  {
    path: "/acquisition/texas-acquisition",
    element: wrapWithLayout(TexasAcquisitionPage, true, "user")
  },
  {
    path: "/acquisition/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage, true, "manager")
  },
  
  // Catch-all route for 404
  {
    path: "*",
    element: wrapWithLayout(NotFoundPage, false)
  }
];
