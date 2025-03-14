
import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';
import { Card } from '@/components/ui/universal/Card';
import { Table } from '@/components/ui/table';
import { FileText, Download, Edit, Trash2 } from 'lucide-react';

const SolicitationReviewPage = () => {
  // Mock data for solicitations
  const solicitations = [
    { id: '1', title: 'IT Infrastructure Upgrade', status: 'Pending Review', date: '2023-04-15' },
    { id: '2', title: 'Office Supplies Contract', status: 'Approved', date: '2023-03-22' },
    { id: '3', title: 'Software License Renewal', status: 'In Progress', date: '2023-04-10' },
  ];

  return (
    <>
      <UniversalInternalHeader />
      <PageErrorBoundary>
        <NetworkStatusBanner />
        <ProtectedPageLayout 
          title="Solicitation Review" 
          description="Review and manage solicitations"
          breadcrumbs={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Solicitation Review', href: '/solicitation-review' }
          ]}
          action={
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              New Solicitation
            </Button>
          }
        >
          <Card className="p-4">
            <div className="overflow-x-auto">
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitations.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${item.status === 'Approved' ? 'bg-success/10 text-success' :
                            item.status === 'Pending Review' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-primary/10 text-primary'}`
                        }>
                          {item.status}
                        </span>
                      </td>
                      <td>{item.date}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </ProtectedPageLayout>
      </PageErrorBoundary>
      <InternalFooter />
    </>
  );
};

export default SolicitationReviewPage;
