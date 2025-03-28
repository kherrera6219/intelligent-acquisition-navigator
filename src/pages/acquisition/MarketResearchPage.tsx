
import React, { useState } from 'react';
import { AcquisitionLayout, AcquisitionTab } from '@/components/layout/AcquisitionLayout';
import { Card } from '@/components/ui/card';
import { 
  MsFluentTable, 
  MsFluentTableHeader, 
  MsFluentTableBody,
  MsFluentTableHead,
  MsFluentTableRow,
  MsFluentTableCell
} from '@/components/ui/MsFluentTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BarChart4, Database, PlusCircle } from 'lucide-react';
import { useMsFluentApi } from '@/lib/msFluentApi';
import { useToast } from '@/hooks/use-toast';

export interface MarketResearchItem {
  id: string;
  vendor: string;
  category: string;
  price: number;
  status: string;
  lastUpdated: string;
}

// Mock data
const mockData: MarketResearchItem[] = [
  { id: '1', vendor: 'Tech Solutions Inc.', category: 'Software', price: 12500, status: 'active', lastUpdated: '2023-09-15' },
  { id: '2', vendor: 'Hardware Experts', category: 'Hardware', price: 8750, status: 'pending', lastUpdated: '2023-09-10' },
  { id: '3', vendor: 'Cloud Services Co.', category: 'Cloud', price: 15000, status: 'active', lastUpdated: '2023-09-05' },
  { id: '4', vendor: 'Security Systems', category: 'Cybersecurity', price: 22000, status: 'archived', lastUpdated: '2023-08-28' },
];

const MarketResearchPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { request } = useMsFluentApi();

  // Filter data based on search term and filters
  const filteredData = mockData.filter(item => {
    const matchesSearch = item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const handleAddNew = () => {
    toast({
      title: "New Market Research",
      description: "Creating new market research entry"
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedStatus(null);
  };

  // Define tabs for the acquisition layout
  const tabs: AcquisitionTab[] = [
    {
      id: 'research',
      label: 'Research Data',
      content: (
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search vendors..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Select value={selectedCategory || ''} onValueChange={(val) => setSelectedCategory(val || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                  <SelectItem value="Cloud">Cloud</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus || ''} onValueChange={(val) => setSelectedStatus(val || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
          </div>
          
          <MsFluentTable variant="striped">
            <MsFluentTableHeader>
              <MsFluentTableRow>
                <MsFluentTableHead>Vendor</MsFluentTableHead>
                <MsFluentTableHead>Category</MsFluentTableHead>
                <MsFluentTableHead>Price</MsFluentTableHead>
                <MsFluentTableHead>Status</MsFluentTableHead>
                <MsFluentTableHead>Last Updated</MsFluentTableHead>
                <MsFluentTableHead>Actions</MsFluentTableHead>
              </MsFluentTableRow>
            </MsFluentTableHeader>
            <MsFluentTableBody>
              {filteredData.length === 0 ? (
                <MsFluentTableRow>
                  <MsFluentTableCell colSpan={6} className="text-center py-10">
                    <p className="text-muted-foreground">No market research data found</p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={handleAddNew}>
                      Add New Entry
                    </Button>
                  </MsFluentTableCell>
                </MsFluentTableRow>
              ) : (
                filteredData.map((item) => (
                  <MsFluentTableRow key={item.id}>
                    <MsFluentTableCell>{item.vendor}</MsFluentTableCell>
                    <MsFluentTableCell>{item.category}</MsFluentTableCell>
                    <MsFluentTableCell>${item.price.toLocaleString()}</MsFluentTableCell>
                    <MsFluentTableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        item.status === 'active' ? 'bg-green-500/10 text-green-500' :
                        item.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-gray-500/10 text-gray-500'
                      }`}>
                        {item.status}
                      </span>
                    </MsFluentTableCell>
                    <MsFluentTableCell>{item.lastUpdated}</MsFluentTableCell>
                    <MsFluentTableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </MsFluentTableCell>
                  </MsFluentTableRow>
                ))
              )}
            </MsFluentTableBody>
          </MsFluentTable>
        </Card>
      )
    },
    {
      id: 'insights',
      label: 'Insights',
      content: (
        <Card className="p-6">
          <div className="text-center py-10">
            <BarChart4 className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Market Research Insights</h2>
            <p className="text-muted-foreground">Market insights visualization is in development</p>
          </div>
        </Card>
      )
    },
    {
      id: 'sources',
      label: 'Data Sources',
      content: (
        <Card className="p-6">
          <div className="text-center py-10">
            <Database className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Market Research Sources</h2>
            <p className="text-muted-foreground">Source management is in development</p>
          </div>
        </Card>
      )
    }
  ];

  const metrics = [
    {
      title: 'Total Research',
      value: filteredData.length,
      icon: <Database className="h-8 w-8 text-blue-500" />,
      className: 'bg-blue-950/30 border-blue-800/50'
    },
    {
      title: 'Active Vendors',
      value: filteredData.filter(item => item.status === 'active').length,
      icon: <BarChart4 className="h-8 w-8 text-green-500" />,
      className: 'bg-green-950/30 border-green-800/50'
    },
    {
      title: 'Average Price',
      value: filteredData.length > 0 
        ? `$${Math.round(filteredData.reduce((acc, item) => acc + item.price, 0) / filteredData.length).toLocaleString()}` 
        : '$0',
      icon: <Database className="h-8 w-8 text-amber-500" />,
      className: 'bg-amber-950/30 border-amber-800/50'
    }
  ];

  return (
    <AcquisitionLayout
      title="Market Research"
      description="Research and analyze vendor capabilities and market conditions"
      tabs={tabs}
      metrics={metrics}
      defaultTab="research"
      action={
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Research
        </Button>
      }
      isLoading={isLoading}
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Acquisition', href: '/acquisition' },
        { label: 'Market Research', href: '/acquisition/market-research' }
      ]}
    />
  );
};

export default MarketResearchPage;
