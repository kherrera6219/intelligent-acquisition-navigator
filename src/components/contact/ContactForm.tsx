
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils"; // Added missing import
import { z } from "zod";

// Input validation schema
const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email cannot exceed 254 characters"),
  subject: z.string()
    .min(2, "Subject must be at least 2 characters")
    .max(200, "Subject cannot exceed 200 characters")
    .regex(/^[a-zA-Z0-9\s.,!?-]+$/, "Subject contains invalid characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters")
});

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sanitizeInput = (value: string): string => {
    // Basic XSS prevention
    return value
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .trim();
  };

  const validateField = (name: string, value: string) => {
    try {
      formSchema.shape[name as keyof typeof formSchema.shape].parse(value);
      setErrors(prev => ({ ...prev, [name]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all fields
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      };

      // Validate entire form
      formSchema.parse(sanitizedData);

      const response = await supabase.functions.invoke('handle-contact', {
        body: sanitizedData
      });

      if (response.error) throw response.error;

      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach(err => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      toast({
        title: "Error sending message",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
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
            className={cn(
              "bg-white/5 border-white/10 text-white",
              errors.name && "border-red-500 focus-visible:ring-red-500"
            )}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
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
            className={cn(
              "bg-white/5 border-white/10 text-white",
              errors.email && "border-red-500 focus-visible:ring-red-500"
            )}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
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
          className={cn(
            "bg-white/5 border-white/10 text-white",
            errors.subject && "border-red-500 focus-visible:ring-red-500"
          )}
          required
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Message
        </label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={cn(
            "bg-white/5 border-white/10 text-white h-32",
            errors.message && "border-red-500 focus-visible:ring-red-500"
          )}
          required
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>
      <GradientButton 
        type="submit" 
        className="w-full"
        gradientVariant="primary"
        loading={isSubmitting}
        disabled={isSubmitting || Object.keys(errors).length > 0}
      >
        Send Message
      </GradientButton>
    </form>
  );
};
