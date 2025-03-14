
import React, { useState } from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CtaSection } from '@/components/features/CtaSection';
import {
  Table,
  TableBody,
  TableCaption,
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
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Filter, Download, Upload, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { useSearchParams } from 'react-router-dom';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';

const MarketResearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setSearchParams((prev) => {
      prev.set(filterName, filterValue);
      return prev;
    });
  };

  // Sample data for the market research results table
  const marketResearchData = [
    { id: 'MKT001', company: 'Tech Innovations Inc.', sector: 'Technology', location: 'San Francisco, CA', status: 'Active', value: '$1.2M' },
    { id: 'MKT002', company: 'Federal Systems LLC', sector: 'Government', location: 'Washington, D.C.', status: 'Pending', value: '$890K' },
    { id: 'MKT003', company: 'Healthcare Solutions', sector: 'Healthcare', location: 'Boston, MA', status: 'Completed', value: '$2.5M' },
    { id: 'MKT004', company: 'Defense Contractors Co.', sector: 'Defense', location: 'Arlington, VA', status: 'Active', value: '$4.7M' },
    { id: 'MKT005', company: 'Educational Services', sector: 'Education', location: 'Chicago, IL', status: 'Pending', value: '$560K' },
  ];

  // Status badge renderer
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
    <div className="flex flex-col min-h-screen">
      {/* Header outside of main content */}
      <UniversalInternalHeader />
      
      {/* Main content with sidebar and page content */}
      <div className="flex-1 flex">
        <PageErrorBoundary>
          <ProtectedPageLayout 
            title="Market Research" 
            description="Analyze market trends and identify potential opportunities."
            breadcrumbs={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Market Research', href: '/market-research' }
            ]}
          >
            <Container>
              <Row className="mb-6">
                <Col xl={12}>
                  <Card className="p-5 bg-gradient-to-r from-[#9b87f5]/10 to-[#1A1F2C]/5 border-[#9b87f5]/20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Market Research Dashboard</h2>
                        <p className="text-gray-500">Analyze potential vendors and market opportunities</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Filter size={16} />
                          <span className="hidden sm:inline">Filter</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Download size={16} />
                          <span className="hidden sm:inline">Export</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <RefreshCw size={16} />
                          <span className="hidden sm:inline">Refresh</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card className="p-4 bg-white/10 backdrop-blur-sm border border-[#9b87f5]/10">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Companies</h3>
                        <p className="text-2xl font-bold">128</p>
                      </Card>
                      <Card className="p-4 bg-white/10 backdrop-blur-sm border border-[#9b87f5]/10">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Active Research</h3>
                        <p className="text-2xl font-bold">42</p>
                      </Card>
                      <Card className="p-4 bg-white/10 backdrop-blur-sm border border-[#9b87f5]/10">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Market Value</h3>
                        <p className="text-2xl font-bold">$24.5M</p>
                      </Card>
                    </div>
                  </Card>
                </Col>
              </Row>
            
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
              
              <Row className="mb-10">
                <Col xl={12}>
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
                              <TableCell className="font-medium">{item.id}</TableCell>
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
                            <TableCell className="text-right font-bold">{`$9.85M`}</TableCell>
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
                </Col>
              </Row>
              
              <Row>
                <Col xl={12}>
                  <CtaSection />
                </Col>
              </Row>
            </Container>
          </ProtectedPageLayout>
        </PageErrorBoundary>
      </div>
      
      {/* Footer outside of main content */}
      <InternalFooter />
    </div>
  );
};

export default MarketResearchPage;
