
import { getAICompletion } from "@/services/azure/aiService";
import { toast } from "@/components/ui/use-toast";

export interface MasterLLMResponse {
  suggestion: string;
  confidence: number;
  reasoning: string;
}

const MASTER_SYSTEM_PROMPT = `You are the Master LLM orchestrator for the Intelligent Acquisition Navigator,
a federal procurement advisory system. Your role is to analyze acquisition queries and produce structured
guidance for contracting professionals.

Given a user's acquisition query, respond with a JSON object containing:
- suggestion: A clear, actionable recommendation (string)
- confidence: Your confidence level from 0 to 1 (number)
- reasoning: A concise explanation of why this recommendation was made (string)

Always base recommendations on FAR/DFARS requirements. Be specific about applicable regulations.
Respond ONLY with valid JSON.`;

export const processMasterLLM = async (input: string): Promise<MasterLLMResponse> => {
  const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY as string;
  if (!apiKey) {
    throw new Error('Azure OpenAI API key (VITE_AZURE_OPENAI_API_KEY) is not configured');
  }

  try {
    const response = await getAICompletion(
      [
        { role: "system", content: MASTER_SYSTEM_PROMPT },
        { role: "user", content: input },
      ],
      apiKey
    );

    const raw = response.choices[0]?.message?.content ?? '{}';

    try {
      const parsed = JSON.parse(raw) as MasterLLMResponse;
      return {
        suggestion: parsed.suggestion ?? raw,
        confidence: typeof parsed.confidence === 'number' ? Math.min(Math.max(parsed.confidence, 0), 1) : 0.75,
        reasoning: parsed.reasoning ?? '',
      };
    } catch {
      // If the model didn't return valid JSON, treat the full text as the suggestion
      return {
        suggestion: raw,
        confidence: 0.70,
        reasoning: 'Direct response from acquisition AI model.',
      };
    }
  } catch (error) {
    toast({
      title: "Error processing Master LLM request",
      description: "Please try again later",
      variant: "destructive",
    });
    throw error;
  }
};
