
import { Button } from "@/components/ui/button";
import { Paintbrush, Code, Play } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";

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
        <Tooltip content="Open document creation canvas">
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700 hover:scale-105 transition-all duration-200"
            onClick={onDocumentCreation}
          >
            <Paintbrush className="w-4 h-4 mr-2" />
            Canvas Tool
          </Button>
        </Tooltip>

        <Tooltip content="Open code editor">
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700 hover:scale-105 transition-all duration-200"
            onClick={onCodeCreation}
          >
            <Code className="w-4 h-4 mr-2" />
            Code Editor
          </Button>
        </Tooltip>

        <Tooltip content="Run in test environment">
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700 hover:scale-105 transition-all duration-200"
            onClick={onRunEnvironment}
          >
            <Play className="w-4 h-4 mr-2" />
            Run Environment
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
