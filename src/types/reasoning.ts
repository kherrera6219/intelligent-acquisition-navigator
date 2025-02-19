import { Json } from "@/integrations/supabase/types";

export interface ComplianceRule {
  id: string;
  description: string;
  severity: number;
  validation_logic: string;
  criteria?: string; // Added criteria as optional property
}

export interface ComplianceCheck {
  id: string;
  rule_id: string;
  description: string;
  status: 'passed' | 'failed' | 'warning';
  severity: number;
  evidence: Json[];
  confidence_score: number;
  metadata?: Record<string, any>;
}

export interface ReasoningStep {
  id: string;
  step_id: string;
  description: string;
  inputs: Json[];
  logic_applied: string;
  output: string;
  confidence_score: number;
  supporting_evidence: Json[];
  metadata?: Record<string, any>;
}

export interface ReasoningResult {
  id?: string;
  conclusion: string;
  confidence_score: number;
  reasoning_steps: string[];
  compliance_checks: string[];
  supporting_evidence: Json[];
  metadata?: Record<string, any>;
}

export interface Context {
  reasoning_type?: string;
  user_role?: string;
  domain?: string;
  [key: string]: any;
}

export enum WorkflowState {
  QUERY_PARSING = 'QUERY_PARSING',
  REASONING = 'REASONING',
  COMPLIANCE_CHECK = 'COMPLIANCE_CHECK',
  CONCLUSION = 'CONCLUSION'
}
