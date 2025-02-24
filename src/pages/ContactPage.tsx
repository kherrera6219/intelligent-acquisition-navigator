
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GradientText } from "@/components/ui/universal/GradientText";
import { GlassCard } from "@/components/ui/universal/GlassCard";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await supabase.functions.invoke('handle-contact', {
        body: formData
      });

      if (response.error) throw response.error;

      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <GradientText>Get in Touch</GradientText>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white h-32"
                    required
                  />
                </div>
                <GradientButton 
                  type="submit" 
                  className="w-full"
                  gradientVariant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Send Message
                </GradientButton>
              </form>
            </GlassCard>
          </div>

          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", info: "contact@procurityiq.com" },
              { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
              { icon: MessageSquare, title: "Live Chat", info: "Available 24/7" }
            ].map((item, index) => (
              <GlassCard key={index}>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                                 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.info}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
