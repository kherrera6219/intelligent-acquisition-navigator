
import React from 'react';
import { LazyComponent } from './routeTypes';
import { PageLayout } from '@/components/layout/PageLayout';

// Import pages with lazy loading
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const FeaturesPage = React.lazy(() => import('@/pages/FeaturesPage'));
const PricingPage = React.lazy(() => import('@/pages/PricingPage'));
const ContactPage = React.lazy(() => import('@/pages/ContactPage'));
const HelpPage = React.lazy(() => import('@/pages/HelpPage'));
const PrivacyPage = React.lazy(() => import('@/pages/PrivacyPage'));
const SitemapPage = React.lazy(() => import('@/pages/SitemapPage'));

// Landing routes
const landingRoutes = [
  {
    path: "/",
    element: (
      <PageLayout>
        <LazyComponent Component={HomePage} />
      </PageLayout>
    )
  },
  {
    path: "/about",
    element: (
      <PageLayout>
        <LazyComponent Component={AboutPage} />
      </PageLayout>
    )
  },
  {
    path: "/features",
    element: (
      <PageLayout>
        <LazyComponent Component={FeaturesPage} />
      </PageLayout>
    )
  },
  {
    path: "/pricing",
    element: (
      <PageLayout>
        <LazyComponent Component={PricingPage} />
      </PageLayout>
    )
  },
  {
    path: "/contact",
    element: (
      <PageLayout>
        <LazyComponent Component={ContactPage} />
      </PageLayout>
    )
  },
  {
    path: "/help",
    element: (
      <PageLayout>
        <LazyComponent Component={HelpPage} />
      </PageLayout>
    )
  },
  {
    path: "/privacy",
    element: (
      <PageLayout>
        <LazyComponent Component={PrivacyPage} />
      </PageLayout>
    )
  },
  {
    path: "/sitemap",
    element: (
      <PageLayout>
        <LazyComponent Component={SitemapPage} />
      </PageLayout>
    )
  }
];

export default landingRoutes;
