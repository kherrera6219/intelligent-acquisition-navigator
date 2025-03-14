
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

// Additional utility pages
export const ApiDocsPage = lazy(() => import('@/pages/developer/ApiDocsPage'));
export const ComponentLibraryPage = lazy(() => import('@/pages/developer/ComponentLibraryPage'));
export const ImproveApp = lazy(() => import('@/pages/ImproveApp'));
export const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
export const KnowledgeBasePage = lazy(() => import('@/pages/KnowledgeBasePage'));
export const ChatPage = lazy(() => import('@/pages/ChatPage'));
