
export const ROLE_LABELS: Record<string, string> = {
  CONTRACT_SPECIALIST: "Contract Specialist",
  CONTRACTING_OFFICER: "Contracting Officer",
  PROGRAM_MANAGER: "Program Manager",
  LEGAL_REVIEWER: "Legal Reviewer",
  SMALL_BUSINESS_SPECIALIST: "Small Business Specialist",
  COST_PRICE_ANALYST: "Cost/Price Analyst",
  QUALITY_ASSURANCE: "Quality Assurance Specialist"
};

export const AGENCY_LABELS: Record<string, string> = {
  DFARS: "Defense Federal Acquisition Regulation Supplement",
  GSARS: "General Services Administration Acquisition Regulation",
  HHSARS: "Health and Human Services Acquisition Regulation",
  DEARS: "Department of Energy Acquisition Regulation",
  DOSAR: "Department of State Acquisition Regulation",
  AIDAR: "Agency for International Development Acquisition Regulation",
  DLAD: "Defense Logistics Acquisition Directive",
  NMCARS: "Navy Marine Corps Acquisition Regulation Supplement",
  AFFARS: "Air Force Federal Acquisition Regulation Supplement",
  EPAAR: "Environmental Protection Agency Acquisition Regulation",
  FEHBAR: "Federal Employees Health Benefits Acquisition Regulation",
  HUDAR: "Department of Housing and Urban Development Acquisition Regulation",
  IAAR: "Interior Acquisition Regulation",
  JAR: "Justice Acquisition Regulation",
  LIFAR: "Life Insurance Federal Acquisition Regulation",
  NFS: "NASA FAR Supplement",
  NRCAR: "Nuclear Regulatory Commission Acquisition Regulation",
  TAR: "Treasury Acquisition Regulation",
  VAAR: "Veterans Affairs Acquisition Regulation",
  DTAR: "Department of Transportation Acquisition Regulation",
  AGAR: "Agriculture Acquisition Regulation",
  CAR: "Commerce Acquisition Regulation",
  DEAR: "Department of Education Acquisition Regulation",
  DIARS: "Defense Intelligence Agency Regulation",
  DOIAR: "Department of Interior Acquisition Regulation",
  DOLAR: "Department of Labor Acquisition Regulation",
  EDAR: "Department of Education Acquisition Regulation"
};

export const DETAIL_LEVELS = {
  BRIEF: "Brief (3-6 lines)",
  STANDARD: "Standard (1 page report)",
  COMPREHENSIVE: "Comprehensive (Detailed with citations)",
} as const;
