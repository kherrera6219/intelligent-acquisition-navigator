
import React from 'react';
import { Helmet } from 'react-helmet';
import { BreadcrumbNavigation, BreadcrumbItem } from '@/components/ui/universal/BreadcrumbNavigation';
import { AccessibilityEnhancements } from '@/components/ui/universal/AccessibilityEnhancements';
import { PageTransition } from '@/components/ui/universal/PageTransition';
import { ContainerConstraint, ContainerSize } from '@/components/ui/universal/ContainerConstraint';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export interface ProtectedPageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  containerWidth?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
  action?: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  backLink?: { label: string; href: string };
  fullWidth?: boolean;
}

export const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  title,
  description,
  children,
  breadcrumbs,
  containerWidth = 'default',
  className,
  action,
  isLoading = false,
  error,
  backLink,
  fullWidth = false,
}) => {
  const getContainerSize = (): ContainerSize => {
    if (containerWidth === 'default') return 'narrow';
    if (containerWidth === 'full' || fullWidth) return 'full';
    return containerWidth as ContainerSize;
  };
  
  return (
    <AccessibilityEnhancements title={`${title} | ProcurityIQ`} description={description}>
      <Helmet>
        <title>{title} | ProcurityIQ</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      
      <PageTransition>
        <ContainerConstraint 
          size={getContainerSize()} 
          className={className}
          fullWidth={fullWidth}
        >
          <div className="py-4">
            {backLink && (
              <div className="mb-4">
                <Button variant="ghost" size="sm" asChild>
                  <a href={backLink.href}><ArrowLeft className="mr-2 h-4 w-4" /> {backLink.label}</a>
                </Button>
              </div>
            )}
            
            {breadcrumbs && breadcrumbs.length > 0 && (
              <BreadcrumbNavigation items={breadcrumbs} className="mb-6" />
            )}
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
              </div>
              {action && <div className="mt-4 sm:mt-0">{action}</div>}
            </div>
            
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
                <span className="ml-3 text-muted-foreground">Loading...</span>
              </div>
            )}
            
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            
            {!isLoading && !error && children}
          </div>
        </ContainerConstraint>
      </PageTransition>
    </AccessibilityEnhancements>
  );
};

// Export BreadcrumbItem type without duplicating the ProtectedPageLayoutProps export
export type { BreadcrumbItem };
