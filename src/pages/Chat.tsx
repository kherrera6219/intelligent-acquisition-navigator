
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAzureAI } from "@/hooks/useAzureAI";
import { CodeEnvironment } from "@/components/CodeEnvironment";
import { ChatToolbar } from "@/components/chat/ChatToolbar";
import { ChatSelectors } from "@/components/chat/ChatSelectors";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { Message, AcquisitionRole, AgencyRegulation, DetailLevel } from "@/types/chat";
import { ROLE_LABELS, AGENCY_LABELS } from "@/constants/chatOptions";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<AcquisitionRole>("CONTRACT_SPECIALIST");
  const [selectedAgency, setSelectedAgency] = useState<AgencyRegulation>("DFARS");
  const [selectedDetailLevel, setSelectedDetailLevel] = useState<DetailLevel>("BRIEF");
  const [isEnvironmentOpen, setIsEnvironmentOpen] = useState(false);

  const aiMutation = useAzureAI(
    messages.map(({ role, content }) => ({ 
      role, 
      content: role === "user" 
        ? `[As ${ROLE_LABELS[selectedRole]} under ${AGENCY_LABELS[selectedAgency]}, provide a ${selectedDetailLevel.toLowerCase()} response]: ${content}` 
        : content 
    })),
    {
      onSuccess: (data) => {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.choices[0].message.content,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      userRole: selectedRole,
      agencyRegulation: selectedAgency,
      detailLevel: selectedDetailLevel,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    aiMutation.mutate();
  };

  const handleDocumentCreation = () => {
    console.log("Opening document creation canvas");
  };

  const handleCodeCreation = () => {
    console.log("Opening code editor");
  };

  const handleRunEnvironment = () => {
    setIsEnvironmentOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-black/40 backdrop-blur-sm border-white/10">
            <div className="h-[600px] flex flex-col">
              <div className="p-4 border-b border-white/10">
                <ChatToolbar
                  onDocumentCreation={handleDocumentCreation}
                  onCodeCreation={handleCodeCreation}
                  onRunEnvironment={handleRunEnvironment}
                />
                <ChatSelectors
                  selectedRole={selectedRole}
                  selectedAgency={selectedAgency}
                  selectedDetailLevel={selectedDetailLevel}
                  onRoleChange={setSelectedRole}
                  onAgencyChange={setSelectedAgency}
                  onDetailLevelChange={setSelectedDetailLevel}
                />
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
