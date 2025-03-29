
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { TestimonialCard } from './TestimonialCard';
import { TestimonialData } from './types';

interface FeaturedTestimonialsProps {
  testimonials: TestimonialData[];
}

export const FeaturedTestimonials: React.FC<FeaturedTestimonialsProps> = ({ testimonials }) => {
  const featuredTestimonials = testimonials.filter(t => t.featured);
  
  if (featuredTestimonials.length === 0) return null;
  
  return (
    <div className="py-16 bg-gradient-to-b from-gray-900/30 to-background">
      <Container>
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Testimonials</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {featuredTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial} 
              variant="featured" 
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
