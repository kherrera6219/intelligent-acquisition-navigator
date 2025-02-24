
import { lazy } from "react";
import React from "react";

// Lazy-loaded pages with comprehensive error handling
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
