
import { SoftwareBuildItem } from "@/types/knowledge-base";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Code, 
  Github, 
  Package, 
  Server, 
  Tag
} from "lucide-react";

interface SoftwareBuildCardProps {
  build: SoftwareBuildItem;
  onClick: (build: SoftwareBuildItem) => void;
}

export const SoftwareBuildCard = ({ build, onClick }: SoftwareBuildCardProps) => {
  const statusColors = {
    development: "bg-blue-500",
    staging: "bg-yellow-500",
    production: "bg-green-500",
    archived: "bg-gray-500"
  };

  return (
    <Card 
      className="p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-800 bg-gray-900/60"
      onClick={() => onClick(build)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg">{build.title}</h3>
        <Badge className={statusColors[build.status]}>
          {build.status}
        </Badge>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {build.description}
      </p>
      
      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-gray-400" />
          <span>v{build.version}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-gray-400" />
          <span>Build #{build.buildNumber}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>{new Date(build.buildDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4 text-gray-400" />
          <span className="truncate">{build.repository.split('/').pop()}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-1">
          <Server className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400">Platforms:</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {build.platform.map(platform => (
            <Badge key={platform} variant="outline" className="text-xs py-0">
              {platform}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400">Dependencies:</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {build.dependencies.slice(0, 3).map(dep => (
            <Badge key={dep} variant="outline" className="text-xs py-0">
              {dep}
            </Badge>
          ))}
          {build.dependencies.length > 3 && (
            <Badge variant="outline" className="text-xs py-0">
              +{build.dependencies.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};
