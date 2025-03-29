
import { TexasAgencyType, TexasRole, ResponseLevel, RESPONSE_LEVEL_LABELS } from "@/types/texas-chat";
import { AIChatMessage } from "@/types/chat";

/**
 * Builds the system context message for the Texas Acquisition AI assistant
 */
export const buildTexasAIContext = (
  agency: TexasAgencyType,
  role: TexasRole,
  responseLevel: ResponseLevel
): string => {
  return `You are a procurement expert for the ${agency.replace('_', ' ').toLowerCase()} sector, 
          specifically assisting a ${role.replace('_', ' ').toLowerCase()}. 
          Please provide a ${responseLevel.toLowerCase()} response that is appropriate for a ${RESPONSE_LEVEL_LABELS[responseLevel].toLowerCase()}.
          Provide guidance specific to Texas state regulations and requirements.`;
};

/**
 * Prepares the complete message array for the AI, including system context and conversation history
 */
export const prepareTexasAIMessages = (
  messages: any[],
  currentInput: string,
  agency: TexasAgencyType,
  role: TexasRole,
  responseLevel: ResponseLevel
): AIChatMessage[] => {
  return [
    { 
      role: "system", 
      content: buildTexasAIContext(agency, role, responseLevel) 
    },
    ...messages.map(msg => ({ 
      role: msg.role as "user" | "assistant", 
      content: msg.content 
    })),
    { 
      role: "user", 
      content: currentInput.trim() 
    }
  ];
};
