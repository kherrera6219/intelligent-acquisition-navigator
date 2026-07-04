import { toast } from "@/hooks/use-toast";
import { errorTracker } from "@/lib/security/errorTracking";
import {
  ComplianceRule,
  ComplianceCheck,
  ReasoningStep,
  ReasoningResult,
  Context,
  WorkflowState
} from "@/types/reasoning";
import {
  insertReasoningStep,
  insertComplianceCheck,
  insertReasoningResult,
  getReasoningSteps,
  getComplianceChecks
} from "./reasoningDb";
import { generateWithAI } from "./aiService";
import type { VectorMatch } from "@/services/rag/vectorStore";

interface AnalysisHistoryEntry {
  timestamp: string;
  state: WorkflowState;
  action: string;
  data: Record<string, unknown>;
  session_id: string;
}

interface StepTemplate {
  step: number;
  description: string;
}

export class ReasoningEngine {
  private complianceRules: Record<string, ComplianceRule>;
  private apiKey: string;
  private currentState: WorkflowState;
  private analysisHistory: AnalysisHistoryEntry[];
  private sessionId: string;

  constructor(complianceRules: Record<string, ComplianceRule>, apiKey: string) {
    this.complianceRules = complianceRules;
    this.apiKey = apiKey;
    this.currentState = WorkflowState.QUERY_PARSING;
    this.analysisHistory = [];
    this.sessionId = `session_${new Date().toISOString()}`;
  }

  public async processReasoning(
    retrievalResults: VectorMatch[],
    context: Context
  ): Promise<ReasoningResult> {
    try {
      const reasoningStepIds = await this.applyReasoningSteps(
        retrievalResults,
        context
      );

      const complianceCheckIds = await this.validateCompliance(
        reasoningStepIds,
        retrievalResults
      );

      const { conclusion, confidence } = await this.synthesizeConclusion(
        reasoningStepIds,
        complianceCheckIds,
        context
      );

      const result: Omit<ReasoningResult, 'id'> = {
        conclusion,
        confidence_score: confidence,
        reasoning_steps: reasoningStepIds,
        compliance_checks: complianceCheckIds,
        supporting_evidence: [],
        metadata: {
          timestamp: new Date().toISOString(),
          reasoning_type: context.reasoning_type ?? 'general',
          user_role: context.user_role ?? 'general',
          domain: context.domain ?? 'general'
        }
      };

      return await insertReasoningResult(result, reasoningStepIds, complianceCheckIds);

    } catch (error) {
      errorTracker.trackError({
        message: error instanceof Error ? error.message : 'Reasoning process failed',
        stack: error instanceof Error ? error.stack : undefined,
        severity: 'HIGH',
        errorType: 'APPLICATION',
        status: 'NEW',
      });
      toast({
        title: "Reasoning Process Error",
        description: "An error occurred during the reasoning process. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }

  private async applyReasoningSteps(
    retrievalResults: VectorMatch[],
    context: Context
  ): Promise<string[]> {
    const stepIds: string[] = [];
    const template = this.getReasoningTemplate(context.reasoning_type ?? 'general');

    for (const stepTemplate of template) {
      const prompt = this.createStepPrompt(stepTemplate, retrievalResults, context);
      const response = await generateWithAI(prompt, this.apiKey);

      const step: Omit<ReasoningStep, 'id'> = {
        step_id: `step_${stepIds.length + 1}`,
        description: stepTemplate.description,
        inputs: retrievalResults as unknown as import("@/integrations/supabase/types").Json[],
        logic_applied: response,
        output: response,
        confidence_score: this.extractConfidenceFromResponse(response),
        supporting_evidence: [],
        metadata: {
          template_step: stepTemplate.step,
          timestamp: new Date().toISOString()
        }
      };

      const stepId = await insertReasoningStep(step);
      stepIds.push(stepId);
    }

    return stepIds;
  }

  private async validateCompliance(
    reasoningStepIds: string[],
    retrievalResults: VectorMatch[]
  ): Promise<string[]> {
    const checkIds: string[] = [];

    for (const [ruleId, rule] of Object.entries(this.complianceRules)) {
      const prompt = this.createCompliancePrompt(rule, retrievalResults);
      const response = await generateWithAI(prompt, this.apiKey);

      const check: Omit<ComplianceCheck, 'id'> = {
        rule_id: ruleId,
        description: rule.description,
        status: this.parseComplianceStatus(response),
        severity: rule.severity,
        evidence: [],
        confidence_score: this.extractConfidenceFromResponse(response),
        metadata: {
          timestamp: new Date().toISOString(),
          reasoning_step_count: reasoningStepIds.length,
        }
      };

      const checkId = await insertComplianceCheck(check);
      checkIds.push(checkId);
    }

    return checkIds;
  }

  private async synthesizeConclusion(
    reasoningStepIds: string[],
    complianceCheckIds: string[],
    context: Context
  ): Promise<{ conclusion: string; confidence: number }> {
    const steps = await getReasoningSteps(reasoningStepIds);
    const checks = await getComplianceChecks(complianceCheckIds);

    const prompt = this.createConclusionPrompt(steps, checks, context);
    const response = await generateWithAI(prompt, this.apiKey);

    return {
      conclusion: response,
      confidence: this.extractConfidenceFromResponse(response)
    };
  }

  private getReasoningTemplate(type: string): StepTemplate[] {
    switch (type) {
      case 'analytical':
        return [
          { step: 1, description: "Define the problem or question." },
          { step: 2, description: "Gather all relevant information and data." },
          { step: 3, description: "Analyze the information to identify key components and relationships." },
          { step: 4, description: "Develop a hypothesis or potential solution." },
          { step: 5, description: "Test the hypothesis or solution against the data." },
          { step: 6, description: "Draw a conclusion based on the analysis." }
        ];
      case 'inductive':
        return [
          { step: 1, description: "Observe specific instances or examples." },
          { step: 2, description: "Identify patterns or regularities in the observations." },
          { step: 3, description: "Formulate a general hypothesis or rule based on the patterns." },
          { step: 4, description: "Test the hypothesis with new observations." },
          { step: 5, description: "Refine the hypothesis based on the test results." }
        ];
      case 'deductive':
        return [
          { step: 1, description: "Start with a general premise or rule." },
          { step: 2, description: "Apply the premise to a specific case." },
          { step: 3, description: "Draw a logical conclusion based on the premise and the specific case." }
        ];
      default:
        return [
          { step: 1, description: "Analyze available information." },
          { step: 2, description: "Identify key insights and patterns." },
          { step: 3, description: "Form conclusions based on evidence." }
        ];
    }
  }

  private createStepPrompt(
    template: StepTemplate,
    retrievalResults: VectorMatch[],
    context: Context
  ): string {
    const contextText = retrievalResults
      .map((r) => r.metadata.text)
      .filter(Boolean)
      .join('\n\n');

    return `
Execute the following reasoning step for a federal acquisition scenario:

Step ${template.step}: ${template.description}

Retrieved Knowledge:
${contextText || 'No RAG context available — use general FAR/DFARS knowledge.'}

Acquisition Context:
${JSON.stringify(context, null, 2)}

Provide a detailed analysis and conclusion for this step, citing applicable FAR clauses where relevant.
    `.trim();
  }

  private createCompliancePrompt(rule: ComplianceRule, retrievalResults: VectorMatch[]): string {
    const contextText = retrievalResults
      .map((r) => r.metadata.text)
      .filter(Boolean)
      .join('\n\n');

    return `
Evaluate compliance with the following acquisition rule:

Rule: ${rule.description}
Criteria: ${rule.validation_logic}

Retrieved Evidence:
${contextText || 'No RAG context available — use general FAR/DFARS knowledge.'}

Determine if the evidence complies with the rule and provide a detailed explanation citing specific FAR/DFARS clauses.
    `.trim();
  }

  private createConclusionPrompt(
    steps: ReasoningStep[],
    checks: ComplianceCheck[],
    context: Context
  ): string {
    return `
Synthesize a final acquisition guidance conclusion based on:

Reasoning Steps:
${JSON.stringify(steps, null, 2)}

Compliance Checks:
${JSON.stringify(checks, null, 2)}

Context:
${JSON.stringify(context, null, 2)}

Provide a clear and concise conclusion that incorporates the reasoning steps and compliance results.
Include specific FAR/DFARS citations and actionable next steps for the contracting professional.
    `.trim();
  }

  private parseComplianceStatus(response: string): 'passed' | 'failed' | 'warning' {
    const lower = response.toLowerCase();
    if (lower.includes('fail') || lower.includes('non-compliant') || lower.includes('violation')) {
      return 'failed';
    }
    if (lower.includes('warn') || lower.includes('caution') || lower.includes('risk')) {
      return 'warning';
    }
    // Fail closed: only report "passed" when the model response contains an
    // explicit, unambiguous compliance signal. Ambiguous or unrecognized
    // responses default to "warning" (flagged for human review) rather than
    // silently passing — defaulting to success on unclear output would
    // undermine a FAR/DFARS compliance check.
    if (lower.includes('pass') || lower.includes('compliant') || lower.includes('approved')) {
      return 'passed';
    }
    return 'warning';
  }

  /** Attempts to extract a confidence score from the model response text (0–1). */
  private extractConfidenceFromResponse(response: string): number {
    const match = response.match(/confidence[:\s]+([0-9.]+)/i);
    if (match) {
      const val = parseFloat(match[1]);
      if (!isNaN(val)) return Math.min(Math.max(val > 1 ? val / 100 : val, 0), 1);
    }
    return 0.75;
  }

  private addToHistory(action: string, data: Record<string, unknown>): void {
    this.analysisHistory.push({
      timestamp: new Date().toISOString(),
      state: this.currentState,
      action,
      data,
      session_id: this.sessionId
    });
  }
}
