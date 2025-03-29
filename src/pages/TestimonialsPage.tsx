
import React, { useState } from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Quote, Star, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { StarRating } from '@/components/ui/universal/StarRating';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Mock testimonial data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Procurement Director",
    organization: "Federal Agency",
    content: "ProcurityIQ has transformed our procurement processes, saving us countless hours and ensuring compliance with changing regulations. The AI-powered insights have been invaluable for our team.",
    image: "",
    score: 5,
    sector: "federal",
    featured: true
  },
  {
    name: "Michael Chen",
    role: "Chief Acquisition Officer",
    organization: "State Government",
    content: "The AI-powered insights have helped us identify patterns in our procurement data that we never would have seen otherwise. It's like having a procurement expert available 24/7.",
    image: "",
    score: 4.5,
    sector: "state",
    featured: true
  },
  {
    name: "Robert Williams",
    role: "Technology Director",
    organization: "County Office",
    content: "Implementation was seamless, and the ROI was evident within the first quarter. The system has paid for itself through efficiency gains and error reduction.",
    image: "",
    score: 5,
    sector: "local",
    featured: false
  },
  {
    name: "Jennifer Garcia",
    role: "Procurement Specialist",
    organization: "City Government",
    content: "The document management system integrates perfectly with our existing workflows. We've reduced processing time by over 40% since implementation.",
    image: "",
    score: 4.5,
    sector: "local",
    featured: false
  },
  {
    name: "David Rodriguez",
    role: "Director of Operations",
    organization: "Local Government",
    content: "We've reduced compliance risks by over 40%. The automated checks have caught issues that would have otherwise gone unnoticed until audit time.",
    image: "",
    score: 5,
    sector: "local",
    featured: false
  },
  {
    name: "Karen Thompson",
    role: "Compliance Officer",
    organization: "Federal Department",
    content: "The compliance features are exceptional. We're always up-to-date with the latest regulations, and the system alerts us to any potential issues before they become problems.",
    image: "",
    score: 4.5,
    sector: "federal",
    featured: false
  },
  {
    name: "Thomas Anderson",
    role: "IT Manager",
    organization: "State Agency",
    content: "The platform's security features give us peace of mind when handling sensitive procurement data. The audit trails are comprehensive and easy to review.",
    image: "",
    score: 5,
    sector: "state",
    featured: false
  },
  {
    name: "Elizabeth Wilson",
    role: "Budget Director",
    organization: "Municipal Government",
    content: "The cost tracking capabilities have improved our budget forecasting significantly. We can now allocate resources more effectively across all departments.",
    image: "",
    score: 4.5,
    sector: "local",
    featured: false
  }
];

const TestimonialsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sortByRating, setSortByRating] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleFilterChange = (sector: string) => {
    setFilter(sector);
  };

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

  const featuredTestimonials = testimonials.filter(t => t.featured);

  return (
    <ExternalPageLayout
      title="Customer Testimonials | ProcurityIQ"
      description="Hear from our satisfied customers across government agencies"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background to-background/80 py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">
              Our Customers <MsGradientText>Love</MsGradientText> What We Do
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Don't just take our word for it. See what government procurement professionals 
              have to say about how ProcurityIQ has transformed their acquisition processes.
            </p>
            <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
              <Badge 
                variant={filter === 'all' ? 'default' : 'outline'} 
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/80 transition-colors"
                onClick={() => handleFilterChange('all')}
              >
                All Sectors
              </Badge>
              <Badge 
                variant={filter === 'federal' ? 'default' : 'outline'} 
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/80 transition-colors"
                onClick={() => handleFilterChange('federal')}
              >
                Federal
              </Badge>
              <Badge 
                variant={filter === 'state' ? 'default' : 'outline'} 
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/80 transition-colors"
                onClick={() => handleFilterChange('state')}
              >
                State
              </Badge>
              <Badge 
                variant={filter === 'local' ? 'default' : 'outline'} 
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/80 transition-colors"
                onClick={() => handleFilterChange('local')}
              >
                Local
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      {/* Filter and Sort Controls */}
      <div className="py-4 bg-muted/10">
        <Container>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter & Sort</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSortByRating(!sortByRating)}
              className="flex items-center gap-1 text-xs"
            >
              <Star className="h-3 w-3" />
              {sortByRating ? "Highest Rated First" : "Default Order"}
            </Button>
          </div>
        </Container>
      </div>

      {/* Featured Testimonials */}
      <div className="py-16 bg-gradient-to-b from-gray-900/30 to-background">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Testimonials</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-6 bg-card/30 backdrop-blur-sm border border-primary/20 shadow-md relative overflow-hidden group hover:border-primary/40 transition-all duration-300"
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
            ))}
          </div>
        </Container>
      </div>

      {/* All Testimonials Grid */}
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
              <Card 
                key={index} 
                className={cn(
                  "p-5 border border-border/60 h-full flex flex-col transform transition-all duration-300 hover:shadow-lg",
                  "hover:-translate-y-1 hover:border-border/80"
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
