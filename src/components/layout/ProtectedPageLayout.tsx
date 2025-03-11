
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/universal/Card";
import { AlertCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProtectedPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  isLoading?: boolean;
  error?: Error | null;
  breadcrumbs?: { label: string; href: string }[];
  action?: React.ReactNode;
  backLink?: { label: string; href: string };
  tags?: { label: string; color?: string }[];
  contentClassName?: string;
  fullWidth?: boolean;
  withCard?: boolean;
}

export const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  children,
  title,
  description,
  isLoading = false,
  error = null,
  breadcrumbs,
  action,
  backLink,
  tags,
  contentClassName,
  fullWidth = false,
  withCard = false,
}) => {
  return (
    <Container size={fullWidth ? "full" : "lg"} variant="ms-fluent">
      <div className="py-6 ms-motion-fadeIn">
        <PageHeader
          title={title}
          description={description}
          breadcrumbs={breadcrumbs}
          action={action}
          backLink={backLink}
          tags={tags}
          className="mb-6"
        />

        {/* Content Area */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoadingSpinner size="lg" />
            <span className="sr-only">Loading content</span>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-6">
            <div className="flex gap-3 items-start">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-destructive">Error Loading Data</h3>
                <p className="text-gray-300 mt-1">
                  {error.message || "An unexpected error occurred. Please try again."}
                </p>
              </div>
            </div>
          </div>
        ) : withCard ? (
          <Card variant="ms-fluent" className={cn("p-6", contentClassName)} hoverable>
            {children}
          </Card>
        ) : (
          <div className={cn("ms-content-card", contentClassName)}>
            {children}
          </div>
        )}
        
        {/* Common footer navigation for internal pages */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Need to navigate to another section?
            </div>
            <div className="ms-stack-horizontal flex-wrap gap-3">
              <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white">Dashboard</Link>
              <Link to="/knowledge-base" className="text-sm text-gray-300 hover:text-white">Knowledge Base</Link>
              <Link to="/federal-acquisition" className="text-sm text-gray-300 hover:text-white">Federal Acquisition</Link>
              <Link to="/texas-acquisition" className="text-sm text-gray-300 hover:text-white">Texas Acquisition</Link>
              <Link to="/solicitation-review" className="text-sm text-gray-300 hover:text-white">Solicitation Review</Link>
              <Link to="/document-control" className="text-sm text-gray-300 hover:text-white">Document Control</Link>
              <Link to="/market-research" className="text-sm text-gray-300 hover:text-white">Market Research</Link>
              <Link to="/compliance" className="text-sm text-gray-300 hover:text-white">Compliance</Link>
              <Link to="/legal-review" className="text-sm text-gray-300 hover:text-white">Legal Review</Link>
              <Link to="/small-business" className="text-sm text-gray-300 hover:text-white">Small Business</Link>
              <Link to="/quality-assurance" className="text-sm text-gray-300 hover:text-white">Quality Assurance</Link>
              <Link to="/source-selection" className="text-sm text-gray-300 hover:text-white">Source Selection</Link>
              <Link to="/contract-management" className="text-sm text-gray-300 hover:text-white">Contract Management</Link>
              <Link to="/sitemap" className="text-sm text-gray-300 hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
