
import React, { useState } from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ExternalPageLayout title="Contact Us" description="Get in touch with our team. We'd love to hear from you.">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have questions about our services? Looking to partner with us? Reach out and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-start space-x-4">
                <MailIcon className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white">Email Us</h3>
                  <p className="text-gray-400">Our friendly team is here to help.</p>
                  <a href="mailto:hello@akf.gov" className="text-blue-500 hover:text-blue-400 transition-colors">
                    hello@akf.gov
                  </a>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-start space-x-4">
                <PhoneIcon className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white">Call Us</h3>
                  <p className="text-gray-400">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+15555555555" className="text-blue-500 hover:text-blue-400 transition-colors">
                    +1 (555) 555-5555
                  </a>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-start space-x-4">
                <MapPinIcon className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white">Visit Us</h3>
                  <p className="text-gray-400">Come say hello at our office.</p>
                  <address className="not-italic text-gray-300">
                    1234 Government Ave.<br />
                    Washington, DC 20500
                  </address>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-gray-800 border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help you?"
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message..."
                    rows={6}
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <SendIcon className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </ExternalPageLayout>
  );
}
