
import { lazy } from 'react';

// Landing and public pages
export const HomePage = lazy(() => import('@/pages/HomePage'));
export const AboutPage = lazy(() => import('@/pages/AboutPage'));
export const ContactPage = lazy(() => import('@/pages/ContactPage'));
export const FeaturesPage = lazy(() => import('@/pages/FeaturesPage'));
export const PricingPage = lazy(() => import('@/pages/PricingPage'));
export const HelpPage = lazy(() => import('@/pages/HelpPage'));
export const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
export const SitemapPage = lazy(() => import('@/pages/SitemapPage'));
export const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));

// Utility and special pages
export const ChatPage = lazy(() => import('@/pages/ChatPage'));
export const ImproveApp = lazy(() => import('@/pages/ImproveApp'));
export const ApiDocsPage = lazy(() => import('@/pages/developer/ApiDocsPage'));
export const ComponentLibraryPage = lazy(() => import('@/pages/developer/ComponentLibraryPage'));
export const KnowledgeBasePage = lazy(() => import('@/pages/KnowledgeBasePage'));
export const ValidationPage = lazy(() => import('@/pages/ValidationPage'));

// Dashboard and feature pages
export const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardHomePage'));
export const ProposalDetailPage = lazy(() => import('@/pages/proposals/ProposalDetailPage'));
export const ProposalsPage = lazy(() => import('@/pages/proposals/ProposalsPage'));
export const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
export const FederalAcquisitionPage = lazy(() => import('@/pages/acquisition/FederalAcquisitionPage'));
export const TexasAcquisitionPage = lazy(() => import('@/pages/acquisition/TexasAcquisition'));
