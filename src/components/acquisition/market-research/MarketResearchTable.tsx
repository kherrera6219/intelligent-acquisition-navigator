
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - in a real app, this would be passed as props or fetched from an API
const marketResearchData = [
  { id: 'MKT001', company: 'Tech Innovations Inc.', sector: 'Technology', location: 'San Francisco, CA', status: 'Active', value: '$1.2M' },
  { id: 'MKT002', company: 'Federal Systems LLC', sector: 'Government', location: 'Washington, D.C.', status: 'Pending', value: '$890K' },
  { id: 'MKT003', company: 'Healthcare Solutions', sector: 'Healthcare', location: 'Boston, MA', status: 'Completed', value: '$2.5M' },
  { id: 'MKT004', company: 'Defense Contractors Co.', sector: 'Defense', location: 'Arlington, VA', status: 'Active', value: '$4.7M' },
  { id: 'MKT005', company: 'Educational Services', sector: 'Education', location: 'Chicago, IL', status: 'Pending', value: '$560K' },
];

const MarketResearchTable: React.FC = () => {
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Completed':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Market Research Results</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Upload size={16} />
          <span>Import Data</span>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketResearchData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.sector}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{renderStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right">{item.value}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Company</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total Research Value</TableCell>
              <TableCell className="text-right font-bold">$9.85M</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">Showing 5 of 128 results</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </Card>
  );
};

export default MarketResearchTable;
