
import { z } from "zod";

export const formSchema = z.object({
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

export type FormData = z.infer<typeof formSchema>;
export type FormErrors = {
  [key: string]: string;
};
