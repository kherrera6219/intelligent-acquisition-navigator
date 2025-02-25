
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const SectionLoader = () => (
  <div className="w-full min-h-[200px] flex items-center justify-center bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 backdrop-blur-sm animate-pulse">
    <LoadingSpinner size="md" />
  </div>
);
