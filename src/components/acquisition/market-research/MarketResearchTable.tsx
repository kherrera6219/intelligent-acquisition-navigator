
import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Row, Col } from '@/components/ui/universal/Grid';
import { Badge } from '@/components/ui/badge';

const MarketResearchTable: React.FC = () => {
  const companies = [
    { id: 1, name: 'Acme Corporation', industry: 'Technology', location: 'Washington, D.C.', revenue: '$150M', employees: '500+', status: 'active' },
    { id: 2, name: 'Globex Systems', industry: 'Defense', location: 'Virginia', revenue: '$220M', employees: '1,200+', status: 'active' },
    { id: 3, name: 'Initech Solutions', industry: 'Healthcare', location: 'Maryland', revenue: '$85M', employees: '320+', status: 'pending' },
    { id: 4, name: 'Soylent Corp', industry: 'Technology', location: 'California', revenue: '$310M', employees: '2,300+', status: 'completed' },
    { id: 5, name: 'Umbrella Industries', industry: 'Manufacturing', location: 'Texas', revenue: '$175M', employees: '800+', status: 'active' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-600 border-green-700/20';
      case 'pending':
        return 'bg-amber-500/20 text-amber-600 border-amber-700/20';
      case 'completed':
        return 'bg-blue-500/20 text-blue-600 border-blue-700/20';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <Row className="mb-6">
      <Col xl={12}>
        <Card className="p-5">
          <h2 className="text-lg font-semibold mb-4">Potential Vendors</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>List of potential vendors for market research</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Company</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Annual Revenue</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.location}</TableCell>
                    <TableCell>{company.revenue}</TableCell>
                    <TableCell>{company.employees}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(company.status)} capitalize`}>
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <tfoot>
                <tr>
                  <TableCell colSpan={7}>
                    <div className="flex justify-between py-2">
                      <span>Showing 5 of 24 vendors</span>
                      <div>
                        <button className="px-3 py-1 border rounded mr-1 bg-gray-100">Previous</button>
                        <button className="px-3 py-1 border rounded bg-primary text-white">Next</button>
                      </div>
                    </div>
                  </TableCell>
                </tr>
              </tfoot>
            </Table>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default MarketResearchTable;
