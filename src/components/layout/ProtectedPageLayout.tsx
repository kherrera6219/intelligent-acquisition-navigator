
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertCircle } from 'lucide-react';
import { Link } from "react-router-dom";

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
        
        {/* Common footer navigation for internal pages */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-400">
              Need to navigate to another section?
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white">Dashboard</Link>
              <Link to="/knowledge-base" className="text-sm text-gray-300 hover:text-white">Knowledge Base</Link>
              <Link to="/federal-acquisition" className="text-sm text-gray-300 hover:text-white">Federal Acquisition</Link>
              <Link to="/texas-acquisition" className="text-sm text-gray-300 hover:text-white">Texas Acquisition</Link>
              <Link to="/solicitation-review" className="text-sm text-gray-300 hover:text-white">Solicitation Review</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
