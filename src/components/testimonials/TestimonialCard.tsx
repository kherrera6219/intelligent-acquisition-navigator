
import React from 'react';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/universal/StarRating';
import { TestimonialData } from './types';

interface TestimonialCardProps {
  testimonial: TestimonialData;
  variant?: 'standard' | 'featured';
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  variant = 'standard',
  className
}) => {
  if (variant === 'featured') {
    return (
      <Card 
        className={cn(
          "p-6 bg-card/30 backdrop-blur-sm border border-primary/20 shadow-md relative overflow-hidden group hover:border-primary/40 transition-all duration-300",
          className
        )}
      >
        <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <Quote className="w-40 h-40 text-primary" />
        </div>
        <div className="mb-6">
          <StarRating score={testimonial.score} showScore={true} size="md" readOnly={true} />
        </div>
        <p className="text-lg italic mb-6 relative z-10">"{testimonial.content}"</p>
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4 border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
            <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </div>
          </Avatar>
          <div>
            <h3 className="font-semibold">{testimonial.name}</h3>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}, {testimonial.organization}
            </p>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card 
      className={cn(
        "p-5 border border-border/60 h-full flex flex-col transform transition-all duration-300 hover:shadow-lg",
        "hover:-translate-y-1 hover:border-border/80",
        className
      )}
    >
      <div className="flex items-center mb-4">
        <Avatar className="h-10 w-10 mr-3">
          <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </div>
        </Avatar>
        <div>
          <h3 className="font-medium text-sm">{testimonial.name}</h3>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex-grow">
        <p className="italic text-sm mb-3">"{testimonial.content}"</p>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <StarRating score={testimonial.score} showScore={false} size="sm" readOnly={true} />
        <Badge variant="outline" className="text-xs">
          {testimonial.sector === 'federal' ? 'Federal' : 
           testimonial.sector === 'state' ? 'State' : 'Local'}
        </Badge>
      </div>
    </Card>
  );
};
