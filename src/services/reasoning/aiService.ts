
import { getAICompletion } from "@/services/azure/aiService";

export async function generateWithAI(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await getAICompletion(
      [{ role: "system", content: prompt }],
      apiKey
    );
    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate AI response');
  }
}
