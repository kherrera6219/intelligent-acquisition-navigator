
import { AIChatMessage, Message } from "./chat";

export type TexasAgencyType = 
  | "TEXAS_GOVERNMENT"
  | "TEXAS_EDUCATION"
  | "TEXAS_HEALTHCARE";

export type TexasRole =
  | "CONTRACT_OFFICER"
  | "PROGRAM_MANAGER"
  | "CONTRACT_SPECIALIST"
  | "CONTRACT_ANALYST";

export interface TexasMessage extends Message {
  agencyType?: TexasAgencyType;
  userRole?: TexasRole;
}

export const TEXAS_AGENCY_LABELS: Record<TexasAgencyType, string> = {
  TEXAS_GOVERNMENT: "Texas State Government",
  TEXAS_EDUCATION: "Texas Education System",
  TEXAS_HEALTHCARE: "Texas Healthcare System"
};

export const TEXAS_ROLE_LABELS: Record<TexasRole, string> = {
  CONTRACT_OFFICER: "Contracting Officer",
  PROGRAM_MANAGER: "Program Manager",
  CONTRACT_SPECIALIST: "Contract Specialist",
  CONTRACT_ANALYST: "Contract Analyst"
};
