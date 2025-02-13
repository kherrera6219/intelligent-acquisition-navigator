
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Brain,
  Send,
  MessagesSquare,
  FileText,
  BookOpen,
  Scale,
  Bot,
  Loader2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response for now
      setTimeout(() => {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I understand your acquisition-related query. Based on FAR regulations, I recommend reviewing section 15.304 regarding evaluation factors. Would you like me to provide more specific guidance?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="p-6 bg-black/50 backdrop-blur-sm border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Bot className="w-5 h-5 text-violet-400" />
              Acquisition Assistant
            </h2>
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
              >
                <MessagesSquare className="w-4 h-4 mr-2" />
                New Chat
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                Templates
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                FAR Guide
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
              >
                <Scale className="w-4 h-4 mr-2" />
                Compliance
              </Button>
            </nav>
          </Card>

          {/* Main Chat Area */}
          <Card className="lg:col-span-3 p-6 bg-black/50 backdrop-blur-sm border-gray-800 flex flex-col h-[80vh]">
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-4">
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
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs text-gray-400 mt-2 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about FAR regulations, compliance, or acquisition processes..."
                className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-violet-500 hover:bg-violet-600"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
