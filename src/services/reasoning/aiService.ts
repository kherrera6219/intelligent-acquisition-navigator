
import { getAICompletion } from "@/services/azure/aiService";
import { errorTracker } from "@/lib/security/errorTracking";

export async function generateWithAI(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await getAICompletion(
      [{ role: "system", content: prompt }],
      apiKey
    );
    return response.choices[0].message.content;
  } catch (error) {
    errorTracker.trackError({
      message: error instanceof Error ? error.message : 'AI generation error',
      stack: error instanceof Error ? error.stack : undefined,
      severity: 'HIGH',
      errorType: 'APPLICATION',
      status: 'NEW',
    });
    throw new Error('Failed to generate AI response');
  }
}
