
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { formSchema, type FormData, type FormErrors } from "./schema";
import { z } from "zod";

export const useContactForm = () => {
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
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      };

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

  return {
    formData,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
  };
};
