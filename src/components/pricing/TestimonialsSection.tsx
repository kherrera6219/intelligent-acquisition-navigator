
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRating } from '@/components/ui/universal/StarRating';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';

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
    <div className="relative">
      {/* Background decor */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-blue-400 border-blue-400">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by Acquisition Professionals</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            See what our customers are saying about how our platform has transformed their procurement processes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500/50 transition-colors flex flex-col relative overflow-hidden group"
            >
              <Quote className="absolute top-4 right-4 text-blue-500/10 w-12 h-12 group-hover:text-blue-500/20 transition-colors" />
              
              <div className="flex items-center mb-4">
                <Avatar className="h-14 w-14 mr-4 border-2 border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-blue-950 text-blue-300">{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-blue-400">{testimonial.role}</p>
                </div>
              </div>
              
              <StarRating score={testimonial.score} showScore={true} className="mb-4" />
              
              <p className="text-gray-300 italic flex-grow text-lg leading-relaxed">"{testimonial.content}"</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
