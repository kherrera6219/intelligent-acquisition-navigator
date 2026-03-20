import { useState, useMemo, useRef } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
  InboxIcon,
  AlertCircle,
  Loader2,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDocuments, useUploadDocument, useDocumentDownloadUrl, type UserDocument } from "@/hooks/useDocuments";
import { pushNotification } from "@/hooks/useNotifications";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

function getFileTypeLabel(mimeType: string): string {
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("word") || mimeType.includes("docx")) return "Word";
  if (mimeType.includes("sheet") || mimeType.includes("xlsx")) return "Excel";
  if (mimeType.includes("text")) return "Text";
  if (mimeType.includes("image")) return "Image";
  return "File";
}

function DocumentSkeleton() {
  return (
    <Card>
      <div className="flex items-start gap-4 p-6">
        <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 shrink-0" />
          <Skeleton className="h-8 w-24 shrink-0" />
        </div>
      </div>
    </Card>
  );
}

const DEMO_USER_ID = "demo-user-00000000";

const DocumentControl = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: documents, isLoading, isError, error } = useDocuments();
  const uploadDocument = useUploadDocument();
  const getDownloadUrl = useDocumentDownloadUrl();

  const docTypes = useMemo(() => {
    const types = Array.from(new Set((documents ?? []).map((d) => getFileTypeLabel(d.file_type))));
    return types;
  }, [documents]);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return (documents ?? []).filter((d) => {
      const matchesSearch =
        !term ||
        d.file_name.toLowerCase().includes(term) ||
        d.user_id.toLowerCase().includes(term);
      const matchesType = typeFilter === "all" || getFileTypeLabel(d.file_type) === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [documents, searchTerm, typeFilter]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = ""; // reset so same file can be re-selected

    await uploadDocument.mutateAsync({ file, userId: DEMO_USER_ID });
    pushNotification({
      type: "status_change",
      title: "Document uploaded",
      body: `"${file.name}" has been added to Document Control.`,
      resourceType: "document",
    });
  };

  const handleView = async (doc: UserDocument) => {
    try {
      const url = await getDownloadUrl.mutateAsync(doc.file_path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // error handled in hook — fallback message
      toast({ title: "Preview unavailable", description: "File storage may not be configured yet.", variant: "destructive" });
    }
  };

  const handleDownload = async (doc: UserDocument) => {
    try {
      const url = await getDownloadUrl.mutateAsync(doc.file_path);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.file_name;
      a.click();
    } catch {
      toast({ title: "Download unavailable", description: "File storage may not be configured yet.", variant: "destructive" });
    }
  };

  return (
    <Container>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        onChange={handleFileChange}
        aria-hidden="true"
        accept="*/*"
      />

      <PageHeader
        title="Document Control"
        description="Manage, version, and track all procurement documentation through its lifecycle."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Acquisition" },
          { label: "Document Control" },
        ]}
      />

      {/* Toolbar */}
      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 p-4">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search by file name…"
              className="pl-10 bg-white/5 border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search documents"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-36 border-white/10 bg-white/5" aria-label="Filter by file type">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {docTypes.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleUploadClick}
            disabled={uploadDocument.isPending}
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 shrink-0"
          >
            {uploadDocument.isPending ? (
              <><Loader2 className="h-5 w-5 mr-2 animate-spin" aria-hidden="true" /> Uploading…</>
            ) : (
              <><Upload className="h-5 w-5 mr-2" aria-hidden="true" /> Upload</>
            )}
          </Button>
        </div>
      </Card>

      {/* Results count */}
      {(searchTerm || typeFilter !== "all") && !isLoading && (
        <p className="text-sm text-gray-400 mb-4" aria-live="polite">
          {filtered.length} document{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Loading */}
      {isLoading && (
        <Grid columns={1} gap="lg">
          {[1, 2, 3].map((i) => <DocumentSkeleton key={i} />)}
        </Grid>
      )}

      {/* Error */}
      {isError && (
        <Card className="p-8 flex flex-col items-center text-center gap-3">
          <AlertCircle className="h-8 w-8 text-red-400" aria-hidden="true" />
          <p className="text-sm text-red-300">{(error as Error).message}</p>
        </Card>
      )}

      {/* List */}
      {!isLoading && !isError && (
        filtered.length === 0 ? (
          <Card className="p-12 flex flex-col items-center justify-center text-center">
            <InboxIcon className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-gray-300">No documents found</h3>
            <p className="text-sm text-gray-500 mt-1">
              {searchTerm || typeFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Upload your first document to get started."}
            </p>
            {!searchTerm && typeFilter === "all" && (
              <Button
                className="mt-4 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
                onClick={handleUploadClick}
              >
                <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                Upload Document
              </Button>
            )}
          </Card>
        ) : (
          <Grid columns={1} gap="lg">
            {filtered.map((doc) => (
              <Card key={doc.id} className="hover:bg-white/5 transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <FileText className="h-6 w-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white break-all">{doc.file_name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-400">
                        <span className="px-2 py-0.5 rounded text-xs bg-violet-500/10 text-violet-400">
                          {getFileTypeLabel(doc.file_type)}
                        </span>
                        <span>{formatBytes(doc.file_size)}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {formatDate(doc.uploaded_at)}
                        </span>
                        {doc.processed_status && (
                          <>
                            <span aria-hidden="true">&bull;</span>
                            <span className="capitalize text-xs">{doc.processed_status}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10"
                      onClick={() => handleView(doc)}
                      disabled={getDownloadUrl.isPending}
                    >
                      <Eye className="h-4 w-4 mr-1.5" aria-hidden="true" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10"
                      onClick={() => handleDownload(doc)}
                      disabled={getDownloadUrl.isPending}
                    >
                      <Download className="h-4 w-4 mr-1.5" aria-hidden="true" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        )
      )}
    </Container>
  );
};

export default DocumentControl;
