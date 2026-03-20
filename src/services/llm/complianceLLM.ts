
import { toast } from "@/hooks/use-toast";
import { getAICompletion } from "@/services/azure/aiService";

export interface ComplianceCheck {
  approved: boolean;
  reason: string;
  riskLevel: 'low' | 'medium' | 'high';
  suggestions?: string[];
}

const COMPLIANCE_SYSTEM_PROMPT = `You are a federal acquisition compliance expert.
Evaluate the provided suggestion for compliance with FAR/DFARS regulations and policies.
Respond in JSON format only:
{
  "approved": boolean,
  "reason": "concise explanation",
  "riskLevel": "low" | "medium" | "high",
  "suggestions": ["optional improvement suggestions"]
}`;

export const checkCompliance = async (suggestion: string): Promise<ComplianceCheck> => {
  try {
    const response = await getAICompletion([
      { role: 'system', content: COMPLIANCE_SYSTEM_PROMPT },
      { role: 'user', content: `Evaluate this acquisition suggestion for compliance:\n\n${suggestion}` },
    ]);

    const content = response.choices[0]?.message?.content || '';

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          approved: Boolean(parsed.approved),
          reason: String(parsed.reason || 'Compliance evaluation completed'),
          riskLevel: (['low', 'medium', 'high'].includes(parsed.riskLevel) ? parsed.riskLevel : 'medium') as 'low' | 'medium' | 'high',
          suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
        };
      } catch {
        // Fall through to text-based parsing
      }
    }

    // Fallback: text-based parsing
    const lowerContent = content.toLowerCase();
    const approved = !lowerContent.includes('not approved') && !lowerContent.includes('non-compliant') && !lowerContent.includes('violation');
    const riskLevel = lowerContent.includes('high risk') ? 'high' : lowerContent.includes('medium risk') ? 'medium' : 'low';

    return {
      approved,
      reason: content.slice(0, 300),
      riskLevel,
    };
  } catch (error) {
    toast({
      title: "Error checking compliance",
      description: "Please try again later",
      variant: "destructive",
    });
    throw error;
  }
};
