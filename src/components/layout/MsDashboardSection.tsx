
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface MsDashboardSectionProps {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: 'default' | 'card' | 'borderless';
  fullWidth?: boolean;
}

export function MsDashboardSection({
  children,
  title,
  description,
  className,
  action,
  variant = 'default',
  fullWidth = false,
}: MsDashboardSectionProps) {
  const content = (
    <>
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        
        {action && (
          action.href ? (
            <Link 
              to={action.href} 
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              {action.label}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )
        )}
      </div>
      {children}
    </>
  );
  
  if (variant === 'card') {
    return (
      <Card 
        variant="ms-fluent" 
        className={cn("p-6 mb-6", !fullWidth && "max-w-full", className)}
      >
        {content}
      </Card>
    );
  }
  
  if (variant === 'borderless') {
    return (
      <div className={cn("mb-6", className)}>
        {content}
      </div>
    );
  }
  
  return (
    <section className={cn("mb-8 pb-2 border-b border-border/40", className)}>
      {content}
    </section>
  );
}
