
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  Upload,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  InboxIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DocStatus = "draft" | "review" | "approved";

interface Document {
  id: string;
  title: string;
  type: string;
  status: DocStatus;
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

const statusConfig: Record<DocStatus, { color: string; Icon: React.ComponentType<{ className?: string }> }> = {
  draft:    { color: "bg-yellow-400/20 text-yellow-400", Icon: Clock },
  review:   { color: "bg-blue-400/20 text-blue-400",    Icon: AlertTriangle },
  approved: { color: "bg-green-400/20 text-green-400",  Icon: CheckCircle },
};

const docTypes = Array.from(new Set(mockDocuments.map((d) => d.type)));

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const DocumentControl = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<DocStatus | "all">("all");
  const { toast } = useToast();

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return mockDocuments.filter((d) => {
      const matchesSearch =
        !term ||
        d.title.toLowerCase().includes(term) ||
        d.owner.toLowerCase().includes(term) ||
        d.type.toLowerCase().includes(term);
      const matchesType = typeFilter === "all" || d.type === typeFilter;
      const matchesStatus = statusFilter === "all" || d.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const handleUpload = () => {
    toast({ title: "Coming Soon", description: "Document upload will be available soon." });
  };
  const handleView = (doc: Document) => {
    toast({ title: "Opening document", description: `Loading "${doc.title}"…` });
  };
  const handleDownload = (doc: Document) => {
    toast({ title: "Download started", description: `Preparing "${doc.title}" for download…` });
  };

  return (
    <Container>
      <PageHeader
        title="Document Control"
        description="Manage and track procurement documentation"
      />

      {/* Toolbar */}
      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 p-4">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search by title, owner, or type…"
              className="pl-10 bg-white/5 border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search documents"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-36 border-white/10 bg-white/5" aria-label="Filter by type">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {docTypes.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as DocStatus | "all")}>
            <SelectTrigger className="w-full sm:w-36 border-white/10 bg-white/5" aria-label="Filter by status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">In review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleUpload}
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 shrink-0"
          >
            <Upload className="h-5 w-5 mr-2" aria-hidden="true" />
            Upload
          </Button>
        </div>
      </Card>

      {/* Results count */}
      {(searchTerm || typeFilter !== "all" || statusFilter !== "all") && (
        <p className="text-sm text-gray-400 mb-4" aria-live="polite">
          {filtered.length} document{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center">
          <InboxIcon className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-300">No documents found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
        </Card>
      ) : (
        <Grid columns={1} gap="lg">
          {filtered.map((doc) => {
            const { color, Icon } = statusConfig[doc.status];
            return (
              <Card
                key={doc.id}
                className="hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
                      <FileText className="h-6 w-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{doc.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-400">
                        <span>{doc.type}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span>Modified {formatDate(doc.lastModified)}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span>{doc.owner}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full flex items-center gap-2 text-sm ${color}`} role="status">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="capitalize">{doc.status}</span>
                    </span>
                    <Button variant="outline" size="sm" className="border-white/10" onClick={() => handleView(doc)}>
                      <Eye className="h-4 w-4 mr-1.5" aria-hidden="true" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10" onClick={() => handleDownload(doc)}>
                      <Download className="h-4 w-4 mr-1.5" aria-hidden="true" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default DocumentControl;
