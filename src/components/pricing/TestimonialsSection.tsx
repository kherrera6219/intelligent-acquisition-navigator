
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRating } from '@/components/ui/universal/StarRating';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  score: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-white text-center mb-10">What Our Customers Say</h2>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index} 
            className="p-6 bg-gray-800 border-gray-700 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-4 border border-gray-700">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-white">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
            
            <StarRating score={testimonial.score} showScore={true} className="mb-3" />
            
            <p className="text-gray-300 italic flex-grow">"{testimonial.content}"</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
