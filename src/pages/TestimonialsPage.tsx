
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { StarRating } from '@/components/ui/universal/StarRating';
import { Badge } from '@/components/ui/badge';

// Mock testimonial data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Procurement Director",
    organization: "Federal Agency",
    content: "ProcurityIQ has transformed our procurement processes, saving us countless hours and ensuring compliance with changing regulations. The AI-powered insights have been invaluable for our team.",
    image: "",
    score: 5
  },
  {
    name: "Michael Chen",
    role: "Chief Acquisition Officer",
    organization: "State Government",
    content: "The AI-powered insights have helped us identify patterns in our procurement data that we never would have seen otherwise. It's like having a procurement expert available 24/7.",
    image: "",
    score: 4.5
  },
  {
    name: "Robert Williams",
    role: "Technology Director",
    organization: "County Office",
    content: "Implementation was seamless, and the ROI was evident within the first quarter. The system has paid for itself through efficiency gains and error reduction.",
    image: "",
    score: 5
  },
  {
    name: "Jennifer Garcia",
    role: "Procurement Specialist",
    organization: "City Government",
    content: "The document management system integrates perfectly with our existing workflows. We've reduced processing time by over 40% since implementation.",
    image: "",
    score: 4.5
  },
  {
    name: "David Rodriguez",
    role: "Director of Operations",
    organization: "Local Government",
    content: "We've reduced compliance risks by over 40%. The automated checks have caught issues that would have otherwise gone unnoticed until audit time.",
    image: "",
    score: 5
  },
  {
    name: "Karen Thompson",
    role: "Compliance Officer",
    organization: "Federal Department",
    content: "The compliance features are exceptional. We're always up-to-date with the latest regulations, and the system alerts us to any potential issues before they become problems.",
    image: "",
    score: 4.5
  }
];

// Categorized testimonials for the sections
const federalTestimonials = testimonials.filter(t => 
  t.organization.includes("Federal"));
const stateLocalTestimonials = testimonials.filter(t => 
  !t.organization.includes("Federal"));

const TestimonialsPage: React.FC = () => {
  return (
    <ExternalPageLayout
      title="Customer Testimonials"
      description="Hear from our satisfied customers across government agencies"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background to-background/80 py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Our Customers <MsGradientText>Love</MsGradientText> What We Do
            </h1>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it. See what government procurement professionals 
              have to say about how ProcurityIQ has transformed their acquisition processes.
            </p>
          </div>
        </Container>
      </div>

      {/* Featured Testimonials */}
      <div className="py-16 bg-muted/30">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Testimonials</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-6 bg-card shadow-sm border border-border/80 relative overflow-hidden"
              >
                <Quote className="absolute top-4 right-4 text-primary/10 w-12 h-12" />
                <div className="mb-6">
                  <StarRating score={testimonial.score} showScore={true} />
                </div>
                <p className="text-lg italic mb-6 relative z-10">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-primary/20">
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
            ))}
          </div>
        </Container>
      </div>

      {/* Federal Agencies */}
      <div className="py-16">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Federal Agencies</Badge>
            <h2 className="text-3xl font-bold">Federal Procurement Success</h2>
            <p className="text-muted-foreground mt-2">
              Hear from federal agency users about their experience with our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {federalTestimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-5 border border-border/60 h-full flex flex-col"
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
                <div className="mt-3">
                  <StarRating score={testimonial.score} showScore={false} className="justify-end" />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* State & Local */}
      <div className="py-16 bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">State & Local</Badge>
            <h2 className="text-3xl font-bold">State & Local Government Success</h2>
            <p className="text-muted-foreground mt-2">
              Learn how state and local governments are benefiting
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {stateLocalTestimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-5 border border-border/60 h-full flex flex-col"
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
                <div className="mt-3">
                  <StarRating score={testimonial.score} showScore={false} className="justify-end" />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-b from-background/80 to-background">
        <Container size="md">
          <div className="text-center p-8 border border-border/40 rounded-lg bg-card/60 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Join Our Satisfied Customers</h2>
            <p className="text-muted-foreground mb-8">
              Experience how ProcurityIQ can transform your acquisition processes
              and help you achieve compliance with ease.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Request a Demo
              </a>
              <a 
                href="/pricing"
                className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </Container>
      </div>
    </ExternalPageLayout>
  );
};

export default TestimonialsPage;
