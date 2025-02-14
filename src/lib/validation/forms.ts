
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const pricingFormSchema = z.object({
  organization: z.string().min(2, "Organization name is required"),
  userCount: z.number().min(1, "At least one user is required"),
  requirements: z.array(z.string()).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type PricingFormData = z.infer<typeof pricingFormSchema>;
