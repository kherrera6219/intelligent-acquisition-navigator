
import { supabase } from "@/integrations/supabase/client";
import { ComplianceCheck, ReasoningStep, ReasoningResult } from "@/types/reasoning";
import { Json } from "@/integrations/supabase/types";

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
    console.error('Error inserting reasoning step:', error);
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
    console.error('Error inserting compliance check:', error);
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
    console.error('Error inserting reasoning result:', resultError);
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
    console.error('Error inserting step relations:', stepsError);
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
    console.error('Error inserting check relations:', checksError);
    throw checksError;
  }

  return {
    conclusion: resultData.conclusion,
    confidence_score: resultData.confidence_score,
    reasoning_steps: stepIds,
    compliance_checks: checkIds,
    supporting_evidence: (resultData.supporting_evidence as Json[] || []).map(item => 
      typeof item === 'string' ? JSON.parse(item) : item
    ),
    metadata: resultData.metadata as Record<string, any> | undefined
  };
}

export async function getReasoningSteps(stepIds: string[]): Promise<any[]> {
  const { data, error } = await supabase
    .from('reasoning_steps')
    .select('*')
    .in('id', stepIds);

  if (error) {
    console.error('Error fetching reasoning steps:', error);
    throw error;
  }

  return data || [];
}

export async function getComplianceChecks(checkIds: string[]): Promise<any[]> {
  const { data, error } = await supabase
    .from('compliance_checks')
    .select('*')
    .in('id', checkIds);

  if (error) {
    console.error('Error fetching compliance checks:', error);
    throw error;
  }

  return data || [];
}
