
import { toast } from "@/hooks/use-toast";
import { getAICompletion } from "@/services/azure/aiService";

export interface MasterLLMResponse {
  suggestion: string;
  confidence: number;
  reasoning: string;
}

const MASTER_LLM_SYSTEM_PROMPT = `You are a master AI orchestrator for a federal acquisition workflow system.
Analyze the input and provide a structured response in JSON format only:
{
  "suggestion": "your primary recommendation or action",
  "confidence": 0.0 to 1.0,
  "reasoning": "brief explanation of your reasoning"
}`;

export const processMasterLLM = async (input: string): Promise<MasterLLMResponse> => {
  try {
    const response = await getAICompletion([
      { role: 'system', content: MASTER_LLM_SYSTEM_PROMPT },
      { role: 'user', content: input },
    ]);

    const content = response.choices[0]?.message?.content || '';

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          suggestion: String(parsed.suggestion || content),
          confidence: Math.min(Math.max(Number(parsed.confidence) || 0.8, 0), 1),
          reasoning: String(parsed.reasoning || 'Based on analysis of the provided input'),
        };
      } catch {
        // Fall through to text-based response
      }
    }

    return {
      suggestion: content,
      confidence: 0.8,
      reasoning: 'Based on analysis of the provided input',
    };
  } catch (error) {
    toast({
      title: "Error processing request",
      description: "Please try again later",
      variant: "destructive",
    });
    throw error;
  }
};
