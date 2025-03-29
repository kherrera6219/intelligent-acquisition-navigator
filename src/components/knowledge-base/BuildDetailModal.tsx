
import React from 'react';
import { SoftwareBuildItem } from "@/types/knowledge-base";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { MsFluentButton } from "@/components/ui/MsFluentButton";
import { Calendar, Tag, Server, Package, Code, ExternalLink, Github, Check } from 'lucide-react';

interface BuildDetailModalProps {
  build: SoftwareBuildItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BuildDetailModal: React.FC<BuildDetailModalProps> = ({ build, isOpen, onClose }) => {
  if (!build) return null;

  const statusColors = {
    development: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
    staging: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    production: "bg-green-500/15 text-green-500 border-green-500/30",
    archived: "bg-gray-500/15 text-gray-400 border-gray-500/30"
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] border-border/50 backdrop-blur-sm bg-card/90">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle>{build.title}</DialogTitle>
            <Badge className={statusColors[build.status]}>{build.status}</Badge>
          </div>
          <DialogDescription>
            {build.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Build Information</h4>
              <div className="ms-v-stack-sm">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Build date: {formatDate(build.buildDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>Version: {build.version}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Server className="h-4 w-4" />
                  <span>Build: #{build.buildNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Github className="h-4 w-4" />
                  <span>Repository: {build.repository}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Platform Support</h4>
              <div className="ms-v-stack-sm">
                {build.platform.map((platform, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Dependencies</h4>
            <div className="flex flex-wrap gap-2">
              {build.dependencies.map((dep, index) => (
                <Badge key={index} variant="outline" className="bg-secondary/20">
                  <Code className="h-3 w-3 mr-1" />
                  {dep}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Requirements</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {build.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {build.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <MsFluentButton
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </MsFluentButton>
          <MsFluentButton 
            className="w-full sm:w-auto"
            icon={<ExternalLink className="h-4 w-4" />}
          >
            View Documentation
          </MsFluentButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
