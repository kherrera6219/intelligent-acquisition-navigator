
import { FormErrors, ValidationResult } from "@/types/auth";

export const validateAuthForm = (
  email: string,
  password: string,
  isSignUp: boolean
): ValidationResult => {
  const errors: FormErrors = {};

  // Email validation
  if (!email) {
    errors.email = "Email is required";
  } else {
    const sanitizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(sanitizedEmail)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (sanitizedEmail.length > 254) {
      errors.email = "Email address is too long";
    }
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required";
  } else if (isSignUp) {
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(password)) {
      errors.password = "Password must contain at least one special character (!@#$%^&*)";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
