
import React from 'react';
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";

interface PageLoaderProps {
  component?: React.ComponentType<any>;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ component: Component }) => {
  if (Component) {
    return <Component />;
  }
  
  return (
    <Container className="py-8">
      <Card className="w-full p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </Card>
    </Container>
  );
};
