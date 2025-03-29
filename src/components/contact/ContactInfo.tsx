
import React from 'react';
import { MsFluentCard } from '@/components/ui/MsFluentCard';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

interface ContactDetailProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ icon, title, children }) => {
  return (
    <div className="flex items-start">
      <div className="mt-1 mr-4 p-2 rounded-full bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <div className="text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-8">
      <MsFluentCard className="p-6 md:p-8 bg-[#1A1F2C]/80 border border-border/10">
        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
        
        <div className="space-y-6">
          <ContactDetail icon={<MapPin className="h-5 w-5 text-primary" />} title="Office Location">
            <p>1234 Innovation Drive</p>
            <p>Suite 500</p>
            <p>Austin, TX 78701</p>
          </ContactDetail>
          
          <ContactDetail icon={<Phone className="h-5 w-5 text-primary" />} title="Phone">
            <p>Main: (512) 555-0123</p>
            <p>Support: (512) 555-0124</p>
          </ContactDetail>
          
          <ContactDetail icon={<Mail className="h-5 w-5 text-primary" />} title="Email">
            <p>info@procurityiq.com</p>
            <p>support@procurityiq.com</p>
          </ContactDetail>
          
          <ContactDetail icon={<Clock className="h-5 w-5 text-primary" />} title="Hours">
            <p>Monday - Friday: 8:00 AM - 6:00 PM CST</p>
            <p>Saturday - Sunday: Closed</p>
          </ContactDetail>
        </div>
      </MsFluentCard>
      
      <MsFluentCard className="p-6 md:p-8 bg-[#1A1F2C]/80 border border-border/10">
        <h2 className="text-2xl font-semibold mb-6">Looking for Support?</h2>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Our dedicated support team is here to help you with any technical issues or questions about our platform.
          </p>
          
          <div className="p-4 border border-primary/10 rounded-md bg-primary/5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Knowledge Base</h3>
                <p className="text-sm text-muted-foreground">
                  Find answers to common questions
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          <div className="p-4 border border-primary/10 rounded-md bg-primary/5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Support Portal</h3>
                <p className="text-sm text-muted-foreground">
                  Submit a ticket for technical help
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          <div className="p-4 border border-primary/10 rounded-md bg-primary/5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Training Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Access guides and video tutorials
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </MsFluentCard>
    </div>
  );
};
