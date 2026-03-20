
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAzureAI } from "@/hooks/useAzureAI";
import { CodeEnvironment } from "@/components/CodeEnvironment";
import { ChatToolbar } from "@/components/chat/ChatToolbar";
import { ChatSelectors } from "@/components/chat/ChatSelectors";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { FileUpload } from "@/components/chat/FileUpload";
import { PageHeader } from "@/components/layout/PageHeader";
import { Message, AcquisitionRole, AgencyRegulation, DetailLevel } from "@/types/chat";
import { ROLE_LABELS, AGENCY_LABELS } from "@/constants/chatOptions";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<AcquisitionRole>("CONTRACT_SPECIALIST");
  const [selectedAgency, setSelectedAgency] = useState<AgencyRegulation>("DFARS");
  const [selectedDetailLevel, setSelectedDetailLevel] = useState<DetailLevel>("BRIEF");
  const [isEnvironmentOpen, setIsEnvironmentOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(true);
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
            console.error('Error saving message:', error);
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
      setIsInitializing(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // Not authenticated — still allow chat without persistence
          setIsInitializing(false);
          return;
        }

        const { data: conversation, error } = await supabase
          .from('conversations')
          .insert({
            title: `Chat ${new Date().toLocaleDateString()}`,
            user_id: user.id,
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating conversation:', error);
          toast({
            title: "Chat history unavailable",
            description: "Messages won't be saved this session. You can still use the assistant.",
          });
          return;
        }

        setConversationId(conversation.id);
      } catch (err) {
        console.error('Unexpected error initializing conversation:', err);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeConversation();
  }, [toast]);

  const MAX_INPUT_LENGTH = 10_000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !conversationId) return;

    if (input.length > MAX_INPUT_LENGTH) {
      toast({
        title: "Message too long",
        description: `Please keep messages under ${MAX_INPUT_LENGTH.toLocaleString()} characters.`,
        variant: "destructive",
      });
      return;
    }

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
      console.error('Error saving message:', dbError);
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

    // Limit conversation history to prevent context-window overflow.
    // The service layer applies its own truncation as well; this keeps
    // the request payload small before it even leaves the component.
    const CHAT_HISTORY_WINDOW = 20;
    const aiMessages = [
      { role: "system", content: aiContext },
      ...messages.slice(-CHAT_HISTORY_WINDOW).map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: userMessage.content },
    ];

    aiMutation.mutate(aiMessages);
  };

  if (isInitializing) {
    return (
      <div className="space-y-4 animate-fade-in" aria-busy="true" aria-label="Loading chat">
        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-44 bg-white/5 rounded-md" />
          <Skeleton className="h-4 w-72 bg-white/5 rounded-md" />
        </div>
        <Skeleton className="h-[600px] w-full bg-white/5 rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="AI Assistant"
        description="Ask about FAR/DFARS compliance, solicitations, market research, or acquisition strategy."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "AI Assistant" }]}
      />
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
            isLoading={aiMutation.isPending}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        </div>
      </Card>
      <CodeEnvironment
        isOpen={isEnvironmentOpen}
        onClose={() => setIsEnvironmentOpen(false)}
      />
    </>
  );
};

export default Chat;
