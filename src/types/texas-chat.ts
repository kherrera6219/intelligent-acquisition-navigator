
import { Json } from "@/integrations/supabase/types";

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

export type ResponseLevel =
  | "BRIEF"
  | "STANDARD"
  | "COMPREHENSIVE";

export interface TexasMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  agencyType: TexasAgencyType;
  userRole: TexasRole;
  responseLevel?: ResponseLevel;
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

export const RESPONSE_LEVEL_LABELS: Record<ResponseLevel, string> = {
  BRIEF: "Brief (3-6 lines)",
  STANDARD: "Standard (1 page report)",
  COMPREHENSIVE: "Comprehensive (3 page report)"
};

export interface ValidationResult {
  id: string;
  message_id: string;
  status: 'pending' | 'valid' | 'invalid' | 'needs_review';
  confidence_score: number;
  validation_data?: Json | null;
  validation_notes?: string | null;
  created_at: string;
  updated_at: string;
  validated_by?: string | null;
}
