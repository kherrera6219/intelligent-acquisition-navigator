import { lazy } from 'react';

// Main Pages
export const HomePage = lazy(() => import('@/pages/HomePage'));
export const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
export const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Auth Pages
export const LoginPage = lazy(() => import('@/pages/LoginPage'));
export const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
export const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));

// Settings Pages
export const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
export const ProfilePage = lazy(() => import('@/pages/ProfilePage'));

// Knowledge Base Pages
export const KnowledgeBasePage = lazy(() => import('@/pages/knowledge-base/KnowledgeBasePage'));
export const FederalKnowledgeBasePage = lazy(() => import('@/pages/FederalKnowledgeBasePage'));

// Acquisition Pages
export const FederalAcquisitionPage = lazy(() => import('@/pages/acquisition/FederalAcquisitionPage'));
export const TexasAcquisitionPage = lazy(() => import('@/pages/acquisition/TexasAcquisitionPage'));
export const MarketResearchPage = lazy(() => import('@/pages/acquisition/MarketResearchPage'));
export const CompliancePage = lazy(() => import('@/pages/acquisition/CompliancePage'));

// Other Functional Pages
export const ChatPage = lazy(() => import('@/pages/ChatPage'));
export const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
