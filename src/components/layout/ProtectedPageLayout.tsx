
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertCircle } from 'lucide-react';

interface ProtectedPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  isLoading?: boolean;
  error?: Error | null;
  breadcrumbs?: { label: string; href: string }[];
  action?: React.ReactNode;
}

export const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  children,
  title,
  description,
  isLoading = false,
  error = null,
  breadcrumbs,
  action,
}) => {
  return (
    <Container>
      <div className="py-6 animate-fade-in">
        <PageHeader
          title={title}
          description={description}
          breadcrumbs={breadcrumbs}
          action={action}
        />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoadingSpinner size="lg" />
            <span className="sr-only">Loading content</span>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 my-6">
            <div className="flex gap-3 items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-500">Error Loading Data</h3>
                <p className="text-gray-300 mt-1">
                  {error.message || "An unexpected error occurred. Please try again."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </Container>
  );
};
