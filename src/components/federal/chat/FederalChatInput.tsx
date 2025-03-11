
import React, { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Paperclip } from 'lucide-react';

interface FederalChatInputProps {
  input: string;
  isLoading?: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onFileUpload?: (file: File) => void;
}

export const FederalChatInput: React.FC<FederalChatInputProps> = ({
  input,
  isLoading = false,
  onInputChange,
  onSendMessage,
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() !== '') {
        onSendMessage();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <Textarea
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your question about federal acquisition..."
        className="min-h-[80px] resize-none"
      />
      <div className="flex flex-col gap-2">
        <Button 
          type="submit" 
          size="icon" 
          onClick={onSendMessage}
          disabled={isLoading || input.trim() === ''}
        >
          <Send className="h-4 w-4" />
        </Button>
        {onFileUpload && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
            />
          </Button>
        )}
      </div>
    </div>
  );
};
