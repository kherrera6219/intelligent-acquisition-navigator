
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

interface MarketResearchItem {
  id: string;
  vendor: string;
  category: string;
  price: number;
  status: 'active' | 'pending' | 'archived';
  lastUpdated: string;
}

interface MarketResearchTableProps {
  data: MarketResearchItem[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const MarketResearchTable: React.FC<MarketResearchTableProps> = ({
  data,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange
}) => {
  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'archived':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <Table>
        <TableCaption>List of market research data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.vendor}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center py-8" colSpan={6}>
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <p>No market research data found</p>
                  <p className="text-sm mt-1">Try adjusting your filters</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
