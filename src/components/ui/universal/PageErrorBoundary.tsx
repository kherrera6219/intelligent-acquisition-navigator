
import React from "react";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { ErrorFallback } from "./ErrorFallback";

interface PageErrorBoundaryProps {
  children: React.ReactNode;
}

export const PageErrorBoundary = ({ children }: PageErrorBoundaryProps) => {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};
