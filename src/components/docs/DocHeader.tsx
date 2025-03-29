
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { DocItem } from './docsData';

interface DocHeaderProps {
  doc: DocItem;
}

export const DocHeader: React.FC<DocHeaderProps> = ({ doc }) => {
  return (
    <div className="space-y-4">
      <Link to="/docs" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to All Documents
      </Link>
      
      <div>
        <Badge 
          variant={doc.level === 'beginner' ? 'default' : doc.level === 'intermediate' ? 'secondary' : 'destructive'}
          className="font-medium"
        >
          {doc.level}
        </Badge>
        
        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-cyan-400">{doc.title}</h1>
        
        <p className="text-green-300 mt-2 max-w-3xl">
          {doc.description}
        </p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center text-sm text-amber-300">
            <Clock className="h-4 w-4 mr-1" />
            <span>{doc.readTime} min read</span>
          </div>
          
          <div className="flex items-center text-sm text-amber-300">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              Updated {formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        {doc.externalUrl && (
          <a 
            href={doc.externalUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-900/40 hover:bg-blue-800/50 text-blue-300 font-medium rounded-md transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View Official Acquisition Resource
          </a>
        )}
      </div>
    </div>
  );
};
