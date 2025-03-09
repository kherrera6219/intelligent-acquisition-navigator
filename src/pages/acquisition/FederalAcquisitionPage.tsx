
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Message, AIChatMessage } from "@/types/chat";
import { FederalChatContainer } from "@/components/federal/FederalChatContainer";
import { useToast } from "@/hooks/use-toast";
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { getFederalAzureOpenAICompletion } from "@/services/federal/federalAzureOpenAIService";

interface ChatState {
  messages: Message[];
  conversationId: string;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => Promise<boolean>;
  isLoading: boolean;
}

const FederalAcquisition = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string>();
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    conversationId: "federal-" + Date.now(),
    addMessage: async (message) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        timestamp: new Date(),
        ...message
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
      }));
      
      return true;
    },
    isLoading: false
  });
  
  const { toast } = useToast();

  const aiMutation = useMutation({
    mutationFn: async (messages: AIChatMessage[]) => {
      return await getFederalAzureOpenAICompletion(messages);
    },
    onSuccess: async (data) => {
      setError(undefined);
      const success = await chatState.addMessage({
        role: "assistant",
        content: data.choices[0].message.content
      });
      
      if (!success) {
        toast({
          title: "Error saving message",
          description: "Your message was displayed but couldn't be saved.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error('AI Error:', error);
      setError("Failed to get AI response. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || aiMutation.isPending || !chatState.conversationId) return;

    setError(undefined);
    const success = await chatState.addMessage({
      role: "user",
      content: input.trim()
    });
    
    if (!success) {
      setError("Failed to save your message. Please try again.");
      toast({
        title: "Error saving message",
        description: "Your message couldn't be saved. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const currentInput = input;
    setInput("");
    
    const aiContext = `You are a federal acquisition expert, specializing in FAR regulations and federal procurement processes. 
                      Provide clear, accurate guidance specific to federal acquisition regulations and requirements. 
                      Focus on compliance, best practices, and practical implementation.`;
    
    const aiMessages: AIChatMessage[] = [
      { role: "system", content: aiContext },
      ...chatState.messages.map(msg => ({ 
        role: msg.role as "user" | "assistant", 
        content: msg.content 
      })),
      { role: "user", content: currentInput.trim() }
    ];

    aiMutation.mutate(aiMessages);
  };

  const handleDocumentCreation = () => {
    toast({
      title: "Document Creation",
      description: "Opening document creation tool...",
    });
  };

  const handleCodeCreation = () => {
    toast({
      title: "Code Editor",
      description: "Opening code editor...",
    });
  };

  const handleRunEnvironment = () => {
    toast({
      title: "Environment",
      description: "Starting environment...",
    });
  };

  const handleFileUpload = async (files: FileList) => {
    // Logic to handle the uploaded file
    if (files.length > 0) {
      const file = files[0];
      console.log("File uploaded:", file.name);
      
      // Add a user message indicating file upload
      await chatState.addMessage({
        role: "user",
        content: `I've uploaded a file: ${file.name}`
      });
      
      // In a real implementation, you would upload the file to a storage service
      // and then process it with the AI
    }
  };

  return (
    <ProtectedPageLayout
      title="Federal Acquisition"
      description="Get AI assistance for federal acquisition regulations and requirements."
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Federal Acquisition', href: '/federal-acquisition' }
      ]}
    >
      <div className="min-h-[calc(100vh-200px)]">
        <FederalChatContainer
          conversationId={chatState.conversationId}
          messages={chatState.messages}
          isLoading={chatState.isLoading || aiMutation.isPending}
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onDocumentCreation={handleDocumentCreation}
          onCodeCreation={handleCodeCreation}
          onRunEnvironment={handleRunEnvironment}
          error={error}
        />
      </div>
    </ProtectedPageLayout>
  );
};

export default FederalAcquisition;
