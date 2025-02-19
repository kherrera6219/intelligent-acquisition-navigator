
import { AIChatMessage, Message } from "./chat";

export type TexasAgencyType = 
  | "TEXAS_GOVERNMENT"
  | "TEXAS_EDUCATION"
  | "TEXAS_HEALTHCARE";

export type TexasRole =
  | "CONTRACTING_OFFICER"
  | "SOURCE_SELECTION_AUTHORITY"
  | "TECHNICAL_EVALUATION_PANEL"
  | "COST_PRICE_ANALYST"
  | "LEGAL_COMPLIANCE_ADVISOR"
  | "PAST_PERFORMANCE_EVALUATOR"
  | "SMALL_BUSINESS_LIAISON"
  | "PROPOSAL_REVIEW_STAFF"
  | "PROTEST_APPEALS_OFFICER";

export interface TexasMessage extends Message {
  agencyType: TexasAgencyType;
  userRole: TexasRole;
}

export const TEXAS_AGENCY_LABELS: Record<TexasAgencyType, string> = {
  TEXAS_GOVERNMENT: "Texas State Government",
  TEXAS_EDUCATION: "Texas Education System",
  TEXAS_HEALTHCARE: "Texas Healthcare System"
};

export const TEXAS_ROLE_LABELS: Record<TexasRole, string> = {
  CONTRACTING_OFFICER: "Contracting Officer (CO) / Procurement Officer",
  SOURCE_SELECTION_AUTHORITY: "Source Selection Authority (SSA)",
  TECHNICAL_EVALUATION_PANEL: "Technical Evaluation Panel (TEP) / SSEB",
  COST_PRICE_ANALYST: "Cost/Price Analyst",
  LEGAL_COMPLIANCE_ADVISOR: "Legal/Compliance Advisor",
  PAST_PERFORMANCE_EVALUATOR: "Past Performance Evaluator",
  SMALL_BUSINESS_LIAISON: "Small Business Liaison / Socioeconomic Compliance Officer",
  PROPOSAL_REVIEW_STAFF: "Proposal Review Support Staff",
  PROTEST_APPEALS_OFFICER: "Protest and Appeals Officer"
};
