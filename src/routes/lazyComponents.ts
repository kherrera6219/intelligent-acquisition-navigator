
import { lazy } from "react";

export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}

// Components from app routes
export const { HomePage } = lazyImport(() => import("@/pages/HomePage"), "HomePage");
export const { AboutPage } = lazyImport(() => import("@/pages/About"), "AboutPage");
export const { FeaturesPage } = lazyImport(() => import("@/pages/FeaturesPage"), "FeaturesPage");
export const { ContactPage } = lazyImport(() => import("@/pages/ContactPage"), "ContactPage");
export const { PricingPage } = lazyImport(() => import("@/pages/PricingPage"), "PricingPage");
export const { HelpPage } = lazyImport(() => import("@/pages/HelpPage"), "HelpPage");
export const { NotFoundPage } = lazyImport(() => import("@/pages/NotFoundPage"), "NotFoundPage");
export const { PrivacyPage } = lazyImport(() => import("@/pages/PrivacyPage"), "PrivacyPage");
export const { ChatPage } = lazyImport(() => import("@/pages/ChatPage"), "ChatPage");
export const { ImproveApp } = lazyImport(() => import("@/pages/ImproveApp"), "ImproveApp");
export const { SitemapPage } = lazyImport(() => import("@/pages/SitemapPage"), "SitemapPage");
export const { KnowledgeBasePage } = lazyImport(() => import("@/pages/KnowledgeBasePage"), "KnowledgeBasePage");
export const { FederalKnowledgeBasePage } = lazyImport(() => import("@/pages/FederalKnowledgeBasePage"), "FederalKnowledgeBasePage");
export const { MsFluentDashboardExample } = lazyImport(() => import("@/pages/MsFluentDashboardExample"), "MsFluentDashboardExample");

// Components from auth routes
export const { AuthenticationPage } = lazyImport(() => import("@/pages/auth/AuthenticationPage"), "AuthenticationPage");
export const { PasswordResetRequestPage } = lazyImport(() => import("@/pages/auth/PasswordResetRequestPage"), "PasswordResetRequestPage");
export const { PasswordResetPage } = lazyImport(() => import("@/pages/auth/PasswordResetPage"), "PasswordResetPage");
export const { ProfilePage } = lazyImport(() => import("@/pages/ProfilePage"), "ProfilePage");

// Components from dashboard routes
export const { DashboardPage } = lazyImport(() => import("@/pages/DashboardPage"), "DashboardPage");
export const { AnalyticsPage } = lazyImport(() => import("@/pages/analytics/AnalyticsPage"), "AnalyticsPage");
export const { ProposalsPage } = lazyImport(() => import("@/pages/ProposalsPage"), "ProposalsPage");
export const { ProposalDetailPage } = lazyImport(() => import("@/pages/ProposalDetailPage"), "ProposalDetailPage");
export const { TexasAcquisitionPage } = lazyImport(() => import("@/pages/TexasAcquisitionPage"), "TexasAcquisitionPage");

// Components from settings routes
export const { SettingsPage } = lazyImport(() => import("@/pages/SettingsPage"), "SettingsPage");

// Components from acquisition routes
export const { FederalAcquisitionPage } = lazyImport(() => import("@/pages/acquisition/FederalAcquisitionPage"), "FederalAcquisitionPage");
export const { DocumentControlPage } = lazyImport(() => import("@/pages/acquisition/DocumentControlPage"), "DocumentControlPage");
export const { SolicitationReviewPage } = lazyImport(() => import("@/pages/acquisition/SolicitationReviewPage"), "SolicitationReviewPage");
export const { MarketResearchPage } = lazyImport(() => import("@/pages/acquisition/MarketResearchPage"), "MarketResearchPage");
export const { CompliancePage } = lazyImport(() => import("@/pages/acquisition/CompliancePage"), "CompliancePage");
export const { LegalReviewPage } = lazyImport(() => import("@/pages/acquisition/LegalReviewPage"), "LegalReviewPage");
export const { SmallBusinessPage } = lazyImport(() => import("@/pages/acquisition/SmallBusinessPage"), "SmallBusinessPage");
export const { QualityAssurancePage } = lazyImport(() => import("@/pages/acquisition/QualityAssurancePage"), "QualityAssurancePage");
export const { SourceSelectionPage } = lazyImport(() => import("@/pages/acquisition/SourceSelectionPage"), "SourceSelectionPage");
export const { ContractManagementPage } = lazyImport(() => import("@/pages/acquisition/ContractManagementPage"), "ContractManagementPage");
export const { TexasAcquisition } = lazyImport(() => import("@/pages/acquisition/TexasAcquisition"), "TexasAcquisition");

// Developer routes
export const { ApiDocsPage } = lazyImport(() => import("@/pages/developer/ApiDocsPage"), "ApiDocsPage");
export const { ComponentLibraryPage } = lazyImport(() => import("@/pages/developer/ComponentLibraryPage"), "ComponentLibraryPage");
