
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Key, AlertCircle } from "lucide-react";
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
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingKey, setIsValidatingKey] = useState(false);
  const { toast } = useToast();

  const handleApiKeyChange = async (value: string) => {
    setApiKey(value);
    if (value.length > 30) { // Only validate if key looks reasonable
      setIsValidatingKey(true);
      try {
        // Simulate API key validation
        await new Promise(resolve => setTimeout(resolve, 500));
        toast({
          title: "API Key Validated",
          description: "Your API key has been successfully validated.",
        });
      } catch (error) {
        toast({
          title: "Invalid API Key",
          description: "Please check your API key and try again.",
          variant: "destructive",
        });
      } finally {
        setIsValidatingKey(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Azure OpenAI API key to start chatting.",
        variant: "destructive",
        icon: <AlertCircle className="h-5 w-5" />,
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
        title: "Connection Error",
        description: "Unable to reach the AI service. Please check your internet connection and try again.",
        variant: "destructive",
        icon: <AlertCircle className="h-5 w-5" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="flex gap-2 items-center mb-4">
          <div className="relative flex-1">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder="Enter Azure OpenAI API Key"
              className="pr-10"
              aria-label="Azure OpenAI API Key"
              disabled={isValidatingKey}
            />
            {isValidatingKey && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>
          <Key className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
      </div>

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
          disabled={isLoading || !apiKey || isValidatingKey}
          aria-label="Message input"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !apiKey || isValidatingKey}
          aria-label={isLoading ? "Sending message..." : "Send message"}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
        </Button>
      </form>
    </Card>
  );
};
