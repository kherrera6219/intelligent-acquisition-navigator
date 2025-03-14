
export interface ValidationError {
  line: number;
  message: string;
  severity: 'error' | 'warning';
  code: string;
}

export interface ValidationWarning {
  line: number;
  message: string;
  severity: 'warning' | 'info';
  code: string;
}

export interface ConversionResult {
  originalCode: string;
  convertedCode: string;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  debugNotes: string[];
}
