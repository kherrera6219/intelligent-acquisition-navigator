
import { supabase } from "@/integrations/supabase/client";
import { ComplianceCheck, ReasoningStep, ReasoningResult } from "@/types/reasoning";
import { Json } from "@/integrations/supabase/types";
import { errorTracker } from "@/lib/security/errorTracking";

const trackReasoningDbError = (message: string, error: Error) => {
  errorTracker.trackError({
    message: `${message}: ${error.message}`,
    stack: error.stack,
    severity: 'HIGH',
    errorType: 'SYSTEM',
    status: 'NEW',
  });
};

export async function insertReasoningStep(step: Omit<ReasoningStep, 'id'>): Promise<string> {
  const { data, error } = await supabase
    .from('reasoning_steps')
    .insert([{
      ...step,
      inputs: step.inputs as Json,
      supporting_evidence: step.supporting_evidence as Json
    }])
    .select('id')
    .single();

  if (error) {
    trackReasoningDbError('Error inserting reasoning step', error);
    throw error;
  }

  return data.id;
}

export async function insertComplianceCheck(check: Omit<ComplianceCheck, 'id'>): Promise<string> {
  const { data, error } = await supabase
    .from('compliance_checks')
    .insert([{
      ...check,
      evidence: check.evidence as Json
    }])
    .select('id')
    .single();

  if (error) {
    trackReasoningDbError('Error inserting compliance check', error);
    throw error;
  }

  return data.id;
}

export async function insertReasoningResult(
  result: Omit<ReasoningResult, 'id'>,
  stepIds: string[],
  checkIds: string[]
): Promise<ReasoningResult> {
  const { data: resultData, error: resultError } = await supabase
    .from('reasoning_results')
    .insert([{
      conclusion: result.conclusion,
      confidence_score: result.confidence_score,
      supporting_evidence: result.supporting_evidence as Json,
      metadata: result.metadata
    }])
    .select()
    .single();

  if (resultError) {
    trackReasoningDbError('Error inserting reasoning result', resultError);
    throw resultError;
  }

  // Insert step relationships
  const stepRelations = stepIds.map(stepId => ({
    result_id: resultData.id,
    step_id: stepId
  }));

  const { error: stepsError } = await supabase
    .from('reasoning_result_steps')
    .insert(stepRelations);

  if (stepsError) {
    trackReasoningDbError('Error inserting step relations', stepsError);
    throw stepsError;
  }

  // Insert check relationships
  const checkRelations = checkIds.map(checkId => ({
    result_id: resultData.id,
    check_id: checkId
  }));

  const { error: checksError } = await supabase
    .from('reasoning_result_checks')
    .insert(checkRelations);

  if (checksError) {
    trackReasoningDbError('Error inserting check relations', checksError);
    throw checksError;
  }

  return {
    conclusion: resultData.conclusion,
    confidence_score: resultData.confidence_score,
    reasoning_steps: stepIds,
    compliance_checks: checkIds,
    supporting_evidence: (resultData.supporting_evidence as Json[] || []).map(item => {
      if (typeof item !== 'string') {
        return item;
      }
      try {
        return JSON.parse(item);
      } catch {
        // Not all evidence strings are guaranteed to be JSON (e.g. plain-text
        // citations) — fall back to the raw string rather than throwing and
        // surfacing a generic error for what is recoverable data.
        return item;
      }
    }),
    metadata: resultData.metadata as Record<string, unknown> | undefined
  };
}

export async function getReasoningSteps(stepIds: string[]): Promise<ReasoningStep[]> {
  const { data, error } = await supabase
    .from('reasoning_steps')
    .select('*')
    .in('id', stepIds);

  if (error) {
    trackReasoningDbError('Error fetching reasoning steps', error);
    throw error;
  }

  return (data || []) as unknown as ReasoningStep[];
}

export async function getComplianceChecks(checkIds: string[]): Promise<ComplianceCheck[]> {
  const { data, error } = await supabase
    .from('compliance_checks')
    .select('*')
    .in('id', checkIds);

  if (error) {
    trackReasoningDbError('Error fetching compliance checks', error);
    throw error;
  }

  return (data || []) as unknown as ComplianceCheck[];
}
