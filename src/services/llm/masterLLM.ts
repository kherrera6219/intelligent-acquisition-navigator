
import { z } from 'zod';
import { getAICompletion } from "@/services/azure/aiService";

export interface MasterLLMResponse {
  suggestion: string;
  confidence: number;
  reasoning: string;
}

const MasterLLMSchema = z.object({
  suggestion: z.string().min(1),
  confidence: z.number().min(0).max(1),
  reasoning: z.string().min(1),
});

const MASTER_LLM_SYSTEM_PROMPT = `You are a master AI orchestrator for a federal acquisition workflow system.
Analyze the input and respond with valid JSON only — no markdown, no explanation outside the JSON object:
{
  "suggestion": "your primary recommendation or action",
  "confidence": 0.0,
  "reasoning": "brief explanation of your reasoning"
}`;

export const processMasterLLM = async (input: string): Promise<MasterLLMResponse> => {
  const response = await getAICompletion([
    { role: 'system', content: MASTER_LLM_SYSTEM_PROMPT },
    { role: 'user', content: input },
  ]);

  const content = response.choices[0]?.message?.content || '';

  // Extract JSON block (strip any accidental markdown fences)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed: unknown = JSON.parse(jsonMatch[0]);
      const validated = MasterLLMSchema.parse(parsed);
      return validated;
    } catch {
      // Parsing or validation failed — fall through
    }
  }

  // Fallback: treat entire response as a suggestion with low confidence
  // so callers can decide whether to surface it to users
  return {
    suggestion: content.slice(0, 500),
    confidence: 0.4,
    reasoning: 'Response could not be parsed as structured JSON — manual review recommended.',
  };
};
