import { lazy } from "react";
import React from "react";

// Public Pages
export const HomePage = lazy(() => 
  import("@/pages/HomePage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading home page")
  }))
);

export const AboutPage = lazy(() => 
  import("@/pages/About").catch(() => ({
    default: () => React.createElement("div", null, "Error loading about page")
  }))
);

export const ContactPage = lazy(() => 
  import("@/pages/ContactPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading contact page")
  }))
);

export const PrivacyPage = lazy(() => 
  import("@/pages/PrivacyPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading privacy page")
  }))
);

export const FeaturesPage = lazy(() => 
  import("@/pages/FeaturesPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading features page")
  }))
);

export const PricingPage = lazy(() => 
  import("@/pages/PricingPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading pricing page")
  }))
);

export const HelpPage = lazy(() => 
  import("@/pages/HelpPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading help page")
  }))
);

export const SitemapPage = lazy(() => 
  import("@/pages/SitemapPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading sitemap")
  }))
);

// Protected Pages
export const DashboardPage = lazy(() => 
  import("@/pages/DashboardPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading dashboard")
  }))
);

export const DocumentControlPage = lazy(() => 
  import("@/pages/acquisition/DocumentControlPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading document control")
  }))
);

export const MarketResearchPage = lazy(() => 
  import("@/pages/acquisition/MarketResearchPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading market research")
  }))
);

export const SolicitationReviewPage = lazy(() => 
  import("@/pages/acquisition/SolicitationReviewPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading solicitation review")
  }))
);

export const TexasAcquisitionPage = lazy(() => 
  import("@/pages/TexasAcquisitionPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading Texas acquisition")
  }))
);

export const FederalAcquisitionPage = lazy(() => 
  import("@/pages/acquisition/FederalAcquisitionPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading federal acquisition")
  }))
);

export const AuthPage = lazy(() => 
  import("@/pages/auth/AuthenticationPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading authentication")
  }))
);

export const AnalyticsPage = lazy(() => 
  import("@/pages/AnalyticsPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading analytics")
  }))
);

export const ProposalsPage = lazy(() => 
  import("@/pages/ProposalsPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading proposals")
  }))
);

export const ProposalDetailPage = lazy(() => 
  import("@/pages/ProposalDetailPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading proposal details")
  }))
);

export const SettingsPage = lazy(() => 
  import("@/pages/SettingsPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading settings")
  }))
);

export const KnowledgeBasePage = lazy(() => 
  import("@/pages/KnowledgeBasePage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading knowledge base page")
  }))
);

export const ProfilePage = lazy(() => 
  import("@/pages/ProfilePage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading profile page")
  }))
);

export const NotFoundPage = lazy(() => 
  import("@/pages/NotFoundPage").catch(() => ({
    default: () => React.createElement("div", null, "Error loading 404 page")
  }))
);
