
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";

export const PageLoader = () => (
  <Container className="py-8">
    <Card className="w-full p-6 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </Card>
  </Container>
);
