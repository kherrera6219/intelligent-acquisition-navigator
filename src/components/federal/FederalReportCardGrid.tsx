
import React from 'react';
import { FederalReportCard, ReportCardProps } from './FederalReportCard';

export interface FederalReportCardGridProps {
  reports: ReportCardProps[];
  onCardClick?: (id: number) => void;
  className?: string;
}

export const FederalReportCardGrid: React.FC<FederalReportCardGridProps> = ({
  reports = [], // Provide default empty array
  onCardClick,
  className
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className || ''}`}>
      {reports.map((report, index) => (
        <FederalReportCard
          key={index}
          {...report}
          onClick={onCardClick ? () => onCardClick(index) : undefined}
        />
      ))}
    </div>
  );
};
