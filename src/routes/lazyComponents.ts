import { lazy } from "react";

// Lazily load pages for better initial load performance
export const HomePage = lazy(() => import("../pages/HomePage"));
export const AboutPage = lazy(() => import("../pages/About"));
export const FeaturesPage = lazy(() => import("../pages/FeaturesPage"));
export const PricingPage = lazy(() => import("../pages/PricingPage"));
export const ContactPage = lazy(() => import("../pages/ContactPage"));
export const AuthenticationPage = lazy(() => import("../pages/auth/AuthenticationPage"));
export const DashboardPage = lazy(() => import("../pages/DashboardPage"));
export const SettingsPage = lazy(() => import("../pages/SettingsPage"));
export const ProposalsPage = lazy(() => import("../pages/ProposalsPage"));
export const AnalyticsPage = lazy(() => import("../pages/AnalyticsPage"));
export const KnowledgeBasePage = lazy(() => import("../pages/KnowledgeBasePage"));
export const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Add validation page import
export const LazyValidationPage = lazy(() => import('../pages/ValidationPage'));
