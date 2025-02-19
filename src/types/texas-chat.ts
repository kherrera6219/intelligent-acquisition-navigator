
import { AIChatMessage, Message } from "./chat";

export type TexasAgencyType = 
  | "TEXAS_GOVERNMENT"
  | "TEXAS_EDUCATION"
  | "TEXAS_HEALTHCARE";

export interface TexasMessage extends Message {
  agencyType?: TexasAgencyType;
}

export const TEXAS_AGENCY_LABELS: Record<TexasAgencyType, string> = {
  TEXAS_GOVERNMENT: "Texas State Government",
  TEXAS_EDUCATION: "Texas Education System",
  TEXAS_HEALTHCARE: "Texas Healthcare System"
};
