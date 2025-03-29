
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
        <Card key={doc.id} className="p-5 hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <Badge variant={doc.level === 'beginner' ? 'default' : doc.level === 'intermediate' ? 'secondary' : 'destructive'}>
                {doc.level}
              </Badge>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{doc.readTime} min read</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {doc.title}
              </h3>
              
              <p className="text-muted-foreground">
                {doc.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>
                  Updated {formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}
                </span>
              </div>
              
              <Link 
                to={`/docs/${doc.slug}`} 
                className="flex items-center gap-1 text-primary hover:underline"
              >
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
