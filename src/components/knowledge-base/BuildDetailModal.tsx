
import { SoftwareBuildItem } from "@/types/knowledge-base";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Code, 
  ExternalLink, 
  Github, 
  Package, 
  Server 
} from "lucide-react";

interface BuildDetailModalProps {
  build: SoftwareBuildItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BuildDetailModal = ({ 
  build, 
  isOpen, 
  onClose 
}: BuildDetailModalProps) => {
  if (!build) return null;

  const statusColors = {
    development: "bg-blue-500",
    staging: "bg-yellow-500",
    production: "bg-green-500",
    archived: "bg-gray-500"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">{build.title}</DialogTitle>
            <Badge className={statusColors[build.status]}>
              {build.status}
            </Badge>
          </div>
          <DialogDescription>
            {build.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">Version</div>
                <div>{build.version} (Build #{build.buildNumber})</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">Build Date</div>
                <div>{new Date(build.buildDate).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">Repository</div>
                <a 
                  href={build.repository} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1"
                >
                  {build.repository}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-5 w-5 text-gray-400" />
                <div className="text-sm text-gray-400">Platforms</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {build.platform.map(platform => (
                  <Badge key={platform} variant="outline">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-gray-400" />
                <div className="text-sm text-gray-400">Dependencies</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {build.dependencies.map(dep => (
                  <Badge key={dep} variant="outline">
                    {dep}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h3 className="font-medium mb-2">Requirements</h3>
          <ul className="list-disc list-inside space-y-1 pl-4">
            {build.requirements.map((req, index) => (
              <li key={index} className="text-sm">{req}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {build.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
