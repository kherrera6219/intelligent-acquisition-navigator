
import { lazy } from 'react';

// External pages (Landing pages)
export const LandingPage = lazy(() => import('@/pages/HomePage'));
export const AboutPage = lazy(() => import('@/pages/AboutPage'));
export const FeaturesPage = lazy(() => import('@/pages/FeaturesPage'));
export const PricingPage = lazy(() => import('@/pages/PricingPage'));
export const ContactPage = lazy(() => import('@/pages/ContactPage'));
export const HelpPage = lazy(() => import('@/pages/HelpPage'));
export const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
export const SitemapPage = lazy(() => import('@/pages/SitemapPage'));
export const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Additional utility pages that will be connected later
export const ApiDocsPage = lazy(() => import('@/pages/developer/ApiDocsPage'));
export const ComponentLibraryPage = lazy(() => import('@/pages/developer/ComponentLibraryPage'));
export const ImproveApp = lazy(() => import('@/pages/ImproveApp'));

// Analytics page import - fixed to use the main page path
export const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));

// The following internal pages will be reconnected later when we update them
// export const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
// export const ProposalsPage = lazy(() => import('@/pages/ProposalsPage'));
// export const ProposalDetailPage = lazy(() => import('@/pages/ProposalDetailPage'));
// export const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
// export const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
// export const ChatPage = lazy(() => import('@/pages/ChatPage'));
// export const KnowledgeBasePage = lazy(() => import('@/pages/KnowledgeBasePage'));
// export const FederalKnowledgeBasePage = lazy(() => import('@/pages/FederalKnowledgeBasePage'));
// export const TexasAcquisitionPage = lazy(() => import('@/pages/TexasAcquisitionPage'));
// export const ValidationPage = lazy(() => import('@/pages/ValidationPage'));
