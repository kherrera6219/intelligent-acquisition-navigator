
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { acquisitionRoutes } from './acquisitionRoutes';
import { authRoutes } from './authRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { settingsRoutes } from './settingsRoutes'; 
import HomePage from '@/pages/HomePage';

// Lazily load routes that aren't essential for initial render
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const AboutPage = lazy(() => import('@/pages/About'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const SitemapPage = lazy(() => import('@/pages/SitemapPage'));
const HelpPage = lazy(() => import('@/pages/HelpPage'));
const ImproveApp = lazy(() => import('@/pages/ImproveApp'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    index: true,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/privacy',
    element: <PrivacyPage />,
  },
  {
    path: '/sitemap',
    element: <SitemapPage />,
  },
  {
    path: '/help',
    element: <HelpPage />,
  },
  {
    path: '/improve',
    element: <ImproveApp />,
  },
  ...authRoutes,
  ...dashboardRoutes,
  ...acquisitionRoutes,
  ...settingsRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
