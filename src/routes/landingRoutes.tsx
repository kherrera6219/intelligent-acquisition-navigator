
import React from 'react';
import { wrapWithLayout } from "./routeTypes";
import {
  HomePage,
  AboutPage,
  FeaturesPage,
  PricingPage,
  ContactPage,
  HelpPage,
  PrivacyPage,
  SitemapPage,
  NotFoundPage
} from './lazyComponents';

const landingRoutes = [
  {
    path: "/",
    element: wrapWithLayout(HomePage, false)
  },
  {
    path: "/about",
    element: wrapWithLayout(AboutPage, false)
  },
  {
    path: "/features",
    element: wrapWithLayout(FeaturesPage, false)
  },
  {
    path: "/pricing",
    element: wrapWithLayout(PricingPage, false)
  },
  {
    path: "/contact",
    element: wrapWithLayout(ContactPage, false)
  },
  {
    path: "/help",
    element: wrapWithLayout(HelpPage, false)
  },
  {
    path: "/privacy",
    element: wrapWithLayout(PrivacyPage, false)
  },
  {
    path: "/sitemap",
    element: wrapWithLayout(SitemapPage, false)
  },
  {
    path: "*",
    element: wrapWithLayout(NotFoundPage, false)
  }
];

export default landingRoutes;
