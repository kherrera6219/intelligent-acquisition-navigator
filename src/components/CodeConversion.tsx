
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Copy, Check } from "lucide-react";
import { analyzePythonCode } from "@/services/code-analysis";
import { ConversionResult } from "@/types/code-conversion";
import { useToast } from "@/hooks/use-toast";

interface CodeConversionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeConversion = ({ isOpen, onClose }: CodeConversionProps) => {
  const [pythonCode, setPythonCode] = useState("");
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleConvert = () => {
    if (!pythonCode.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some Python code to convert"
      });
      return;
    }

    const result = analyzePythonCode(pythonCode);
    setConversionResult(result);

    if (result.errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Conversion Errors",
        description: `Found ${result.errors.length} error(s) in the code`
      });
    } else if (result.warnings.length > 0) {
      toast({
        variant: "default",
        title: "Conversion Warnings",
        description: `Found ${result.warnings.length} warning(s) in the code`
      });
    } else {
      toast({
        title: "Success",
        description: "Code converted successfully"
      });
    }
  };

  const handleCopy = async () => {
    if (conversionResult?.convertedCode) {
      await navigator.clipboard.writeText(conversionResult.convertedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      toast({
        title: "Copied",
        description: "Code copied to clipboard"
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl bg-background border-border">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Python to TypeScript Converter</h2>
          <div className="flex gap-2">
            {conversionResult && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Python Code</label>
            <textarea
              value={pythonCode}
              onChange={(e) => setPythonCode(e.target.value)}
              className="w-full h-[400px] font-mono text-sm p-2 rounded-md border bg-muted/50"
              placeholder="Enter Python code here..."
            />
            <Button onClick={handleConvert} className="w-full">
              Convert to TypeScript
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">TypeScript Code</label>
            <ScrollArea className="h-[400px] rounded-md border bg-muted/50 p-2">
              {conversionResult ? (
                <pre className="font-mono text-sm">
                  <code>{conversionResult.convertedCode}</code>
                </pre>
              ) : (
                <div className="text-muted-foreground text-sm p-2">
                  Converted TypeScript code will appear here...
                </div>
              )}
            </ScrollArea>

            {conversionResult && (
              <div className="space-y-4">
                {conversionResult.errors.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-destructive">Errors</h3>
                    <ul className="space-y-1">
                      {conversionResult.errors.map((error, index) => (
                        <li key={index} className="text-sm text-destructive">
                          Line {error.line}: {error.message} ({error.code})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {conversionResult.warnings.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-yellow-500">Warnings</h3>
                    <ul className="space-y-1">
                      {conversionResult.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-yellow-500">
                          Line {warning.line}: {warning.message} ({warning.code})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {conversionResult.debugNotes.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Debug Notes</h3>
                    <ul className="space-y-1">
                      {conversionResult.debugNotes.map((note, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
