
import { getAICompletion } from "@/services/azure/aiService";

export async function generateWithAI(prompt: string): Promise<string> {
  try {
    const response = await getAICompletion([{ role: 'user', content: prompt }]);
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate AI response');
  }
}
