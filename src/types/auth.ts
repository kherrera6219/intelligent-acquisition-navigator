
export interface FormErrors {
  email?: string;
  password?: string;
}

export interface AuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}
