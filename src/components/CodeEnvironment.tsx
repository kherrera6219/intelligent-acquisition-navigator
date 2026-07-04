
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Copy, Check } from "lucide-react";

interface CodeEnvironmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeEnvironment = ({ isOpen, onClose }: CodeEnvironmentProps) => {
  const [copied, setCopied] = useState(false);
  const code = `# Python environment simulation
def hello_world():
    print("Hello from simulated Python environment!")
    
hello_world()`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-gray-900/90 border-gray-700 text-white">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Code Environment</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-gray-800 hover:bg-gray-700"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-gray-800 hover:bg-gray-700"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[400px] p-4">
          <pre className="font-mono text-sm">
            <code className="block whitespace-pre">{code}</code>
          </pre>
        </ScrollArea>
      </Card>
    </div>
  );
};
