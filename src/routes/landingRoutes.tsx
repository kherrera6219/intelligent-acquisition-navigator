
import React from 'react';
import { RouteObject } from 'react-router-dom';

// Import route components
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const ContactPage = React.lazy(() => import('@/pages/ContactPage'));
const PricingPage = React.lazy(() => import('@/pages/PricingPage'));
const FeaturesPage = React.lazy(() => import('@/pages/FeaturesPage'));
const TestimonialsPage = React.lazy(() => import('@/pages/TestimonialsPage'));
const PrivacyPage = React.lazy(() => import('@/pages/PrivacyPage'));
const TermsOfServicePage = React.lazy(() => import('@/pages/TermsOfServicePage'));
const DocsPage = React.lazy(() => import('@/pages/DocsPage'));
const DocDetailPage = React.lazy(() => import('@/pages/DocDetailPage'));

// Define landing routes
const landingRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/pricing',
    element: <PricingPage />
  },
  {
    path: '/features',
    element: <FeaturesPage />
  },
  {
    path: '/testimonials',
    element: <TestimonialsPage />
  },
  {
    path: '/privacy',
    element: <PrivacyPage />
  },
  {
    path: '/terms',
    element: <TermsOfServicePage />
  },
  {
    path: '/docs',
    element: <DocsPage />
  },
  {
    path: '/docs/:slug',
    element: <DocDetailPage />
  }
];

export default landingRoutes;
