
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { acquisitionRoutes } from './acquisitionRoutes';
import { authRoutes } from './authRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { settingsRoutes } from './settingsRoutes'; 
import HomePage from '@/pages/HomePage';
import { MainLayout } from '@/components/layout/MainLayout';

// Lazily load routes that aren't essential for initial render
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const AboutPage = lazy(() => import('@/pages/About'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const SitemapPage = lazy(() => import('@/pages/SitemapPage'));
const HelpPage = lazy(() => import('@/pages/HelpPage'));
const ImproveApp = lazy(() => import('@/pages/ImproveApp'));
const ApiDocsPage = lazy(() => import('@/pages/developer/ApiDocsPage'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    index: true,
  },
  {
    path: '/about',
    element: (
      <MainLayout containerSize="lg">
        <AboutPage />
      </MainLayout>
    ),
  },
  {
    path: '/contact',
    element: (
      <MainLayout containerSize="lg">
        <ContactPage />
      </MainLayout>
    ),
  },
  {
    path: '/pricing',
    element: (
      <MainLayout containerSize="lg">
        <PricingPage />
      </MainLayout>
    ),
  },
  {
    path: '/privacy',
    element: (
      <MainLayout containerSize="lg">
        <PrivacyPage />
      </MainLayout>
    ),
  },
  {
    path: '/sitemap',
    element: (
      <MainLayout containerSize="lg">
        <SitemapPage />
      </MainLayout>
    ),
  },
  {
    path: '/help',
    element: (
      <MainLayout containerSize="lg">
        <HelpPage />
      </MainLayout>
    ),
  },
  {
    path: '/improve',
    element: (
      <MainLayout containerSize="lg">
        <ImproveApp />
      </MainLayout>
    ),
  },
  {
    path: '/api-docs',
    element: (
      <MainLayout containerSize="lg">
        <ApiDocsPage />
      </MainLayout>
    ),
  },
  ...authRoutes,
  ...dashboardRoutes,
  ...acquisitionRoutes,
  ...settingsRoutes,
  {
    path: '*',
    element: (
      <MainLayout>
        <NotFoundPage />
      </MainLayout>
    ),
  },
];
