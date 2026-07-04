
import { getAICompletion } from "@/services/ai/aiService";
import { toast } from "@/components/ui/use-toast";

export interface ComplianceCheck {
  approved: boolean;
  reason: string;
  riskLevel: 'low' | 'medium' | 'high';
  suggestions?: string[];
}

const COMPLIANCE_SYSTEM_PROMPT = `You are a federal acquisition compliance expert specializing in FAR,
DFARS, and agency-specific supplements. Your role is to evaluate acquisition decisions and documents
for regulatory compliance.

Given an acquisition suggestion or document excerpt, evaluate it for FAR/DFARS compliance and respond
with a JSON object containing:
- approved: Whether the item passes compliance review (boolean)
- reason: A clear explanation of the compliance status, citing specific FAR/DFARS clauses (string)
- riskLevel: Compliance risk level — "low", "medium", or "high" (string)
- suggestions: Array of specific corrective actions if needed (string[])

Be conservative: flag anything that could be non-compliant as medium or high risk.
Respond ONLY with valid JSON.`;

export const checkCompliance = async (suggestion: string): Promise<ComplianceCheck> => {
  try {
    const response = await getAICompletion(
      [
        { role: "system", content: COMPLIANCE_SYSTEM_PROMPT },
        { role: "user", content: `Evaluate compliance for the following:\n\n${suggestion}` },
      ],
      undefined
    );

    const raw = response.choices[0]?.message?.content ?? '{}';

    try {
      const parsed = JSON.parse(raw) as ComplianceCheck;
      const validRiskLevel = ['low', 'medium', 'high'].includes(parsed.riskLevel);
      // Fail closed: if the model's response is missing or mistypes the
      // `approved` field, treat it as NOT approved rather than defaulting to
      // success. For a FAR/DFARS compliance gate, defaulting to "approved" on
      // ambiguous/malformed model output would silently defeat the purpose
      // of the check.
      const approvedFieldPresent = typeof parsed.approved === 'boolean';
      return {
        approved: approvedFieldPresent ? parsed.approved : false,
        reason: parsed.reason ?? (
          approvedFieldPresent
            ? 'Compliance review completed.'
            : 'Compliance response was missing a clear approval determination. Manual review required.'
        ),
        riskLevel: validRiskLevel ? parsed.riskLevel : 'high',
        suggestions: Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0
          ? parsed.suggestions
          : (approvedFieldPresent ? [] : ['Perform manual compliance review before proceeding.']),
      };
    } catch {
      return {
        approved: false,
        reason: 'Unable to parse compliance response. Manual review required.',
        riskLevel: 'high',
        suggestions: ['Perform manual compliance review before proceeding.'],
      };
    }
  } catch (error) {
    toast({
      title: "Error checking compliance",
      description: "Please try again later",
      variant: "destructive",
    });
    throw error;
  }
};
