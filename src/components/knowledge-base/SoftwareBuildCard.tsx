
import React from 'react';
import { SoftwareBuildItem } from "@/types/knowledge-base";
import { MsFluentCard, MsFluentCardHeader, MsFluentCardTitle, MsFluentCardContent } from '@/components/ui/MsFluentCard';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Server, Package } from 'lucide-react';

interface SoftwareBuildCardProps {
  build: SoftwareBuildItem;
  onClick: (build: SoftwareBuildItem) => void;
}

export const SoftwareBuildCard: React.FC<SoftwareBuildCardProps> = ({ build, onClick }) => {
  const statusColors = {
    development: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
    staging: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    production: "bg-green-500/15 text-green-500 border-green-500/30",
    archived: "bg-gray-500/15 text-gray-400 border-gray-500/30"
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <MsFluentCard 
      variant="interactive" 
      onClick={() => onClick(build)}
      className="ms-motion-fadeIn"
    >
      <MsFluentCardHeader>
        <div className="flex justify-between items-start">
          <MsFluentCardTitle className="line-clamp-1">{build.title}</MsFluentCardTitle>
          <Badge className={statusColors[build.status]}>{build.status}</Badge>
        </div>
      </MsFluentCardHeader>
      
      <MsFluentCardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{build.description}</p>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Build date: {formatDate(build.buildDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            <span>Version: {build.version}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Server className="h-3.5 w-3.5" />
            <span>Build: #{build.buildNumber}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {build.tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/20 text-muted-foreground"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </MsFluentCardContent>
    </MsFluentCard>
  );
};
