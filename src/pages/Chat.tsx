import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAzureAI } from "@/hooks/useAzureAI";
import { CodeEnvironment } from "@/components/CodeEnvironment";
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
  Building,
  Paintbrush,
  Code,
  Play,
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
  agencyRegulation?: string;
  detailLevel?: string;
}

type AcquisitionRole = 
  | "CONTRACT_SPECIALIST"
  | "CONTRACTING_OFFICER"
  | "PROGRAM_MANAGER"
  | "LEGAL_REVIEWER"
  | "SMALL_BUSINESS_SPECIALIST"
  | "COST_PRICE_ANALYST"
  | "QUALITY_ASSURANCE";

type AgencyRegulation =
  | "DFARS"
  | "GSARS"
  | "HHSARS"
  | "DEARS"
  | "DOSAR"
  | "AIDAR"
  | "DLAD"
  | "NMCARS"
  | "AFFARS"
  | "EPAAR"
  | "FEHBAR"
  | "HUDAR"
  | "IAAR"
  | "JAR"
  | "LIFAR"
  | "NFS"
  | "NRCAR"
  | "TAR"
  | "VAAR"
  | "DTAR"
  | "AGAR"
  | "CAR"
  | "DEAR"
  | "DIARS"
  | "DOIAR"
  | "DOLAR"
  | "EDAR";

const ROLE_LABELS: Record<AcquisitionRole, string> = {
  CONTRACT_SPECIALIST: "Contract Specialist",
  CONTRACTING_OFFICER: "Contracting Officer",
  PROGRAM_MANAGER: "Program Manager",
  LEGAL_REVIEWER: "Legal Reviewer",
  SMALL_BUSINESS_SPECIALIST: "Small Business Specialist",
  COST_PRICE_ANALYST: "Cost/Price Analyst",
  QUALITY_ASSURANCE: "Quality Assurance Specialist"
};

const AGENCY_LABELS: Record<AgencyRegulation, string> = {
  DFARS: "Defense Federal Acquisition Regulation Supplement",
  GSARS: "General Services Administration Acquisition Regulation",
  HHSARS: "Health and Human Services Acquisition Regulation",
  DEARS: "Department of Energy Acquisition Regulation",
  DOSAR: "Department of State Acquisition Regulation",
  AIDAR: "Agency for International Development Acquisition Regulation",
  DLAD: "Defense Logistics Acquisition Directive",
  NMCARS: "Navy Marine Corps Acquisition Regulation Supplement",
  AFFARS: "Air Force Federal Acquisition Regulation Supplement",
  EPAAR: "Environmental Protection Agency Acquisition Regulation",
  FEHBAR: "Federal Employees Health Benefits Acquisition Regulation",
  HUDAR: "Department of Housing and Urban Development Acquisition Regulation",
  IAAR: "Interior Acquisition Regulation",
  JAR: "Justice Acquisition Regulation",
  LIFAR: "Life Insurance Federal Acquisition Regulation",
  NFS: "NASA FAR Supplement",
  NRCAR: "Nuclear Regulatory Commission Acquisition Regulation",
  TAR: "Treasury Acquisition Regulation",
  VAAR: "Veterans Affairs Acquisition Regulation",
  DTAR: "Department of Transportation Acquisition Regulation",
  AGAR: "Agriculture Acquisition Regulation",
  CAR: "Commerce Acquisition Regulation",
  DEAR: "Department of Education Acquisition Regulation",
  DIARS: "Defense Intelligence Agency Regulation",
  DOIAR: "Department of Interior Acquisition Regulation",
  DOLAR: "Department of Labor Acquisition Regulation",
  EDAR: "Department of Education Acquisition Regulation"
};

const DETAIL_LEVELS = {
  BRIEF: "Brief (3-6 lines)",
  STANDARD: "Standard (1 page report)",
  COMPREHENSIVE: "Comprehensive (Detailed with citations)",
} as const;

type DetailLevel = keyof typeof DETAIL_LEVELS;

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

    aiMutation.mutate([...messages, userMessage].map(({ role, content }) => ({ 
      role, 
      content: role === "user" 
        ? `[As ${ROLE_LABELS[selectedRole]} under ${AGENCY_LABELS[selectedAgency]}, provide a ${selectedDetailLevel.toLowerCase()} response]: ${content}` 
        : content 
    })));
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
                      onClick={handleDocumentCreation}
                    >
                      <Paintbrush className="w-4 h-4 mr-2" />
                      Canvas Tool
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
                      onClick={handleCodeCreation}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      Code Editor
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
                      onClick={handleRunEnvironment}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run Environment
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
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
                  <div className="flex items-center gap-4">
                    <Building className="w-5 h-5 text-violet-400" />
                    <Select
                      value={selectedAgency}
                      onValueChange={(value: AgencyRegulation) => setSelectedAgency(value)}
                    >
                      <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue placeholder="Select agency regulation" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {Object.entries(AGENCY_LABELS).map(([agency, label]) => (
                          <SelectItem 
                            key={agency} 
                            value={agency}
                            className="text-white hover:bg-gray-700 focus:bg-gray-700"
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-violet-400" />
                    <Select
                      value={selectedDetailLevel}
                      onValueChange={(value: DetailLevel) => setSelectedDetailLevel(value)}
                    >
                      <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue placeholder="Select detail level" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {Object.entries(DETAIL_LEVELS).map(([level, label]) => (
                          <SelectItem 
                            key={level} 
                            value={level}
                            className="text-white hover:bg-gray-700 focus:bg-gray-700"
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                            {message.agencyRegulation && (
                              <span className="ml-2">
                                • {AGENCY_LABELS[message.agencyRegulation as AgencyRegulation]}
                              </span>
                            )}
                            {message.detailLevel && (
                              <span className="ml-2">
                                • {DETAIL_LEVELS[message.detailLevel as DetailLevel]}
                              </span>
                            )}
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
      <CodeEnvironment 
        isOpen={isEnvironmentOpen} 
        onClose={() => setIsEnvironmentOpen(false)} 
      />
    </>
  );
};

export default Chat;
