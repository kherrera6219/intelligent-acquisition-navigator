
import React, { useState } from 'react';
import { SoftwareBuildItem } from "@/types/knowledge-base";
import { SoftwareBuildCard } from './SoftwareBuildCard';
import { BuildDetailModal } from './BuildDetailModal';
import { MsDashboardGrid } from '@/components/layout/MsDashboardGrid';

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
      <MsDashboardGrid columns={3} gap="md">
        {builds.map((build) => (
          <SoftwareBuildCard 
            key={build.id}
            build={build}
            onClick={handleBuildClick}
          />
        ))}
      </MsDashboardGrid>
      
      <BuildDetailModal
        build={selectedBuild}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
