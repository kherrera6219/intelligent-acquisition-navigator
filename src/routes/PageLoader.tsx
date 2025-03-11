
import React from 'react';
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";

interface PageLoaderProps {
  component?: React.ComponentType<any>;
  message?: string;
  variant?: 'default' | 'minimal' | 'fullscreen';
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  component: Component, 
  message = "Loading...",
  variant = 'default'
}) => {
  if (Component) {
    return <Component />;
  }
  
  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center p-4 min-h-[200px]">
        <LoadingSpinner size="md" />
      </div>
    );
  }
  
  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="text-center loading-scale-in">
          <LoadingSpinner size="lg" className="mx-auto" />
          <p className="mt-4 text-muted-foreground font-medium">{message}</p>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <Container className="py-8">
      <Card className="w-full p-6 flex items-center justify-center min-h-[400px] loading-card loading-card-hover">
        <div className="text-center loading-fade-in">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">{message}</p>
        </div>
      </Card>
    </Container>
  );
};
