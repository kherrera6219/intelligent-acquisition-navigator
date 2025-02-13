
export type AcquisitionRole = 
  | "CONTRACT_SPECIALIST"
  | "CONTRACTING_OFFICER"
  | "PROGRAM_MANAGER"
  | "LEGAL_REVIEWER"
  | "SMALL_BUSINESS_SPECIALIST"
  | "COST_PRICE_ANALYST"
  | "QUALITY_ASSURANCE";

export type AgencyRegulation =
  | "DFARS"
  | "GSARS"
  | "HHSARS"
  | "DEARS"
  | "DOSAR"
  | "AIDAR"
  | "DLAD"
  | "NMCARS"
  | "AFFARS"
  | "EPAAR"
  | "FEHBAR"
  | "HUDAR"
  | "IAAR"
  | "JAR"
  | "LIFAR"
  | "NFS"
  | "NRCAR"
  | "TAR"
  | "VAAR"
  | "DTAR"
  | "AGAR"
  | "CAR"
  | "DEAR"
  | "DIARS"
  | "DOIAR"
  | "DOLAR"
  | "EDAR";

export type DetailLevel = "BRIEF" | "STANDARD" | "COMPREHENSIVE";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  userRole?: string;
  agencyRegulation?: string;
  detailLevel?: string;
}
