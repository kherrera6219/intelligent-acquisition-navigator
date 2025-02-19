
import '@testing-library/jest-dom';
import { analyzePythonCode } from '../../code-analysis';

describe('Code Analysis Integration Tests', () => {
  it('analyzes valid Python code correctly', () => {
    const pythonCode = `
def calculate_sum(a: int, b: int) -> int:
    return a + b
`;

    const result = analyzePythonCode(pythonCode);
    
    expect(result.errors).toHaveLength(0);
    expect(result.convertedCode).toContain('function calculateSum');
    expect(result.convertedCode).toContain(': number');
  });

  it('detects and reports errors in invalid code', () => {
    const invalidCode = `
def invalid_function(
    missing parenthesis
`;

    const result = analyzePythonCode(invalidCode);
    
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0].severity).toBe('error');
  });

  it('generates appropriate warnings for potential issues', () => {
    const codeWithWarnings = `
def process_data(data: any):
    pass
`;

    const result = analyzePythonCode(codeWithWarnings);
    
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0].code).toBe('WARN001');
  });
});
