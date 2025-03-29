
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table-cell';
import { SimplePagination } from '@/components/ui/pagination/SimplePagination';

export interface MarketResearchItem {
  id: string;
  vendor: string;
  category: string;
  price: number;
  status: string;
  lastUpdated: string;
}

interface MarketResearchTableProps {
  data: MarketResearchItem[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const MarketResearchTable: React.FC<MarketResearchTableProps> = ({
  data,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange
}) => {
  // Calculate pagination
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = data.slice(startIndex, endIndex);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.vendor}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{formatCurrency(item.price)}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium
                    ${item.status === 'active' ? 'bg-green-100 text-green-800' : 
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No market research data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <div className="p-4 border-t">
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          variant="default"
        />
      </div>
    </div>
  );
};

export default MarketResearchTable;
