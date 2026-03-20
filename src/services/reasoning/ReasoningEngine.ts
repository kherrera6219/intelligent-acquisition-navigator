import { toast } from "@/hooks/use-toast";
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

export class ReasoningEngine {
  private complianceRules: Record<string, ComplianceRule>;
  private currentState: WorkflowState;
  private analysisHistory: any[];
  private sessionId: string;

  constructor(complianceRules: Record<string, ComplianceRule>) {
    this.complianceRules = complianceRules;
    this.currentState = WorkflowState.QUERY_PARSING;
    this.analysisHistory = [];
    this.sessionId = `session_${new Date().toISOString()}`;
  }

  public async processReasoning(
    retrievalResults: any[],
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
          reasoning_type: context.reasoning_type || 'general',
          user_role: context.user_role || 'general',
          domain: context.domain || 'general'
        }
      };

      return await insertReasoningResult(result, reasoningStepIds, complianceCheckIds);

    } catch (error) {
      console.error('Error in reasoning process:', error);
      toast({
        title: "Reasoning Process Error",
        description: "An error occurred during the reasoning process. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }

  private async applyReasoningSteps(
    retrievalResults: any[],
    context: Context
  ): Promise<string[]> {
    const stepIds: string[] = [];
    const template = this.getReasoningTemplate(context.reasoning_type || 'general');

    for (const stepTemplate of template) {
      const prompt = this.createStepPrompt(stepTemplate, retrievalResults, context);
      const response = await generateWithAI(prompt);
      
      const step: Omit<ReasoningStep, 'id'> = {
        step_id: `step_${stepIds.length + 1}`,
        description: stepTemplate.description,
        inputs: retrievalResults,
        logic_applied: response,
        output: response,
        confidence_score: 0.85, // Default confidence, could be extracted from AI response
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
    retrievalResults: any[]
  ): Promise<string[]> {
    const checkIds: string[] = [];

    for (const [ruleId, rule] of Object.entries(this.complianceRules)) {
      const prompt = this.createCompliancePrompt(rule, retrievalResults);
      const response = await generateWithAI(prompt);
      
      const check: Omit<ComplianceCheck, 'id'> = {
        rule_id: ruleId,
        description: rule.description,
        status: this.parseComplianceStatus(response),
        severity: rule.severity,
        evidence: [],
        confidence_score: 0.85, // Default confidence, could be extracted from AI response
        metadata: {
          timestamp: new Date().toISOString()
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
    const response = await generateWithAI(prompt);

    return {
      conclusion: response,
      confidence: 0.85 // Default confidence, could be extracted from AI response
    };
  }

  private getReasoningTemplate(type: string): Array<{ step: number; description: string }> {
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
    template: { step: number; description: string },
    retrievalResults: any[],
    context: Context
  ): string {
    return `
Execute the following reasoning step:

Step ${template.step}: ${template.description}

Available Information:
${JSON.stringify(retrievalResults, null, 2)}

Context:
${JSON.stringify(context, null, 2)}

Provide a detailed analysis and conclusion for this step.
    `.trim();
  }

  private createCompliancePrompt(rule: ComplianceRule, retrievalResults: any[]): string {
    return `
Evaluate compliance with the following rule:

Rule: ${rule.description}
Criteria: ${rule.criteria}

Evidence:
${JSON.stringify(retrievalResults, null, 2)}

Determine if the evidence complies with the rule and provide a detailed explanation.
    `.trim();
  }

  private createConclusionPrompt(
    steps: any[],
    checks: any[],
    context: Context
  ): string {
    return `
Synthesize a final conclusion based on:

Reasoning Steps:
${JSON.stringify(steps, null, 2)}

Compliance Checks:
${JSON.stringify(checks, null, 2)}

Context:
${JSON.stringify(context, null, 2)}

Provide a clear and concise conclusion that incorporates the reasoning steps and compliance results.
    `.trim();
  }

  private parseComplianceStatus(response: string): 'passed' | 'failed' | 'warning' {
    // In a real implementation, we would parse the AI response more carefully
    if (response.toLowerCase().includes('fail')) return 'failed';
    if (response.toLowerCase().includes('warn')) return 'warning';
    return 'passed';
  }

  private addToHistory(action: string, data: Record<string, any>): void {
    this.analysisHistory.push({
      timestamp: new Date().toISOString(),
      state: this.currentState,
      action,
      data,
      session_id: this.sessionId
    });
  }
}
