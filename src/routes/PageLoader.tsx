
import React from 'react';
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";

interface PageLoaderProps {
  component?: React.ComponentType<any>;
  message?: string;
  variant?: 'default' | 'minimal' | 'fullscreen' | 'fluent' | 'ms-fluent' | 'shimmer';
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
  
  if (variant === 'fluent') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50">
        <div className="ms-fluent-panel p-8 loading-scale-in flex flex-col items-center">
          <div className="ms-loading-progress mb-4 w-[200px]"></div>
          <p className="text-lg font-semibold text-foreground mt-4 ms-loading-dots">{message}</p>
        </div>
      </div>
    );
  }
  
  if (variant === 'ms-fluent') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md z-50">
        <div className="text-center loading-scale-in max-w-md w-full">
          <div className="ms-fluent-panel py-12 px-8 flex flex-col items-center">
            <div className="mb-4 relative w-[220px] h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="ms-loading-progress-bar absolute inset-0 w-full h-full"></div>
            </div>
            <p className="text-xl font-medium text-foreground mt-4">{message}</p>
            <p className="text-sm text-muted-foreground mt-2 ms-loading-dots">Please wait</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'shimmer') {
    return (
      <Container className="py-8">
        <Card className="w-full p-6 flex flex-col space-y-6 min-h-[400px]">
          <div className="loading-skeleton h-8 w-[70%] rounded-md"></div>
          <div className="loading-skeleton h-4 w-[90%] rounded-md"></div>
          <div className="loading-skeleton h-4 w-[60%] rounded-md"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <div className="loading-skeleton h-32 rounded-md"></div>
            <div className="loading-skeleton h-32 rounded-md"></div>
            <div className="loading-skeleton h-32 rounded-md"></div>
          </div>
        </Card>
      </Container>
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
