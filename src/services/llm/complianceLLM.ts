
import { z } from 'zod';
import { getAICompletion } from "@/services/azure/aiService";

export interface ComplianceCheck {
  approved: boolean;
  reason: string;
  riskLevel: 'low' | 'medium' | 'high';
  suggestions: string[];
  /** true when the AI response could not be structured — requires human review */
  requiresHumanReview?: boolean;
}

const ComplianceSchema = z.object({
  approved: z.boolean(),
  reason: z.string().min(1),
  riskLevel: z.enum(['low', 'medium', 'high']),
  suggestions: z.array(z.string()).default([]),
});

const COMPLIANCE_SYSTEM_PROMPT = `You are a federal acquisition compliance expert.
Evaluate the provided suggestion for compliance with FAR/DFARS regulations and policies.
Respond with valid JSON only — no markdown, no text outside the JSON object:
{
  "approved": true,
  "reason": "concise explanation referencing specific FAR/DFARS clauses",
  "riskLevel": "low",
  "suggestions": ["optional improvement suggestions"]
}`;

export const checkCompliance = async (suggestion: string): Promise<ComplianceCheck> => {
  const response = await getAICompletion([
    { role: 'system', content: COMPLIANCE_SYSTEM_PROMPT },
    { role: 'user', content: `Evaluate this acquisition suggestion for compliance:\n\n${suggestion}` },
  ]);

  const content = response.choices[0]?.message?.content || '';

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed: unknown = JSON.parse(jsonMatch[0]);
      const validated = ComplianceSchema.parse(parsed);
      return { ...validated, requiresHumanReview: false };
    } catch {
      // Parsing or Zod validation failed — do not guess compliance status
    }
  }

  // Cannot determine compliance from the response — flag for human review
  // rather than making an incorrect automated decision
  return {
    approved: false,
    reason: 'AI response could not be parsed. Human review required before proceeding.',
    riskLevel: 'high',
    suggestions: ['Review the solicitation manually against FAR Part 15 and applicable DFARS supplements.'],
    requiresHumanReview: true,
  };
};
