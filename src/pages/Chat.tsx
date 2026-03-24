
import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { useAzureAI } from "@/hooks/useAzureAI";
import { CodeEnvironment } from "@/components/CodeEnvironment";
import { ChatToolbar } from "@/components/chat/ChatToolbar";
import { ChatSelectors } from "@/components/chat/ChatSelectors";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { FileUpload } from "@/components/chat/FileUpload";
import { Message, AcquisitionRole, AgencyRegulation, DetailLevel } from "@/types/chat";
import { ROLE_LABELS, AGENCY_LABELS } from "@/constants/chatOptions";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { errorTracker } from "@/lib/security/errorTracking";

const SUBMIT_DEBOUNCE_MS = 500;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<AcquisitionRole>("CONTRACT_SPECIALIST");
  const [selectedAgency, setSelectedAgency] = useState<AgencyRegulation>("DFARS");
  const [selectedDetailLevel, setSelectedDetailLevel] = useState<DetailLevel>("BRIEF");
  const [isEnvironmentOpen, setIsEnvironmentOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");
  const [isInitializingConversation, setIsInitializingConversation] = useState(false);
  const lastSubmitRef = useRef<number>(0);
  const { toast } = useToast();

  const aiMutation = useAzureAI(
    messages,
    {
      onSuccess: async (data) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.choices[0].message.content,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        if (conversationId) {
          const { error } = await supabase.from('chat_messages').insert({
            conversation_id: conversationId,
            content: assistantMessage.content,
            role: assistantMessage.role,
            user_id: user.id,
          });

          if (error) {
            errorTracker.trackError({
              message: `Failed to save assistant message: ${error.message}`,
              severity: 'MEDIUM',
              errorType: 'APPLICATION',
              status: 'NEW',
            });
            toast({
              title: "Error saving message",
              description: "Your message was displayed but couldn't be saved.",
              variant: "destructive",
            });
          }
        }
      },
    }
  );

  useEffect(() => {
    const initializeConversation = async () => {
      setIsInitializingConversation(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: conversation, error } = await supabase
          .from('conversations')
          .insert({
            title: `Chat ${new Date().toLocaleDateString()}`,
            user_id: user.id,
          })
          .select()
          .single();

        if (error) {
          errorTracker.trackError({
            message: `Failed to create conversation: ${error.message}`,
            severity: 'MEDIUM',
            errorType: 'APPLICATION',
            status: 'NEW',
          });
          return;
        }

        setConversationId(conversation.id);
      } finally {
        setIsInitializingConversation(false);
      }
    };

    initializeConversation();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Debounce guard — prevents double-submission
    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_DEBOUNCE_MS) return;
    lastSubmitRef.current = now;

    // Block submission while conversation is still being created
    if (isInitializingConversation || !conversationId) {
      toast({
        title: "Please wait",
        description: "Conversation is being initialized...",
      });
      return;
    }

    if (aiMutation.isPending) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      userRole: selectedRole,
      agencyRegulation: selectedAgency,
      detailLevel: selectedDetailLevel,
    };

    const { error: dbError } = await supabase.from('chat_messages').insert({
      conversation_id: conversationId,
      content: userMessage.content,
      role: userMessage.role,
      user_id: user.id,
      metadata: {
        userRole: selectedRole,
        agencyRegulation: selectedAgency,
        detailLevel: selectedDetailLevel,
      },
    });

    if (dbError) {
      errorTracker.trackError({
        message: `Failed to save user message: ${dbError.message}`,
        severity: 'MEDIUM',
        errorType: 'APPLICATION',
        status: 'NEW',
      });
      toast({
        title: "Error saving message",
        description: "Your message couldn't be saved. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiContext = `You are responding as a ${ROLE_LABELS[selectedRole]} working under ${AGENCY_LABELS[selectedAgency]}.
                      Provide a ${selectedDetailLevel.toLowerCase()} response.`;

    const aiMessages = [
      { role: "system" as const, content: aiContext },
      ...messages.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      })),
      { role: "user" as const, content: userMessage.content }
    ];

    aiMutation.mutate(aiMessages);
  }, [input, conversationId, isInitializingConversation, aiMutation, messages, selectedRole, selectedAgency, selectedDetailLevel, toast]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-black/40 backdrop-blur-sm border-white/10">
            <div className="h-[600px] flex flex-col">
              <div className="p-4 border-b border-white/10">
                <ChatToolbar
                  onDocumentCreation={() => {}}
                  onCodeCreation={() => {}}
                  onRunEnvironment={() => setIsEnvironmentOpen(true)}
                />
                <ChatSelectors
                  selectedRole={selectedRole}
                  selectedAgency={selectedAgency}
                  selectedDetailLevel={selectedDetailLevel}
                  onRoleChange={setSelectedRole}
                  onAgencyChange={setSelectedAgency}
                  onDetailLevelChange={setSelectedDetailLevel}
                />
                {conversationId && (
                  <FileUpload
                    conversationId={conversationId}
                    onUploadComplete={() => {
                      toast({
                        title: "Document uploaded",
                        description: "The document will be available for reference in this conversation.",
                      });
                    }}
                  />
                )}
              </div>
              <ChatMessages
                messages={messages}
                isLoading={aiMutation.isPending}
              />
              <ChatInput
                input={input}
                isLoading={aiMutation.isPending || isInitializingConversation}
                onInputChange={setInput}
                onSubmit={handleSubmit}
              />
            </div>
          </Card>
        </div>
      </div>
      <CodeEnvironment
        isOpen={isEnvironmentOpen}
        onClose={() => setIsEnvironmentOpen(false)}
      />
    </>
  );
};

export default Chat;
