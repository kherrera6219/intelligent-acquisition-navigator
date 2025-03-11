
import React, { useState, useEffect } from 'react';
import { TexasChatContainer } from '@/components/texas/TexasChatContainer';
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { getAzureOpenAICompletion } from '@/services/texas/azureOpenAIService';
import { v4 as uuidv4 } from 'uuid';
import { useNetworkOperation } from '@/hooks/useNetworkOperation';
import { NetworkErrorHandler } from '@/components/ui/universal/NetworkErrorHandler';
import { OfflineSyncStatus } from '@/components/ui/universal/OfflineSyncStatus';
import { useAuth } from '@/hooks/useAuth';
import { generateCsrfToken } from '@/utils/csrfProtection';
import { sanitizeHtml } from '@/utils/inputSanitization';
import { PageHeader } from '@/components/layout/PageHeader';
import { useToast } from '@/hooks/use-toast';

const TexasAcquisitionPage: React.FC = () => {
  const [messages, setMessages] = useState<TexasMessage[]>([]);
  const [input, setInput] = useState('');
  const [conversationId] = useState<string>(uuidv4());
  const [selectedAgency, setSelectedAgency] = useState<TexasAgencyType>('TEXAS_GOVERNMENT');
  const [selectedRole, setSelectedRole] = useState<TexasRole>('CONTRACTING_OFFICER');
  const [selectedResponseLevel, setSelectedResponseLevel] = useState<ResponseLevel>('STANDARD');
  const { executeOperation, isLoading, error, reset } = useNetworkOperation({
    maxRetries: 3,
    initialDelay: 1000,
    showToasts: true
  });
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Initialize CSRF token on mount
  useEffect(() => {
    generateCsrfToken();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't submit empty messages
    if (!input.trim()) return;
    
    // Sanitize input
    const sanitizedInput = sanitizeHtml(input);
    
    // Prepare user message
    const userMessage: TexasMessage = {
      id: uuidv4(),
      text: sanitizedInput,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    
    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Clear input field
    setInput('');
    
    // Reset any previous error
    reset();
    
    // Generate system prompt based on selected options
    const systemPrompt = `You are an AI assistant specializing in Texas government acquisition regulations. 
      You are currently working with a ${selectedRole} at a ${selectedAgency} agency. 
      Provide ${selectedResponseLevel.toLowerCase()} responses focused on procurement requirements.`;
    
    // Prepare messages for API
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: sanitizedInput }
    ];
    
    // Execute the API call with retry mechanism
    executeOperation(async () => {
      try {
        const response = await getAzureOpenAICompletion(apiMessages);
        
        if (response.choices && response.choices.length > 0) {
          const aiMessage: TexasMessage = {
            id: uuidv4(),
            text: response.choices[0].message.content,
            role: 'assistant',
            timestamp: new Date().toISOString(),
          };
          
          setMessages(prevMessages => [...prevMessages, aiMessage]);
        }
      } catch (error) {
        console.error('Error getting AI response:', error);
        throw error;
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-900">
      <div className="container mx-auto py-6">
        <PageHeader
          title="Texas Acquisition Assistant"
          description="Get help with Texas government acquisition regulations and procurement requirements"
        />
        
        <div className="mt-4 mb-6">
          <OfflineSyncStatus />
        </div>
        
        <NetworkErrorHandler 
          errorMessage={error?.message}
          onRetry={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
          isLoading={isLoading}
          autoRetry={true}
        >
          <TexasChatContainer
            conversationId={conversationId}
            messages={messages}
            isLoading={isLoading}
            input={input}
            selectedAgency={selectedAgency}
            selectedRole={selectedRole}
            selectedResponseLevel={selectedResponseLevel}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onAgencyChange={setSelectedAgency}
            onRoleChange={setSelectedRole}
            onResponseLevelChange={setSelectedResponseLevel}
            error={error?.message}
          />
        </NetworkErrorHandler>
      </div>
    </div>
  );
};

export default TexasAcquisitionPage;
