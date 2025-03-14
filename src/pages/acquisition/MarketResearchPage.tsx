
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import MarketResearchDashboard from '@/components/acquisition/market-research/MarketResearchDashboard';
import MarketResearchFilter from '@/components/acquisition/market-research/MarketResearchFilter';
import MarketResearchTable, { MarketResearchItem } from '@/components/acquisition/market-research/MarketResearchTable';

// Mock data
const mockData: MarketResearchItem[] = [
  { id: '1', vendor: 'Tech Solutions Inc.', category: 'Software', price: 12500, status: 'active', lastUpdated: '2023-09-15' },
  { id: '2', vendor: 'Hardware Experts', category: 'Hardware', price: 8750, status: 'pending', lastUpdated: '2023-09-10' },
  { id: '3', vendor: 'Cloud Services Co.', category: 'Cloud', price: 15000, status: 'active', lastUpdated: '2023-09-05' },
  { id: '4', vendor: 'Security Systems', category: 'Cybersecurity', price: 22000, status: 'archived', lastUpdated: '2023-08-28' },
];

const MarketResearchPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  const itemsPerPage = 10;
  
  // Filter data based on search term and filters
  const filteredData = mockData.filter(item => {
    const matchesSearch = item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  
  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };
  
  return (
    <ProtectedPageLayout title="Market Research">
      <div className="space-y-6">
        <MarketResearchDashboard data={filteredData} />
        
        <MarketResearchFilter 
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onStatusChange={handleStatusChange}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
        />
        
        <MarketResearchTable 
          data={filteredData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={handlePageChange}
        />
      </div>
    </ProtectedPageLayout>
  );
};

export default MarketResearchPage;
