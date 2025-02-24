
import { lazy } from "react";

// Lazy-loaded pages with comprehensive error handling
export const DashboardPage = lazy(() => 
  import("@/pages/DashboardPage").catch(() => {
    console.error("Failed to load DashboardPage");
    return { default: () => <div>Error loading dashboard</div> };
  })
);

export const DocumentControlPage = lazy(() => 
  import("@/pages/acquisition/DocumentControlPage").catch(() => {
    console.error("Failed to load DocumentControlPage");
    return { default: () => <div>Error loading document control</div> };
  })
);

export const MarketResearchPage = lazy(() => 
  import("@/pages/acquisition/MarketResearchPage").catch(() => {
    console.error("Failed to load MarketResearchPage");
    return { default: () => <div>Error loading market research</div> };
  })
);

export const SolicitationReviewPage = lazy(() => 
  import("@/pages/acquisition/SolicitationReviewPage").catch(() => {
    console.error("Failed to load SolicitationReviewPage");
    return { default: () => <div>Error loading solicitation review</div> };
  })
);

export const TexasAcquisitionPage = lazy(() => 
  import("@/pages/TexasAcquisitionPage").catch(() => {
    console.error("Failed to load TexasAcquisitionPage");
    return { default: () => <div>Error loading Texas acquisition</div> };
  })
);

export const FederalAcquisitionPage = lazy(() => 
  import("@/pages/acquisition/FederalAcquisitionPage").catch(() => {
    console.error("Failed to load FederalAcquisitionPage");
    return { default: () => <div>Error loading federal acquisition</div> };
  })
);

export const AuthPage = lazy(() => 
  import("@/pages/auth/AuthenticationPage").catch(() => {
    console.error("Failed to load AuthenticationPage");
    return { default: () => <div>Error loading authentication</div> };
  })
);

export const AnalyticsPage = lazy(() => 
  import("@/pages/AnalyticsPage").catch(() => {
    console.error("Failed to load AnalyticsPage");
    return { default: () => <div>Error loading analytics</div> };
  })
);
