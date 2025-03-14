
import React from 'react';
import { Container } from '@/components/ui/universal/Grid';
import { Avatar } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "ProcurityIQ has transformed our procurement processes, saving us countless hours and ensuring compliance with changing regulations.",
      author: "Sarah Johnson",
      position: "Chief Procurement Officer",
      organization: "Federal Agency"
    },
    {
      quote: "The AI-powered insights have helped us make better vendor decisions and improve our overall acquisition strategy.",
      author: "Michael Chen",
      position: "Contracts Manager",
      organization: "State Government"
    },
    {
      quote: "Implementation was smooth, and the ROI has been remarkable. We've reduced compliance risks by over 40%.",
      author: "David Rodriguez",
      position: "Director of Operations",
      organization: "Local Government"
    }
  ];

  return (
    <Container>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Trusted by procurement teams across federal, state, and local governments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="bg-[#1A1F2C]/50 border border-[#9b87f5]/20 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
          >
            <Quote className="h-8 w-8 text-[#9b87f5] mb-4 opacity-70" />
            <p className="italic text-gray-200 mb-6">{testimonial.quote}</p>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-4 border-2 border-[#9b87f5]/30">
                <div className="bg-[#9b87f5]/20 h-full w-full flex items-center justify-center">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
              </Avatar>
              <div>
                <h4 className="font-medium text-white">{testimonial.author}</h4>
                <p className="text-sm text-gray-400">{testimonial.position}, {testimonial.organization}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
