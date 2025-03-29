
import React, { useState } from 'react';
import { Container } from '@/components/ui/universal/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import { TestimonialData } from './types';

interface TestimonialGridProps {
  testimonials: TestimonialData[];
  filter: string;
  sortByRating: boolean;
}

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({ 
  testimonials,
  filter,
  sortByRating
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  
  const filteredTestimonials = testimonials
    .filter(t => filter === 'all' || t.sector === filter)
    .sort((a, b) => {
      if (sortByRating) {
        return b.score - a.score;
      }
      return 0; // Default order
    });

  const displayedTestimonials = expanded 
    ? filteredTestimonials 
    : filteredTestimonials.slice(0, 6);

  return (
    <div className="py-16">
      <Container>
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">Customer Stories</Badge>
          <h2 className="text-3xl font-bold">What Our Clients Say</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Browse testimonials from procurement professionals across all levels of government
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial}
            />
          ))}
        </div>
        
        {filteredTestimonials.length > 6 && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show More ({filteredTestimonials.length - 6} more)
                </>
              )}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};
