
import { Button } from "@/components/ui/button";
import { Paintbrush, Code, Play } from "lucide-react";

interface ChatToolbarProps {
  onDocumentCreation: () => void;
  onCodeCreation: () => void;
  onRunEnvironment: () => void;
}

export const ChatToolbar = ({
  onDocumentCreation,
  onCodeCreation,
  onRunEnvironment,
}: ChatToolbarProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
          onClick={onDocumentCreation}
        >
          <Paintbrush className="w-4 h-4 mr-2" />
          Canvas Tool
        </Button>
        <Button
          variant="outline"
          className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
          onClick={onCodeCreation}
        >
          <Code className="w-4 h-4 mr-2" />
          Code Editor
        </Button>
        <Button
          variant="outline"
          className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
          onClick={onRunEnvironment}
        >
          <Play className="w-4 h-4 mr-2" />
          Run Environment
        </Button>
      </div>
    </div>
  );
};
