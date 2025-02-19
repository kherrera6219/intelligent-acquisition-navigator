
import React, { useState, useEffect } from "react";
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
  Loader2 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

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
    owner: "John Smith"
  },
  {
    id: "2",
    title: "IT Equipment Procurement Guidelines",
    type: "Procedure",
    status: "review",
    lastModified: "2024-02-14",
    owner: "Sarah Johnson"
  },
  {
    id: "3",
    title: "Vendor Evaluation Template",
    type: "Template",
    status: "draft",
    lastModified: "2024-02-13",
    owner: "Michael Brown"
  }
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

const getStatusIcon = (status: Document["status"]) => {
  switch (status) {
    case "draft":
      return Clock;
    case "review":
      return AlertTriangle;
    case "approved":
      return CheckCircle;
  }
};

const DocumentList = ({ documents, isLoading }: { documents: Document[], isLoading: boolean }) => {
  if (isLoading) {
    return (
      <Grid columns={1} gap="lg">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
              <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                <div className="h-12 w-12 bg-white/5 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-white/5 rounded w-3/4"></div>
                  <div className="h-3 bg-white/5 rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="h-8 bg-white/5 rounded-full w-24"></div>
                <div className="flex gap-3 sm:ml-4">
                  <div className="h-10 bg-white/5 rounded w-24"></div>
                  <div className="h-10 bg-white/5 rounded w-24"></div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Grid>
    );
  }

  if (!documents.length) {
    return (
      <Card className="p-8 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-white mb-2">No documents found</h3>
        <p className="text-gray-400">Try adjusting your search or filters</p>
      </Card>
    );
  }

  return (
    <Grid columns={1} gap="lg">
      {documents.map((doc) => {
        const StatusIcon = getStatusIcon(doc.status);
        return (
          <Card
            key={doc.id}
            className="hover:bg-white/5 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
              <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-violet-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">
                    {doc.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-1">
                    <span className="text-sm text-gray-400">{doc.type}</span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span className="text-sm text-gray-400">
                      Modified: {doc.lastModified}
                    </span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span className="text-sm text-gray-400">
                      Owner: {doc.owner}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div
                  className={`px-3 py-1 rounded-full flex items-center gap-2 justify-center sm:justify-start ${getStatusColor(
                    doc.status
                  )}`}
                >
                  <StatusIcon className="h-4 w-4" />
                  <span className="text-sm capitalize">{doc.status}</span>
                </div>
                <div className="flex gap-3 sm:ml-4">
                  <Button 
                    variant="outline" 
                    className="border-white/10 flex-1 sm:flex-none"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/10 flex-1 sm:flex-none"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      )}
    </Grid>
  );
};

const DocumentControl = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your document is being processed...",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <Container>
        <PageHeader
          title="Document Control"
          description="Manage and track procurement documentation"
        />

        <Card className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
            <div className="relative w-full sm:w-auto sm:flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search documents..."
                className="pl-10 bg-white/5 border-white/10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="border-white/10 flex-1 sm:flex-none"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
              <Button
                onClick={handleUpload}
                className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                       hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600
                       flex-1 sm:flex-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5 mr-2" />
                )}
                Upload Document
              </Button>
            </div>
          </div>
        </Card>

        <DocumentList 
          documents={mockDocuments} 
          isLoading={isLoading} 
        />
      </Container>
    </ErrorBoundary>
  );
};

export default DocumentControl;
