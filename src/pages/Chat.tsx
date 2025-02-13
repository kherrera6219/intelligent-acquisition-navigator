
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

  const aiMutation = useAzureAI(
    messages.map(({ role, content }) => ({ role, content })),
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
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    aiMutation.mutate([...messages, userMessage].map(({ role, content }) => ({ 
      role, 
      content 
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <div className="h-[600px] flex flex-col">
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
