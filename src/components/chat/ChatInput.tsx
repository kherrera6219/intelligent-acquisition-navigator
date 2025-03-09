
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUp, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUpload } from "@/components/chat/FileUpload";
import { useState } from "react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  onFileUpload?: (files: FileList) => void;
  isVoiceActive?: boolean;
  onVoiceToggle?: () => void;
}

export const ChatInput = ({
  input,
  isLoading,
  onInputChange,
  onSubmit,
  className,
  onFileUpload,
  isVoiceActive = false,
  onVoiceToggle,
}: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4 relative", className)}>
      <div className="relative glass-card p-4 rounded-lg border border-white/10">
        <div className="absolute bottom-4 left-4 z-10 flex space-x-2">
          {onFileUpload && <FileUpload onFileUpload={onFileUpload} className="inline-block" />}
          
          {onVoiceToggle && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onVoiceToggle}
              className="hover:bg-background/50"
              title={isVoiceActive ? "Stop Voice Recording" : "Start Voice Recording"}
            >
              {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span className="sr-only">{isVoiceActive ? "Stop Voice" : "Start Voice"}</span>
            </Button>
          )}
        </div>

        <Textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message about federal acquisition regulations..."
          className="min-h-[100px] w-full resize-none rounded-lg bg-background/80 border-border 
                   text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary 
                   transition-colors hover:bg-background/90 pl-20"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute bottom-6 right-6 enterprise-gradient text-white 
                   hover:opacity-90 transition-all duration-200 hover:scale-105 
                   disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
          size="sm"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-background/50 backdrop-blur-sm 
                      rounded-lg flex items-center justify-center">
          <div className="space-y-2 animate-pulse">
            <Skeleton className="h-4 w-32 bg-muted" />
            <Skeleton className="h-4 w-24 bg-muted" />
          </div>
        </div>
      )}
    </form>
  );
};
