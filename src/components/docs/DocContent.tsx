
import React from 'react';
import { DocItem } from './docsData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

interface DocContentProps {
  documents: DocItem[];
}

export const DocContent: React.FC<DocContentProps> = ({ documents }) => {
  return (
    <div className="space-y-6">
      {documents.map((doc) => (
        <Card key={doc.id} className="p-5 hover:shadow-md transition-shadow border-indigo-900/40 hover:border-indigo-500/50">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <Badge 
                variant={doc.level === 'beginner' ? 'default' : doc.level === 'intermediate' ? 'secondary' : 'destructive'}
                className="font-medium text-white"
              >
                {doc.level}
              </Badge>
              
              <div className="flex items-center text-sm text-yellow-300">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{doc.readTime} min read</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-cyan-400">
                {doc.title}
              </h3>
              
              <p className="text-green-300">
                {doc.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-sm text-amber-300">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>
                  Updated {formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}
                </span>
              </div>
              
              <Link 
                to={`/docs/${doc.slug}`} 
                className="flex items-center gap-1 text-fuchsia-400 hover:underline hover:text-fuchsia-300 transition-colors"
              >
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            
            {doc.externalUrl && (
              <a 
                href={doc.externalUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-2 text-sm bg-blue-900/30 hover:bg-blue-800/40 text-blue-300 px-3 py-1.5 rounded-md inline-flex items-center gap-1 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                Visit official acquisition resource
              </a>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
