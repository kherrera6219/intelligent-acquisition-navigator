
import React from 'react';
import { cn } from '@/lib/utils';
import { ContainerConstraint } from './ContainerConstraint';
import { SectionTitle } from '../SectionTitle';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  fullWidth?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  image,
  className,
  children,
  align = 'center',
  fullWidth = false,
}) => {
  return (
    <section className={cn(
      'py-16 md:py-24 relative overflow-hidden',
      className
    )}>
      {image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt="" 
            className="w-full h-full object-cover opacity-15" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/60" />
        </div>
      )}
      
      <ContainerConstraint fullWidth={fullWidth}>
        <div className={cn(
          'relative z-10 max-w-3xl mx-auto',
          align === 'left' && 'text-left ml-0 mr-auto',
          align === 'center' && 'text-center mx-auto',
          align === 'right' && 'text-right mr-0 ml-auto',
        )}>
          <h1 className="ms-heading-1">{title}</h1>
          {subtitle && <p className="ms-text-xl ms-text-muted mt-4">{subtitle}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </ContainerConstraint>
    </section>
  );
};

interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  fullWidth?: boolean;
  background?: 'default' | 'muted' | 'accent';
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  subtitle,
  className,
  children,
  align = 'left',
  fullWidth = false,
  background = 'default',
}) => {
  const bgClasses = {
    'default': '',
    'muted': 'bg-muted/30',
    'accent': 'bg-primary/5',
  };
  
  return (
    <section className={cn(
      'py-12 md:py-16',
      bgClasses[background],
      className
    )}>
      <ContainerConstraint fullWidth={fullWidth}>
        {(title || subtitle) && (
          <SectionTitle 
            title={title || ''} 
            subtitle={subtitle} 
            align={align} 
            className="mb-8" 
          />
        )}
        {children}
      </ContainerConstraint>
    </section>
  );
};

interface FeatureGridProps {
  columns?: 2 | 3 | 4;
  className?: string;
  children: React.ReactNode;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  columns = 3,
  className,
  children,
}) => {
  return (
    <div className={cn(
      'grid gap-6 md:gap-8',
      columns === 2 && 'md:grid-cols-2',
      columns === 3 && 'md:grid-cols-3',
      columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
      className
    )}>
      {children}
    </div>
  );
};

interface CtaSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title,
  subtitle,
  children,
  className,
  fullWidth = false,
}) => {
  return (
    <section className={cn(
      'py-12 md:py-20 bg-primary/5 border-t border-b border-primary/10',
      className
    )}>
      <ContainerConstraint fullWidth={fullWidth}>
        <div className="text-center">
          <h2 className="ms-heading-2">{title}</h2>
          {subtitle && <p className="ms-text-xl ms-text-muted mt-4 max-w-2xl mx-auto">{subtitle}</p>}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {children}
          </div>
        </div>
      </ContainerConstraint>
    </section>
  );
};
