
import { DashboardCard } from "@/components/layout/DashboardCard";
import { MetricData } from "@/domain/metrics/types";

interface MetricCardProps {
  metric: MetricData;
  className?: string;
}

export const MetricCard = ({ metric, className }: MetricCardProps) => {
  return (
    <DashboardCard
      icon={metric.icon}
      title={metric.title}
      className={className}
    >
      <div className="mt-3 sm:mt-4">
        <p className="text-xl sm:text-2xl font-bold text-white">{metric.value}</p>
        <p className="text-xs sm:text-sm text-gray-400">{metric.change}</p>
      </div>
    </DashboardCard>
  );
};
