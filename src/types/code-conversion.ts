
export interface ConversionResult {
  originalCode: string;
  convertedCode: string;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  debugNotes: string[];
}

export interface ValidationError {
  line: number;
  message: string;
  severity: 'error';
  code: string;
}

export interface ValidationWarning {
  line: number;
  message: string;
  severity: 'warning';
  code: string;
}
