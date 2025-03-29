
import { RouteObject } from "react-router-dom";
import { lazy } from "react";

// Lazy-load landing page components
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const FeaturesPage = lazy(() => import("../pages/FeaturesPage"));
const PricingPage = lazy(() => import("../pages/PricingPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const HelpPage = lazy(() => import("../pages/HelpPage"));
const PrivacyPage = lazy(() => import("../pages/PrivacyPage"));
const TermsPage = lazy(() => import("../pages/TermsOfServicePage"));
const SitemapPage = lazy(() => import("../pages/SitemapPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const KnowledgeBasePage = lazy(() => import("../pages/KnowledgeBasePage"));
const WireframeShowcasePage = lazy(() => import("../pages/WireframeShowcasePage"));
const CaseStudiesPage = lazy(() => import("../pages/CaseStudiesPage"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
const ApiDocsPage = lazy(() => import("../pages/ApiDocsPage"));
const SecurityPage = lazy(() => import("../pages/SecurityPage"));
const TestimonialsPage = lazy(() => import("../pages/TestimonialsPage"));

const landingRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/features",
    element: <FeaturesPage />
  },
  {
    path: "/pricing",
    element: <PricingPage />
  },
  {
    path: "/contact",
    element: <ContactPage />
  },
  {
    path: "/help",
    element: <HelpPage />
  },
  {
    path: "/privacy",
    element: <PrivacyPage />
  },
  {
    path: "/terms",
    element: <TermsPage />
  },
  {
    path: "/sitemap",
    element: <SitemapPage />
  },
  {
    path: "/knowledge-base",
    element: <KnowledgeBasePage />
  },
  {
    path: "/wireframes",
    element: <WireframeShowcasePage />
  },
  {
    path: "/case-studies",
    element: <CaseStudiesPage />
  },
  {
    path: "/blog",
    element: <BlogPage />
  },
  {
    path: "/api-docs",
    element: <ApiDocsPage />
  },
  {
    path: "/security",
    element: <SecurityPage />
  },
  {
    path: "/testimonials",
    element: <TestimonialsPage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
];

export default landingRoutes;
