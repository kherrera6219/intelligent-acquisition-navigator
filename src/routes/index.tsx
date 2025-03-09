
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
  PasswordResetRequestPage,
  PasswordResetPage,
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
  ProfilePage,
  ApiDocsPage,
  ComponentLibraryPage
} from "./lazyComponents";

export const routes: RouteObject[] = [
  // Marketing & Public Routes
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
    path: "/help",
    element: wrapWithLayout(HelpPage, false)
  },
  {
    path: "/sitemap",
    element: wrapWithLayout(SitemapPage, false)
  },
  
  // Authentication
  {
    path: "/auth",
    element: wrapWithLayout(AuthPage, false)
  },
  {
    path: "/auth/reset-password",
    element: wrapWithLayout(PasswordResetRequestPage, false)
  },
  {
    path: "/auth/reset-password/confirm",
    element: wrapWithLayout(PasswordResetPage, false)
  },
  
  // Core Application Routes
  {
    path: "/dashboard",
    element: wrapWithLayout(DashboardPage, true)
  },
  {
    path: "/analytics",
    element: wrapWithLayout(AnalyticsPage, true)
  },
  {
    path: "/profile",
    element: wrapWithLayout(ProfilePage, true)
  },
  {
    path: "/settings",
    element: wrapWithLayout(SettingsPage, true)
  },
  
  // Proposal Management
  {
    path: "/proposals",
    element: wrapWithLayout(ProposalsPage, true)
  },
  {
    path: "/proposals/:id",
    element: wrapWithLayout(ProposalDetailPage, true)
  },
  
  // Knowledge & Resources
  {
    path: "/knowledge-base",
    element: wrapWithLayout(KnowledgeBasePage, true)
  },
  
  // Acquisition Management
  {
    path: "/solicitation-review",
    element: wrapWithLayout(SolicitationReviewPage, true)
  },
  {
    path: "/document-control",
    element: wrapWithLayout(DocumentControlPage, true)
  },
  {
    path: "/market-research",
    element: wrapWithLayout(MarketResearchPage, true)
  },
  {
    path: "/texas-acquisition",
    element: wrapWithLayout(TexasAcquisitionPage, true)
  },
  {
    path: "/federal-acquisition",
    element: wrapWithLayout(FederalAcquisitionPage, true)
  },
  
  // Compliance Review
  {
    path: "/compliance",
    element: wrapWithLayout(DashboardPage, true) // TODO: Create dedicated compliance page
  },
  
  // Legal Review
  {
    path: "/legal-review",
    element: wrapWithLayout(DashboardPage, true) // TODO: Create dedicated legal review page
  },
  
  // Small Business
  {
    path: "/small-business",
    element: wrapWithLayout(DashboardPage, true) // TODO: Create dedicated small business page
  },
  
  // Quality Assurance
  {
    path: "/quality-assurance",
    element: wrapWithLayout(DashboardPage, true) // TODO: Create dedicated quality assurance page
  },
  
  // Source Selection
  {
    path: "/source-selection",
    element: wrapWithLayout(DashboardPage, true) // TODO: Create dedicated source selection page
  },
  
  // Contract Management
  {
    path: "/contract-management",
    element: wrapWithLayout(DashboardPage, true) // TODO: Create dedicated contract management page
  },
  
  // Developer Resources
  {
    path: "/api-docs",
    element: wrapWithLayout(ApiDocsPage, false)
  },
  {
    path: "/component-library",
    element: wrapWithLayout(ComponentLibraryPage, false)
  },
  
  // Catch-all route for 404
  {
    path: "*",
    element: wrapWithLayout(NotFoundPage, false)
  }
];
