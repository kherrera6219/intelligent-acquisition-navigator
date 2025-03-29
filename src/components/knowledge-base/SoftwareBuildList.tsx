
import React, { useState } from 'react';
import { SoftwareBuildItem } from "@/types/knowledge-base";
import { SoftwareBuildCard } from './SoftwareBuildCard';
import { BuildDetailModal } from './BuildDetailModal';
import { Grid } from '@/components/ui/universal/Grid';

interface SoftwareBuildListProps {
  builds: SoftwareBuildItem[];
  isLoading?: boolean;
}

export const SoftwareBuildList: React.FC<SoftwareBuildListProps> = ({ 
  builds, 
  isLoading = false 
}) => {
  const [selectedBuild, setSelectedBuild] = useState<SoftwareBuildItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuildClick = (build: SoftwareBuildItem) => {
    setSelectedBuild(build);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="w-full py-12 text-center text-muted-foreground">
        Loading software builds...
      </div>
    );
  }

  if (builds.length === 0) {
    return (
      <div className="w-full py-12 text-center text-muted-foreground">
        No software builds found.
      </div>
    );
  }

  return (
    <div className="w-full">
      <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {builds.map((build) => (
          <SoftwareBuildCard 
            key={build.id}
            build={build}
            onClick={handleBuildClick}
          />
        ))}
      </Grid>
      
      <BuildDetailModal
        build={selectedBuild}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
