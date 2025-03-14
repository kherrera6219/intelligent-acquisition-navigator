
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { StarRating } from '@/components/ui/universal/StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Federal Contracting Officer",
    content: "ProcurityIQ has transformed our procurement process. We've reduced review time by 72% and improved compliance accuracy by 98%.",
    image: "/avatars/sarah.jpg",
    score: 5
  },
  {
    name: "Michael Chen",
    role: "City Procurement Manager",
    content: "The AI-powered compliance checks have saved our department countless hours and helped us avoid several potential issues before they became problems.",
    image: "/avatars/michael.jpg",
    score: 5
  },
  {
    name: "Jamal Williams",
    role: "State Acquisition Director",
    content: "We've been able to standardize our procurement processes across 12 different departments thanks to the platform's flexibility and powerful knowledge base.",
    image: "/avatars/jamal.jpg",
    score: 4
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      
      <Container className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trusted by <MsGradientText>Government Agencies</MsGradientText> Nationwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how procurement professionals across federal, state, and local levels are transforming their acquisition processes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 p-6 rounded-xl hover:border-primary/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12 border border-border/50">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <StarRating score={testimonial.score} showScore={true} />
              
              <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
