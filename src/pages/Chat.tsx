
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAzureAI } from "@/hooks/useAzureAI";
import {
  Brain,
  Send,
  MessagesSquare,
  FileText,
  BookOpen,
  Scale,
  Bot,
  Loader2,
  UserCheck,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  userRole?: string;
}

type AcquisitionRole = 
  | "CONTRACT_SPECIALIST"
  | "CONTRACTING_OFFICER"
  | "PROGRAM_MANAGER"
  | "LEGAL_REVIEWER"
  | "SMALL_BUSINESS_SPECIALIST"
  | "COST_PRICE_ANALYST"
  | "QUALITY_ASSURANCE";

const ROLE_LABELS: Record<AcquisitionRole, string> = {
  CONTRACT_SPECIALIST: "Contract Specialist",
  CONTRACTING_OFFICER: "Contracting Officer",
  PROGRAM_MANAGER: "Program Manager",
  LEGAL_REVIEWER: "Legal Reviewer",
  SMALL_BUSINESS_SPECIALIST: "Small Business Specialist",
  COST_PRICE_ANALYST: "Cost/Price Analyst",
  QUALITY_ASSURANCE: "Quality Assurance Specialist"
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<AcquisitionRole>("CONTRACT_SPECIALIST");

  const aiMutation = useAzureAI(
    messages.map(({ role, content }) => ({ 
      role, 
      content: role === "user" ? `[As ${ROLE_LABELS[selectedRole]}]: ${content}` : content 
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
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    aiMutation.mutate([...messages, userMessage].map(({ role, content }) => ({ 
      role, 
      content: role === "user" ? `[As ${ROLE_LABELS[selectedRole]}]: ${content}` : content 
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <div className="h-[600px] flex flex-col">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <UserCheck className="w-5 h-5 text-violet-400" />
                <Select
                  value={selectedRole}
                  onValueChange={(value: AcquisitionRole) => setSelectedRole(value)}
                >
                  <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Object.entries(ROLE_LABELS).map(([role, label]) => (
                      <SelectItem 
                        key={role} 
                        value={role}
                        className="text-white hover:bg-gray-700 focus:bg-gray-700"
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.role === "user"
                          ? "bg-violet-500/20 text-white"
                          : "bg-gray-800/50 text-gray-100"
                      }`}
                    >
                      {message.role === "user" && message.userRole && (
                        <div className="text-xs text-violet-400 mb-1">
                          {ROLE_LABELS[message.userRole as AcquisitionRole]}
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {aiMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800/50 border-gray-700 text-white"
                  disabled={aiMutation.isPending}
                />
                <Button 
                  type="submit" 
                  disabled={aiMutation.isPending || !input.trim()}
                  className="bg-violet-500 hover:bg-violet-600"
                >
                  {aiMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
