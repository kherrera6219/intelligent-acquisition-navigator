
import React from 'react';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  language = 'javascript',
  className
}) => {
  const copyToClipboard = async () => {
    if (typeof children === 'string') {
      try {
        await navigator.clipboard.writeText(children);
        toast.success('Code copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy code');
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className={cn("relative rounded-md overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-muted text-muted-foreground text-xs font-medium">
        <span>{language}</span>
        <button 
          onClick={copyToClipboard}
          className="p-1 hover:text-foreground transition-colors"
          aria-label="Copy code to clipboard"
        >
          <Copy size={14} />
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-muted/50 text-sm">
        <code className="font-mono">
          {children}
        </code>
      </pre>
    </div>
  );
};
