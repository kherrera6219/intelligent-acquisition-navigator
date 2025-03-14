
import React, { useState, useEffect } from 'react';
import { TexasChatContainer } from '@/components/texas/TexasChatContainer';
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { AIChatMessage } from "@/types/chat";
import { getAzureOpenAICompletion } from '@/services/texas/azureOpenAIService';
import { v4 as uuidv4 } from 'uuid';
import { useNetworkOperation } from '@/hooks/useNetworkOperation';
import { OfflineSyncStatus } from '@/components/ui/universal/OfflineSyncStatus';
import { useAuth } from '@/hooks/useAuth';
import { generateCsrfToken } from '@/utils/csrfProtection';
import { sanitizeHtml } from '@/utils/inputSanitization';
import { PageHeader } from '@/components/layout/PageHeader';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { UniversalInternalHeader } from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';

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
    
    if (!validateInput(input)) return;
    
    const sanitizedInput = sanitizeHtml(input);
    
    const userMessage: TexasMessage = {
      id: uuidv4(),
      content: sanitizedInput,
      role: 'user',
      timestamp: new Date(),
      agencyType: selectedAgency,
      userRole: selectedRole,
      responseLevel: selectedResponseLevel
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setInput('');
    
    reset();
    
    const systemPrompt = `You are an AI assistant specializing in Texas government acquisition regulations. 
      You are currently working with a ${selectedRole} at a ${selectedAgency} agency. 
      Provide ${selectedResponseLevel.toLowerCase()} responses focused on procurement requirements.`;
    
    const apiMessages: AIChatMessage[] = [
      { role: "system" as const, content: systemPrompt },
      ...messages.map(msg => ({
        role: (msg.role === 'user' ? "user" : "assistant") as "user" | "assistant" | "system",
        content: msg.content
      })),
      { role: "user" as const, content: sanitizedInput }
    ];
    
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
    <div className="flex flex-col min-h-screen">
      {/* Header outside of main content */}
      <UniversalInternalHeader />
      
      {/* Main content area */}
      <div className="flex-1">
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
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          
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
        </div>
      </div>
      
      {/* Footer outside of main content */}
      <InternalFooter />
    </div>
  );
};

export default TexasAcquisitionPage;
