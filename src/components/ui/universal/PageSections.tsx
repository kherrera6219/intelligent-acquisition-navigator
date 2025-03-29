
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ContainerConstraint, ContainerSize } from './ContainerConstraint';
import { SectionTitle } from './SectionTitle';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  fullWidth = false,
}) => {
  return (
    <section 
      id={id} 
      className={cn('py-8', className)}
    >
      <ContainerConstraint 
        size={fullWidth ? 'full' : undefined}
      >
        {children}
      </ContainerConstraint>
    </section>
  );
};

interface HeroSectionProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  centered?: boolean;
  backgroundImage?: string;
  overlay?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  children,
  className,
  fullWidth = false,
  centered = false,
  backgroundImage,
  overlay = false,
}) => {
  return (
    <section 
      className={cn(
        'py-12 md:py-16 relative',
        backgroundImage && 'bg-cover bg-center',
        className
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      
      <ContainerConstraint 
        size={fullWidth ? 'full' : undefined}
      >
        <div className={cn(
          'relative z-10',
          centered && 'text-center mx-auto max-w-3xl'
        )}>
          <h1 className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
            backgroundImage && overlay && 'text-white'
          )}>
            {title}
          </h1>
          
          {description && (
            <p className={cn(
              'mt-4 text-lg text-muted-foreground',
              backgroundImage && overlay && 'text-white/80'
            )}>
              {description}
            </p>
          )}
          
          {children && (
            <div className={cn('mt-6', centered && 'flex justify-center')}>
              {children}
            </div>
          )}
        </div>
      </ContainerConstraint>
    </section>
  );
};

interface ContentSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  description,
  children,
  className,
  id,
  fullWidth = false,
}) => {
  return (
    <section id={id} className={cn('py-8 md:py-12', className)}>
      <ContainerConstraint 
        size={fullWidth ? 'full' : undefined}
      >
        {title && (
          <SectionTitle
            title={title}
            description={description}
            className="mb-8"
          />
        )}
        {children}
      </ContainerConstraint>
    </section>
  );
};
