
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Row, Col } from '@/components/ui/universal/Grid';
import { useSearchParams } from 'react-router-dom';

const MarketResearchFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setSearchParams((prev) => {
      prev.set(filterName, filterValue);
      return prev;
    });
  };

  return (
    <Row className="mb-6">
      <Col xl={12}>
        <Card className="p-5">
          <h2 className="text-lg font-semibold mb-4">Search & Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                type="text"
                id="industry"
                placeholder="e.g., Technology"
                value={searchParams.get('industry') || ''}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                placeholder="e.g., Washington, D.C."
                value={searchParams.get('location') || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select 
                id="status" 
                className="w-full mt-1 px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#9b87f5]"
                value={searchParams.get('status') || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6]">Apply Filters</Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default MarketResearchFilter;
