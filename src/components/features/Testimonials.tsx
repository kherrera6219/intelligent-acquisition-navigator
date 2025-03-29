
import React from 'react';
import { cn } from '@/lib/utils';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  organization: string;
  imageSrc?: string;
  className?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role, 
  organization, 
  imageSrc,
  className
}) => {
  return (
    <div className={cn(
      "bg-card/30 backdrop-blur-sm border border-border/5 rounded-lg p-6 relative",
      className
    )}>
      <div className="absolute -top-3 -left-2 text-4xl text-primary opacity-50">"</div>
      <blockquote className="text-lg text-muted-foreground italic mb-4">
        {quote}
      </blockquote>
      <div className="flex items-center">
        {imageSrc && (
          <div className="mr-4">
            <img 
              src={imageSrc} 
              alt={author}
              className="h-12 w-12 rounded-full object-cover border-2 border-border/20"
            />
          </div>
        )}
        <div>
          <div className="font-medium">{author}</div>
          <div className="text-sm text-muted-foreground">
            {role}, {organization}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from government professionals who have transformed their acquisition processes with <MsGradientText>ProcurityIQ</MsGradientText>.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Testimonial 
          quote="This platform has revolutionized how we approach federal acquisitions. The compliance automation alone has saved us countless hours of manual checking."
          author="Sarah Johnson"
          role="Procurement Director"
          organization="Federal Agency"
          className="md:translate-y-8"
        />
        
        <Testimonial 
          quote="The AI-powered insights have helped us identify patterns in our procurement data that we never would have seen otherwise. It's like having a procurement expert available 24/7."
          author="Michael Chen"
          role="Chief Acquisition Officer"
          organization="State Government"
        />
        
        <Testimonial 
          quote="Implementation was seamless, and the ROI was evident within the first quarter. The system has paid for itself through efficiency gains and error reduction."
          author="Robert Williams"
          role="Technology Director"
          organization="County Office"
        />
        
        <Testimonial 
          quote="The document management system integrates perfectly with our existing workflows. We've reduced processing time by over 40% since implementation."
          author="Jennifer Garcia"
          role="Procurement Specialist"
          organization="City Government"
          className="md:translate-y-8"
        />
      </div>
    </div>
  );
};
