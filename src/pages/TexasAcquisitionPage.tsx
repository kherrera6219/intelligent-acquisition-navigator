
import React, { useState, useEffect } from 'react';
import { TexasChatContainer } from '@/components/texas/TexasChatContainer';
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { AIChatMessage } from "@/types/chat";
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

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
  const [inputError, setInputError] = useState<string | null>(null);
  
  // Initialize CSRF token on mount
  useEffect(() => {
    generateCsrfToken();
  }, []);

  const validateInput = (value: string): boolean => {
    if (!value.trim()) {
      setInputError('Please enter a message');
      return false;
    }
    
    if (value.length > 2000) {
      setInputError('Message is too long (maximum 2000 characters)');
      return false;
    }
    
    setInputError(null);
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't submit empty messages
    if (!validateInput(input)) return;
    
    // Sanitize input
    const sanitizedInput = sanitizeHtml(input);
    
    // Prepare user message
    const userMessage: TexasMessage = {
      id: uuidv4(),
      content: sanitizedInput,
      role: 'user',
      timestamp: new Date(),
      agencyType: selectedAgency,
      userRole: selectedRole,
      responseLevel: selectedResponseLevel
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
    const apiMessages: AIChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
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
            content: response.choices[0].message.content,
            role: 'assistant',
            timestamp: new Date(),
            agencyType: selectedAgency,
            userRole: selectedRole,
            responseLevel: selectedResponseLevel
          };
          
          setMessages(prevMessages => [...prevMessages, aiMessage]);
        }
      } catch (error) {
        console.error('Error getting AI response:', error);
        
        toast({
          title: "Error",
          description: "Failed to get response. Please try again later.",
          variant: "destructive",
        });
        
        throw error;
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-900">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <PageHeader
          title="Texas Acquisition Assistant"
          description="Get help with Texas government acquisition regulations and procurement requirements"
        />
        
        <div className="mt-4 mb-6">
          <OfflineSyncStatus />
        </div>
        
        {inputError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{inputError}</AlertDescription>
          </Alert>
        )}
        
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
            onInputChange={(value) => {
              setInput(value);
              if (inputError) validateInput(value);
            }}
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
