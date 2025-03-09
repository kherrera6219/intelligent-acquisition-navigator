import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/universal/Card';
import { Grid } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileUp, Search, Filter, Plus, FileText, FolderOpen } from 'lucide-react';

const DocumentControlPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for "${searchQuery}"`,
    });
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload complete",
        description: "Your document has been uploaded successfully.",
      });
    }, 1500);
  };

  const handleCreateDocument = () => {
    toast({
      title: "Create document",
      description: "Opening document creation form...",
    });
  };

  const documents = [
    { id: 1, name: "RFP Template", type: "template", date: "2023-05-15", status: "active" },
    { id: 2, name: "Contract Amendment", type: "legal", date: "2023-06-22", status: "review" },
    { id: 3, name: "Vendor Evaluation", type: "form", date: "2023-07-10", status: "active" },
    { id: 4, name: "Statement of Work", type: "template", date: "2023-08-05", status: "active" },
    { id: 5, name: "Compliance Checklist", type: "checklist", date: "2023-09-18", status: "draft" },
    { id: 6, name: "Proposal Evaluation", type: "form", date: "2023-10-30", status: "review" },
  ];

  return (
    <ProtectedPageLayout
      title="Document Control"
      description="Manage and control acquisition documents"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Document Control', href: '/document-control' }
      ]}
      action={
        <div className="flex gap-2">
          <Button onClick={handleCreateDocument} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
          <Button onClick={handleUpload} size="sm" variant="outline" disabled={isUploading}>
            <FileUp className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      }
    >
      <div className="min-h-[calc(100vh-200px)]">
        <Card className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button type="button" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </form>
        </Card>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Recent Documents</h3>
          <Grid columns={3} gap="md">
            {documents.map((doc) => (
              <Card 
                key={doc.id} 
                className="flex flex-col"
                hoverable
                interactive
                onClick={() => toast({
                  title: "Document opened",
                  description: `Opening ${doc.name}`,
                })}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    doc.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    doc.status === 'review' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <h4 className="font-medium mb-1">{doc.name}</h4>
                <p className="text-sm text-gray-400 mb-2">Type: {doc.type}</p>
                <p className="text-xs text-gray-500 mt-auto">Last updated: {doc.date}</p>
              </Card>
            ))}
          </Grid>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Document Folders</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Templates', 'Contracts', 'Proposals', 'Legal Documents'].map((folder) => (
              <Card 
                key={folder}
                className="flex items-center p-4 gap-3"
                interactive
                onClick={() => toast({
                  title: "Folder opened",
                  description: `Opening ${folder} folder`,
                })}
              >
                <div className="p-2 bg-blue-500/10 rounded-md">
                  <FolderOpen className="h-5 w-5 text-blue-400" />
                </div>
                <span>{folder}</span>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </ProtectedPageLayout>
  );
};

export default DocumentControlPage;
