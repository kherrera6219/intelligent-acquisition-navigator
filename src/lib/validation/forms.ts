
import { z } from "zod";

// Profile form schema
export const profileFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Pricing form schema
export const pricingFormSchema = z.object({
  organization: z.string().min(2, "Organization name is required"),
  userCount: z.number().min(1, "At least one user is required"),
  requirements: z.array(z.string()).optional(),
});

// Form submission schema
export const formSubmissionSchema = z.object({
  form_type: z.string(),
  form_data: z.record(z.unknown()),
});

// Export types
export type ProfileFormData = z.infer<typeof profileFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type PricingFormData = z.infer<typeof pricingFormSchema>;
export type FormSubmissionData = z.infer<typeof formSubmissionSchema>;
