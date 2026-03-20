
import { Skeleton } from "@/components/ui/skeleton";

interface PageSkeletonProps {
  /** Number of card rows to render */
  rows?: number;
}

/** Generic page-level skeleton shown while async content loads */
export const PageSkeleton = ({ rows = 3 }: PageSkeletonProps) => {
  return (
    <div className="space-y-6 animate-fade-in" aria-busy="true" aria-label="Loading page content">
      {/* Page header skeleton */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-56 bg-white/5 rounded-md" />
        <Skeleton className="h-4 w-80 bg-white/5 rounded-md" />
      </div>

      {/* Card rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, j) => (
            <Skeleton
              key={j}
              className="h-32 bg-white/5 rounded-lg"
              style={{ animationDelay: `${(i * 3 + j) * 60}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
