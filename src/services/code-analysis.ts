
import { ConversionResult, ValidationError, ValidationWarning } from "@/types/code-conversion";

// Common Python to TypeScript type mappings
const typeMap: Record<string, string> = {
  'str': 'string',
  'int': 'number',
  'float': 'number',
  'bool': 'boolean',
  'list': 'Array',
  'dict': 'Record',
  'None': 'null',
  'Any': 'any'
};

export const analyzePythonCode = (pythonCode: string): ConversionResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const debugNotes: string[] = [];
  let convertedCode = pythonCode;

  try {
    // Convert Python function definitions
    convertedCode = convertedCode.replace(
      /def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*?)\):/g,
      (_, funcName, params) => {
        const convertedParams = convertParameters(params);
        return `function ${funcName}(${convertedParams}): any {`;
      }
    );

    // Convert Python classes
    convertedCode = convertedCode.replace(
      /class\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:\((.*?)\))?:/g,
      (_, className, inheritance) => {
        const extendsClause = inheritance ? ` extends ${inheritance}` : '';
        return `class ${className}${extendsClause} {`;
      }
    );

    // Convert Python list comprehensions to map/filter
    convertedCode = convertedCode.replace(
      /\[(.*?) for (.*?) in (.*?) if (.*?)\]/g,
      (_, select, item, items, condition) => {
        return `${items}.filter(${item} => ${condition}).map(${item} => ${select})`;
      }
    );

    // Add types for variables with type hints
    convertedCode = convertedCode.replace(
      /([a-zA-Z_][a-zA-Z0-9_]*): ([a-zA-Z_][a-zA-Z0-9_]*)/g,
      (_, varName, pyType) => {
        const tsType = typeMap[pyType] || 'any';
        return `${varName}: ${tsType}`;
      }
    );

    // Add semicolons where needed
    convertedCode = addSemicolons(convertedCode);

    // Validate converted code
    validateTypeScriptCode(convertedCode, errors, warnings);

  } catch (error) {
    errors.push({
      line: 0,
      message: `Conversion error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      severity: 'error',
      code: 'CONV001'
    });
  }

  return {
    originalCode: pythonCode,
    convertedCode,
    errors,
    warnings,
    debugNotes
  };
};

function convertParameters(params: string): string {
  if (!params.trim()) return '';
  
  return params.split(',')
    .map(param => {
      const [name, type] = param.trim().split(':');
      const tsType = type ? typeMap[type.trim()] || 'any' : 'any';
      return `${name}: ${tsType}`;
    })
    .join(', ');
}

function addSemicolons(code: string): string {
  return code.split('\n')
    .map(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && 
          !trimmedLine.endsWith('{') && 
          !trimmedLine.endsWith('}') && 
          !trimmedLine.endsWith(';')) {
        return line + ';';
      }
      return line;
    })
    .join('\n');
}

function validateTypeScriptCode(
  code: string, 
  errors: ValidationError[], 
  warnings: ValidationWarning[]
) {
  // Basic syntax validation
  const lines = code.split('\n');
  lines.forEach((line, index) => {
    // Check for potential type issues
    if (line.includes('any')) {
      warnings.push({
        line: index + 1,
        message: 'Consider adding a more specific type instead of "any"',
        severity: 'warning',
        code: 'WARN001'
      });
    }

    // Check for proper function return types
    if (line.includes('function') && !line.includes('):')) {
      warnings.push({
        line: index + 1,
        message: 'Function is missing return type annotation',
        severity: 'warning',
        code: 'WARN002'
      });
    }

    // Check for proper error handling
    if (line.includes('try') && !code.includes('catch')) {
      errors.push({
        line: index + 1,
        message: 'Try block must have corresponding catch block',
        severity: 'error',
        code: 'ERR001'
      });
    }
  });
}
