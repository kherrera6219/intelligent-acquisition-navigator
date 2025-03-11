import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/universal/Card";
import { AlertCircle, Loader2 } from 'lucide-react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PageNetworkWrapper } from "@/components/ui/universal/PageNetworkWrapper";
import { NavigationSidebar } from './NavigationSidebar';
import { BackButton } from '@/components/navigation/BackButton';

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
  withNetwork?: boolean;
  hideFooterNav?: boolean;
  hideSidebar?: boolean;
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
  withNetwork = true,
  hideFooterNav = false,
  hideSidebar = false,
}) => {
  const content = (
    <div className="flex min-h-screen bg-background">
      {/* Navigation sidebar */}
      {!hideSidebar && <NavigationSidebar />}
      
      {/* Main content area with padding to accommodate sidebar */}
      <div className="flex-1 md:ml-64">
        <Container size={fullWidth ? "full" : "lg"} variant="ms-fluent">
          <div className="py-6 ms-motion-fadeIn">
            {/* Back button - Show either custom backLink or automatic back button */}
            {backLink ? (
              <div className="mb-4">
                <Link 
                  to={backLink.href}
                  className="text-muted-foreground hover:text-primary flex items-center group"
                >
                  <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  <span>{backLink.label}</span>
                </Link>
              </div>
            ) : (
              <BackButton />
            )}
            
            <PageHeader
              title={title}
              description={description}
              breadcrumbs={breadcrumbs}
              action={action}
              tags={tags}
              className="mb-6"
            />

            {/* Content Area */}
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px] ms-fluent-panel p-8">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
                  <p className="text-muted-foreground">Loading content...</p>
                </div>
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
            {!hideFooterNav && (
              <div className="mt-12 pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Need to navigate to another section?
                  </div>
                  <div className="ms-stack-horizontal flex-wrap gap-3">
                    <Link to="/dashboard" className="ms-nav-item">Dashboard</Link>
                    <Link to="/knowledge-base" className="ms-nav-item">Knowledge Base</Link>
                    <Link to="/federal-knowledge-base" className="ms-nav-item">Federal Knowledge</Link>
                    <Link to="/federal-acquisition" className="ms-nav-item">Federal Acquisition</Link>
                    <Link to="/texas-acquisition" className="ms-nav-item">Texas Acquisition</Link>
                    <Link to="/solicitation-review" className="ms-nav-item">Solicitation Review</Link>
                    <Link to="/document-control" className="ms-nav-item">Document Control</Link>
                    <Link to="/market-research" className="ms-nav-item">Market Research</Link>
                    <Link to="/compliance" className="ms-nav-item">Compliance</Link>
                    <Link to="/legal-review" className="ms-nav-item">Legal Review</Link>
                    <Link to="/small-business" className="ms-nav-item">Small Business</Link>
                    <Link to="/quality-assurance" className="ms-nav-item">Quality Assurance</Link>
                    <Link to="/source-selection" className="ms-nav-item">Source Selection</Link>
                    <Link to="/contract-management" className="ms-nav-item">Contract Management</Link>
                    <Link to="/settings" className="ms-nav-item">Settings</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );

  if (withNetwork) {
    return <PageNetworkWrapper>{content}</PageNetworkWrapper>;
  }

  return content;
};
