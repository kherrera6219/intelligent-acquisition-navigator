
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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
  );
};
