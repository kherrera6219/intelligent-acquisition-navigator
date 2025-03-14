
import React from 'react';
import { Card } from '@/components/ui/card';
import { MarketResearchItem } from './MarketResearchTable';

interface MarketResearchDashboardProps {
  data: MarketResearchItem[];
}

const MarketResearchDashboard: React.FC<MarketResearchDashboardProps> = ({ data }) => {
  // Calculate statistics for the dashboard
  const totalVendors = data.length;
  const activeVendors = data.filter(item => item.status === 'active').length;
  const totalSpend = data.reduce((total, item) => total + item.price, 0);
  const averagePrice = totalVendors > 0 ? totalSpend / totalVendors : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Total Vendors</h3>
        <p className="text-2xl font-bold mt-1">{totalVendors}</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Active Vendors</h3>
        <p className="text-2xl font-bold mt-1">{activeVendors}</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Total Spend</h3>
        <p className="text-2xl font-bold mt-1">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(totalSpend)}
        </p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Average Price</h3>
        <p className="text-2xl font-bold mt-1">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(averagePrice)}
        </p>
      </Card>
    </div>
  );
};

export default MarketResearchDashboard;
