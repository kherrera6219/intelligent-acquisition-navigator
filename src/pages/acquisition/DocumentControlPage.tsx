
import React, { useState } from 'react';
import { AcquisitionLayout, AcquisitionTab } from '@/components/layout/AcquisitionLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MsFluentTable, 
  MsFluentTableHeader, 
  MsFluentTableBody,
  MsFluentTableHead,
  MsFluentTableRow,
  MsFluentTableCell
} from '@/components/ui/MsFluentTable';
import { 
  FileText, 
  Upload, 
  FolderOpen, 
  PlusCircle, 
  Download, 
  Search 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  type: string;
  createdBy: string;
  createdDate: string;
  status: 'draft' | 'review' | 'final' | 'archived';
  size: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Requirements Specification.docx',
    type: 'Requirements',
    createdBy: 'John Smith',
    createdDate: '2023-10-15',
    status: 'final',
    size: '1.2 MB'
  },
  {
    id: '2',
    name: 'Vendor Evaluation Matrix.xlsx',
    type: 'Evaluation',
    createdBy: 'Sarah Johnson',
    createdDate: '2023-10-12',
    status: 'review',
    size: '845 KB'
  },
  {
    id: '3',
    name: 'Statement of Work Draft.docx',
    type: 'Statement of Work',
    createdBy: 'Michael Brown',
    createdDate: '2023-10-10',
    status: 'draft',
    size: '950 KB'
  },
  {
    id: '4',
    name: 'Contract Template.docx',
    type: 'Contract',
    createdBy: 'Lisa Chen',
    createdDate: '2023-09-28',
    status: 'final',
    size: '1.5 MB'
  },
  {
    id: '5',
    name: 'Acquisition Plan FY2024.pdf',
    type: 'Planning',
    createdBy: 'Robert Garcia',
    createdDate: '2023-09-25',
    status: 'archived',
    size: '2.3 MB'
  }
];

const DocumentControlPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter data based on search term and filters
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType ? doc.type === selectedType : true;
    const matchesStatus = selectedStatus ? doc.status === selectedStatus : true;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const handleAddNew = () => {
    toast({
      title: "Upload Document",
      description: "Document upload dialog will open"
    });
  };

  const handleDownload = (id: string) => {
    const document = mockDocuments.find(doc => doc.id === id);
    toast({
      title: "Download Document",
      description: `Downloading ${document?.name}`
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType(null);
    setSelectedStatus(null);
  };

  // Define tabs for the acquisition layout
  const tabs: AcquisitionTab[] = [
    {
      id: 'documents',
      label: 'All Documents',
      content: (
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Select value={selectedType || ''} onValueChange={(val) => setSelectedType(val || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Requirements">Requirements</SelectItem>
                  <SelectItem value="Evaluation">Evaluation</SelectItem>
                  <SelectItem value="Statement of Work">Statement of Work</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus || ''} onValueChange={(val) => setSelectedStatus(val || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="final">Final</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
          </div>
          
          <MsFluentTable variant="striped">
            <MsFluentTableHeader>
              <MsFluentTableRow>
                <MsFluentTableHead>Document Name</MsFluentTableHead>
                <MsFluentTableHead>Type</MsFluentTableHead>
                <MsFluentTableHead>Created By</MsFluentTableHead>
                <MsFluentTableHead>Date</MsFluentTableHead>
                <MsFluentTableHead>Status</MsFluentTableHead>
                <MsFluentTableHead>Size</MsFluentTableHead>
                <MsFluentTableHead>Actions</MsFluentTableHead>
              </MsFluentTableRow>
            </MsFluentTableHeader>
            <MsFluentTableBody>
              {filteredDocuments.length === 0 ? (
                <MsFluentTableRow>
                  <MsFluentTableCell colSpan={7} className="text-center py-10">
                    <p className="text-muted-foreground">No documents found</p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={handleAddNew}>
                      Upload Document
                    </Button>
                  </MsFluentTableCell>
                </MsFluentTableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <MsFluentTableRow key={doc.id}>
                    <MsFluentTableCell className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      {doc.name}
                    </MsFluentTableCell>
                    <MsFluentTableCell>{doc.type}</MsFluentTableCell>
                    <MsFluentTableCell>{doc.createdBy}</MsFluentTableCell>
                    <MsFluentTableCell>{doc.createdDate}</MsFluentTableCell>
                    <MsFluentTableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        doc.status === 'final' ? 'bg-green-500/10 text-green-500' :
                        doc.status === 'review' ? 'bg-blue-500/10 text-blue-500' :
                        doc.status === 'draft' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-gray-500/10 text-gray-500'
                      }`}>
                        {doc.status}
                      </span>
                    </MsFluentTableCell>
                    <MsFluentTableCell>{doc.size}</MsFluentTableCell>
                    <MsFluentTableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownload(doc.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
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
      id: 'templates',
      label: 'Templates',
      content: (
        <Card className="p-6">
          <div className="text-center py-10">
            <FolderOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Document Templates</h2>
            <p className="text-muted-foreground">Document templates management is in development</p>
          </div>
        </Card>
      )
    },
    {
      id: 'archive',
      label: 'Archive',
      content: (
        <Card className="p-6">
          <div className="text-center py-10">
            <FolderOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Document Archive</h2>
            <p className="text-muted-foreground">Document archive management is in development</p>
          </div>
        </Card>
      )
    }
  ];

  const metrics = [
    {
      title: 'Total Documents',
      value: mockDocuments.length,
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      className: 'bg-blue-950/30 border-blue-800/50'
    },
    {
      title: 'Final Documents',
      value: mockDocuments.filter(doc => doc.status === 'final').length,
      icon: <FileText className="h-8 w-8 text-green-500" />,
      className: 'bg-green-950/30 border-green-800/50'
    },
    {
      title: 'In Review',
      value: mockDocuments.filter(doc => doc.status === 'review').length,
      icon: <FileText className="h-8 w-8 text-amber-500" />,
      className: 'bg-amber-950/30 border-amber-800/50'
    }
  ];

  return (
    <AcquisitionLayout
      title="Document Control"
      description="Manage acquisition documents, templates, and document workflows"
      tabs={tabs}
      metrics={metrics}
      defaultTab="documents"
      action={
        <Button onClick={handleAddNew}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      }
      isLoading={isLoading}
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Acquisition', href: '/acquisition' },
        { label: 'Document Control', href: '/acquisition/document-control' }
      ]}
    />
  );
};

export default DocumentControlPage;
