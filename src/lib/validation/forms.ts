
import { z } from "zod";

// User form schemas
export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["USER", "ADMIN", "MANAGER"]),
});

// Profile form schema
export const profileSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  avatar: z.string().url("Invalid avatar URL").optional(),
  settings: z.object({
    emailNotifications: z.boolean(),
    theme: z.enum(["light", "dark", "system"]),
    language: z.string().min(2, "Invalid language code"),
  }),
});

// Contact form schema
export const contactSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  category: z.string().min(1, "Please select a category"),
  attachments: z.array(z.string().url("Invalid attachment URL")).optional(),
});

// Search query schema
export const searchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
  filters: z.record(z.string()).optional(),
  page: z.number().int().positive(),
  limit: z.number().int().min(1).max(100),
});

// API request validation schemas
export const apiRequestSchema = z.object({
  endpoint: z.string().url("Invalid API endpoint"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  headers: z.record(z.string()).optional(),
  body: z.any().optional(),
  timeout: z.number().positive().optional(),
});

// Error report schema
export const errorReportSchema = z.object({
  errorCode: z.string(),
  message: z.string(),
  stack: z.string().optional(),
  userAgent: z.string(),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

// Form submission handler type
export type FormSubmitHandler<T> = (values: T) => Promise<void>;

// Validation helper functions
export const validateForm = async <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ success: true; data: T } | { success: false; errors: z.ZodError }> => {
  try {
    const validData = await schema.parseAsync(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
};

export const validateField = <T>(
  schema: z.ZodSchema<T>,
  fieldName: keyof T,
  value: unknown
): string | null => {
  try {
    schema.shape[fieldName].parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || "Invalid value";
    }
    return "Validation failed";
  }
};
