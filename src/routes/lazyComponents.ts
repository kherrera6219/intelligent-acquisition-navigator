
import { lazy } from "react";

// Public pages
export const LandingPage = lazy(() => import("@/pages/HomePage"));
export const AboutPage = lazy(() => import("@/pages/About"));
export const FeaturesPage = lazy(() => import("@/pages/FeaturesPage"));
export const PricingPage = lazy(() => import("@/pages/PricingPage"));
export const ContactPage = lazy(() => import("@/pages/ContactPage"));
export const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
export const HelpPage = lazy(() => import("@/pages/HelpPage"));
export const SitemapPage = lazy(() => import("@/pages/SitemapPage"));
export const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Auth pages
export const AuthenticationPage = lazy(() => import("@/pages/auth/AuthenticationPage"));
export const PasswordResetRequestPage = lazy(() => import("@/pages/auth/PasswordResetRequestPage"));
export const PasswordResetPage = lazy(() => import("@/pages/auth/PasswordResetPage"));
export const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

// Dashboard pages
export const DashboardHomePage = lazy(() => import("@/pages/dashboard/DashboardHomePage"));
export const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));

// Proposals pages
export const ProposalsPage = lazy(() => import("@/pages/proposals/ProposalsPage"));
export const ProposalDetailPage = lazy(() => import("@/pages/proposals/ProposalDetailPage"));

// Application pages
export const ChatPage = lazy(() => import("@/pages/ChatPage"));
export const KnowledgeBasePage = lazy(() => import("@/pages/KnowledgeBasePage"));
export const FederalKnowledgeBasePage = lazy(() => import("@/pages/FederalKnowledgeBasePage"));
export const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
export const ImproveApp = lazy(() => import("@/pages/ImproveApp"));
export const ValidationPage = lazy(() => import("@/pages/ValidationPage"));

// Developer pages
export const ApiDocsPage = lazy(() => import("@/pages/developer/ApiDocsPage"));
export const ComponentLibraryPage = lazy(() => import("@/pages/developer/ComponentLibraryPage"));

// Acquisition pages
export const MarketResearchPage = lazy(() => import("@/pages/acquisition/MarketResearchPage"));
export const DocumentControlPage = lazy(() => import("@/pages/acquisition/DocumentControlPage"));
export const SolicitationReviewPage = lazy(() => import("@/pages/acquisition/SolicitationReviewPage"));
export const FederalAcquisitionPage = lazy(() => import("@/pages/acquisition/FederalAcquisitionPage"));
export const CompliancePage = lazy(() => import("@/pages/acquisition/CompliancePage"));
export const SourceSelectionPage = lazy(() => import("@/pages/acquisition/SourceSelectionPage"));
export const ContractManagementPage = lazy(() => import("@/pages/acquisition/ContractManagementPage"));
export const LegalReviewPage = lazy(() => import("@/pages/acquisition/LegalReviewPage"));
export const SmallBusinessPage = lazy(() => import("@/pages/acquisition/SmallBusinessPage"));
export const QualityAssurancePage = lazy(() => import("@/pages/acquisition/QualityAssurancePage"));
export const TexasAcquisitionPage = lazy(() => import("@/pages/acquisition/TexasAcquisition"));
