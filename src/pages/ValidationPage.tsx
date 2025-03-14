
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { validateCleanup } from '@/utils/validateCleanup';

const ValidationPage: React.FC = () => {
  const [validationOutput, setValidationOutput] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);

  // Capture console outputs during validation
  const captureConsoleOutput = () => {
    const originalLog = console.log;
    const originalError = console.error;
    const outputs: string[] = [];

    console.log = (...args) => {
      outputs.push(args.join(' '));
      originalLog(...args);
    };

    console.error = (...args) => {
      outputs.push(`ERROR: ${args.join(' ')}`);
      originalError(...args);
    };

    return {
      outputs,
      restore: () => {
        console.log = originalLog;
        console.error = originalError;
      }
    };
  };

  const runValidation = async () => {
    setIsValidating(true);
    setValidationOutput([]);
    setValidationComplete(false);
    
    const { outputs, restore } = captureConsoleOutput();
    
    try {
      await validateCleanup();
      const success = outputs.some(output => output.includes('SUCCESS'));
      setValidationSuccess(success);
    } catch (error) {
      outputs.push(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
      setValidationSuccess(false);
    } finally {
      restore();
      setValidationOutput(outputs);
      setIsValidating(false);
      setValidationComplete(true);
    }
  };

  return (
    <ProtectedPageLayout
      title="Code Cleanup Validation"
      description="Validate that code cleanup was performed successfully"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Validation', href: '/validation' }
      ]}
    >
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Cleanup Validation</h2>
          <p className="text-muted-foreground">
            This tool checks if all duplicate files have been removed and imports have been properly updated.
          </p>
        </div>

        <Button 
          onClick={runValidation} 
          disabled={isValidating}
          className="mb-6"
        >
          {isValidating ? 'Validating...' : 'Run Validation'}
        </Button>

        {validationOutput.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Validation Results</h3>
            <div className="bg-gray-800/50 rounded-md p-4 overflow-auto max-h-[400px]">
              <pre className="text-sm">
                {validationOutput.map((line, index) => (
                  <div 
                    key={index} 
                    className={`py-0.5 ${
                      line.includes('✅') ? 'text-green-400' : 
                      line.includes('❌') ? 'text-red-400' : 
                      line.includes('SUCCESS') ? 'text-green-500 font-semibold' : 
                      line.includes('ISSUES FOUND') ? 'text-red-500 font-semibold' : 
                      line.includes('ERROR') ? 'text-red-500' : 
                      line.trim() === '' ? 'py-2' : ''
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        )}

        {validationComplete && (
          <div className={`mt-6 p-4 rounded-md ${validationSuccess ? 'bg-green-800/20 border border-green-700' : 'bg-red-800/20 border border-red-700'}`}>
            <h3 className={`text-lg font-semibold ${validationSuccess ? 'text-green-400' : 'text-red-400'}`}>
              {validationSuccess ? 'Validation Successful ✅' : 'Validation Failed ❌'}
            </h3>
            <p className="mt-2">
              {validationSuccess 
                ? 'All files have been cleaned up properly. The duplicate files have been removed and imports have been updated.' 
                : 'Some issues were found during validation. Please check the validation results for details.'}
            </p>
          </div>
        )}
      </Card>
    </ProtectedPageLayout>
  );
};

export default ValidationPage;
