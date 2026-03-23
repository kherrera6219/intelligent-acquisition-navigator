
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  FileText,
  Upload,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  FolderOpen,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: string;
  title: string;
  type: string;
  status: "draft" | "review" | "approved";
  lastModified: string;
  owner: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Federal Acquisition Regulation Update 2024",
    type: "Policy",
    status: "approved",
    lastModified: "2024-02-15",
    owner: "John Smith",
  },
  {
    id: "2",
    title: "IT Equipment Procurement Guidelines",
    type: "Procedure",
    status: "review",
    lastModified: "2024-02-14",
    owner: "Sarah Johnson",
  },
  {
    id: "3",
    title: "Vendor Evaluation Template",
    type: "Template",
    status: "draft",
    lastModified: "2024-02-13",
    owner: "Michael Brown",
  },
];

const getStatusColor = (status: Document["status"]) => {
  switch (status) {
    case "draft":
      return "bg-yellow-400/20 text-yellow-400";
    case "review":
      return "bg-blue-400/20 text-blue-400";
    case "approved":
      return "bg-green-400/20 text-green-400";
  }
};

const StatusIcon = ({ status }: { status: Document["status"] }) => {
  switch (status) {
    case "draft":
      return <Clock className="h-4 w-4" aria-label="Status: Draft" />;
    case "review":
      return <AlertTriangle className="h-4 w-4" aria-label="Status: In Review" />;
    case "approved":
      return <CheckCircle className="h-4 w-4" aria-label="Status: Approved" />;
  }
};

const DocumentControl = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filtered = mockDocuments.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your document is being processed...",
    });
  };

  return (
    <Container>
      <PageHeader
        title="Document Control"
        description="Manage and track procurement documentation"
      />

      <Card className="mb-8">
        <div className="flex items-center justify-between p-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search documents..."
              className="pl-10 bg-white/5 border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search documents"
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-white/10" aria-label="Open filter options">
              <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
              Filters
            </Button>
            <Button
              onClick={handleUpload}
              className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500
                     hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
              aria-label="Upload a new document"
            >
              <Upload className="h-5 w-5 mr-2" aria-hidden="true" />
              Upload Document
            </Button>
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
          <FolderOpen className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-300 mb-1">No documents found</h3>
          <p className="text-sm text-gray-500">
            {searchTerm
              ? `No results for "${searchTerm}". Try adjusting your search.`
              : "No documents have been uploaded yet."}
          </p>
        </div>
      ) : (
        <Grid columns={1} gap="lg" role="list" aria-label="Document list">
          {filtered.map((doc) => (
            <Card
              key={doc.id}
              className="hover:bg-white/5 transition-all duration-200"
              role="listitem"
            >
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
                    <FileText className="h-6 w-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{doc.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-400">{doc.type}</span>
                      <span className="text-gray-600" aria-hidden="true">•</span>
                      <span className="text-sm text-gray-400">Modified: {doc.lastModified}</span>
                      <span className="text-gray-600" aria-hidden="true">•</span>
                      <span className="text-sm text-gray-400">Owner: {doc.owner}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(doc.status)}`}
                  >
                    <StatusIcon status={doc.status} />
                    <span className="text-sm capitalize">{doc.status}</span>
                  </div>
                  <Button variant="outline" className="border-white/10" aria-label={`View ${doc.title}`}>
                    <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
                    View
                  </Button>
                  <Button variant="outline" className="border-white/10" aria-label={`Download ${doc.title}`}>
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DocumentControl;
