
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/universal/Card";

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  message?: string;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
  message = "Something went wrong"
}: ErrorFallbackProps) => {
  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <div className="flex flex-col items-center text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">{message}</h2>
        {error && (
          <p className="text-sm text-gray-400 mb-4">
            {error.message}
          </p>
        )}
        {resetErrorBoundary && (
          <Button
            onClick={resetErrorBoundary}
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                     hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
          >
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};
