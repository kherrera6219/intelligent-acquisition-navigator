
import React from 'react';
import { Helmet } from 'react-helmet';
import { BreadcrumbNavigation, BreadcrumbItem } from '@/components/ui/universal/BreadcrumbNavigation';
import { AccessibilityEnhancements } from '@/components/ui/universal/AccessibilityEnhancements';
import { PageTransition } from '@/components/ui/universal/PageTransition';
import { ContainerConstraint } from '@/components/ui/universal/ContainerConstraint';

interface ProtectedPageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  containerWidth?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
}

export const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  title,
  description,
  children,
  breadcrumbs,
  containerWidth = 'default',
  className,
}) => {
  const containerSizes = {
    'default': false,
    'narrow': 'narrow',
    'wide': 'wide',
    'full': true
  } as const;
  
  return (
    <AccessibilityEnhancements title={`${title} | ProcurityIQ`} description={description}>
      <Helmet>
        <title>{title} | ProcurityIQ</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      
      <PageTransition>
        <ContainerConstraint 
          fullWidth={containerSizes[containerWidth] === true} 
          size={containerSizes[containerWidth] !== true ? containerSizes[containerWidth] : undefined}
          className={className}
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <BreadcrumbNavigation items={breadcrumbs} className="pt-4" />
          )}
          
          <div className="py-4">
            {children}
          </div>
        </ContainerConstraint>
      </PageTransition>
    </AccessibilityEnhancements>
  );
};
