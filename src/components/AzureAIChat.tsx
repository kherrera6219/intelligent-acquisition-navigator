
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { getAICompletion } from '@/services/azure/aiService';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AzureAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAICompletion([...messages, newMessage]);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0].message.content
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to reach the AI service. Please check your internet connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 max-w-2xl mx-auto">
      <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto" role="log" aria-label="Chat messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-100 ml-auto max-w-[80%]'
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
            role={message.role === 'assistant' ? 'status' : 'comment'}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 bg-gray-200" />
            <Skeleton className="h-12 w-1/2 bg-gray-200" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          aria-label="Message input"
        />
        <Button
          type="submit"
          disabled={isLoading}
          aria-label={isLoading ? "Sending message..." : "Send message"}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
        </Button>
      </form>
    </Card>
  );
};
