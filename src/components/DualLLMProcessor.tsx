import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Shield } from "lucide-react";
import { processMasterLLM } from "@/services/llm/masterLLM";
import { checkCompliance } from "@/services/llm/complianceLLM";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DualLLMProcessorProps {
  input: string;
}

export const DualLLMProcessor: React.FC<DualLLMProcessorProps> = ({ input }) => {
  const masterQuery = useQuery({
    queryKey: ['masterLLM', input],
    queryFn: () => processMasterLLM(input),
    enabled: !!input,
  });

  const complianceQuery = useQuery({
    queryKey: ['complianceLLM', masterQuery.data?.suggestion],
    queryFn: () => checkCompliance(masterQuery.data?.suggestion || ''),
    enabled: !!masterQuery.data?.suggestion,
  });

  const isLoading = masterQuery.isLoading || complianceQuery.isLoading;
  const isError = masterQuery.isError || complianceQuery.isError;

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An error occurred while processing your request. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-500" />
            Dual LLM Analysis
          </CardTitle>
          <CardDescription>
            Master LLM suggestion with Compliance LLM verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {masterQuery.data && (
                <div className="space-y-2">
                  <h3 className="font-medium">Master LLM Suggestion</h3>
                  <p className="text-gray-600">{masterQuery.data.suggestion}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      Confidence: {(masterQuery.data.confidence * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              )}
              
              {complianceQuery.data && (
                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${
                      complianceQuery.data.approved ? 'text-green-500' : 'text-red-500'
                    }`} />
                    Compliance Check
                  </h3>
                  <p className="text-gray-600">{complianceQuery.data.reason}</p>
                  <Badge 
                    variant={
                      complianceQuery.data.riskLevel === 'low' ? 'default' :
                      complianceQuery.data.riskLevel === 'medium' ? 'secondary' : 'destructive'
                    }
                  >
                    Risk Level: {complianceQuery.data.riskLevel}
                  </Badge>
                  
                  {complianceQuery.data.suggestions && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Suggestions:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {complianceQuery.data.suggestions.map((suggestion, idx) => (
                          <li key={idx}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};