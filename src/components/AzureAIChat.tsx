
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Key } from "lucide-react";
import { getAICompletion } from '@/services/azure/aiService';
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AzureAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Azure OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAICompletion([...messages, newMessage], apiKey);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0].message.content
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please verify your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="flex gap-2 items-center mb-4">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter Azure OpenAI API Key"
            className="flex-1"
          />
          <Key className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-100 ml-auto max-w-[80%]' 
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading || !apiKey}
        />
        <Button type="submit" disabled={isLoading || !apiKey}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
        </Button>
      </form>
    </Card>
  );
};
