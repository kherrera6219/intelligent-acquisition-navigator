
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/universal/StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "Procurity has completely transformed how our agency manages acquisition processes. The AI-powered insights have reduced our compliance issues by 87%.",
    author: "Sarah Johnson",
    title: "Contracting Officer, Department of Defense",
    rating: 5,
    image: "/assets/testimonials/sarah.jpg"
  },
  {
    quote: "The 4D Knowledge Framework seamlessly integrates federal, state, and local requirements. It's saved our legal team countless hours of review time.",
    author: "Michael Chen",
    title: "Legal Counsel, State of California",
    rating: 5,
    image: "/assets/testimonials/michael.jpg"
  },
  {
    quote: "As a county procurement specialist, I needed a solution that understood local regulations. Procurity exceeded my expectations on every level.",
    author: "David Rodriguez",
    title: "Procurement Manager, Miami-Dade County",
    rating: 4,
    image: "/assets/testimonials/david.jpg"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background to-background/90" />
      
      <Container className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trusted by <MsGradientText>Government Agencies</MsGradientText> Nationwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how procurement professionals are transforming their acquisition processes with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 p-6 h-full flex flex-col">
              <div className="mb-4">
                <StarRating rating={testimonial.rating} showScore={false} />
              </div>
              <p className="text-card-foreground italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center mt-auto">
                <Avatar className="h-10 w-10 mr-3 border border-border/50">
                  <AvatarImage src={testimonial.image} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
