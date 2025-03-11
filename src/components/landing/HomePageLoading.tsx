
import React from 'react';
import { LoadingState } from "@/components/ui/universal/LoadingState";

export const HomePageLoading = () => {
  return (
    <div className="min-h-screen bg-[#1A1720] p-4 sm:p-6 lg:p-8 animate-fade-in">
      <LoadingState 
        variant="skeleton" 
        skeletonCount={4}
        skeletonClassName="h-[200px] w-full rounded-xl bg-white/5"
        className="max-w-7xl mx-auto space-y-6"
      />
    </div>
  );
};
