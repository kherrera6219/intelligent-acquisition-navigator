
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudyProps {
  caseStudy: {
    id: string;
    title: string;
    summary: string;
    agency: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
    image: string;
  };
}

export const CaseStudyCard: React.FC<CaseStudyProps> = ({ caseStudy }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={caseStudy.image} 
          alt={caseStudy.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute top-4 right-4 bg-blue-700">{caseStudy.industry}</Badge>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold mb-1">{caseStudy.title}</h3>
        <div className="text-sm text-muted-foreground">{caseStudy.agency}</div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="mb-4">{caseStudy.summary}</p>
        
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">Challenge:</h4>
            <p className="text-sm">{caseStudy.challenge}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">Solution:</h4>
            <p className="text-sm">{caseStudy.solution}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">Results:</h4>
            <ul className="list-disc list-inside text-sm">
              {caseStudy.results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="ghost" 
          className="w-full justify-between"
          asChild
        >
          <Link to={`/case-studies/${caseStudy.id}`}>
            Read Full Case Study
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
