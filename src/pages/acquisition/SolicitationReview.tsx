import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Search, Clock, InboxIcon, AlertCircle, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useSolicitations,
  useUpdateSolicitationStatus,
  useCreateSolicitation,
  type DbSolicitation,
  type SolicitationDbStatus,
  type SolicitationDocType,
} from "@/hooks/useSolicitations";
import { pushNotification } from "@/hooks/useNotifications";

// DB status → display label
const STATUS_LABELS: Record<SolicitationDbStatus, string> = {
  DRAFT: "Draft",
  IN_REVIEW: "In Review",
  APPROVED: "Approved",
  PUBLISHED: "Published",
};

const STATUS_COLORS: Record<SolicitationDbStatus, string> = {
  DRAFT:     "bg-gray-400/20 text-gray-400",
  IN_REVIEW: "bg-blue-400/20 text-blue-400",
  APPROVED:  "bg-green-400/20 text-green-400",
  PUBLISHED: "bg-emerald-400/20 text-emerald-400",
};

const DOC_TYPE_COLORS: Record<SolicitationDocType, string> = {
  RFI: "bg-violet-400/20 text-violet-400",
  RFP: "bg-fuchsia-400/20 text-fuchsia-400",
  RFQ: "bg-blue-400/20 text-blue-400",
  SOW: "bg-amber-400/20 text-amber-400",
  PWS: "bg-orange-400/20 text-orange-400",
};

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : "No deadline";

function SolicitationSkeleton() {
  return (
    <Card>
      <div className="flex items-start gap-4 p-4">
        <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-8 w-24 shrink-0" />
      </div>
    </Card>
  );
}

const SolicitationReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<SolicitationDocType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<SolicitationDbStatus | "all">("all");
  const { toast } = useToast();

  const { data: solicitations, isLoading, isError, error } = useSolicitations();
  const updateStatus = useUpdateSolicitationStatus();
  const createSolicitation = useCreateSolicitation();

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return (solicitations ?? []).filter((s) => {
      const matchesSearch =
        !term ||
        s.title.toLowerCase().includes(term) ||
        (s.description ?? "").toLowerCase().includes(term);
      const matchesType = typeFilter === "all" || s.type === typeFilter;
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [solicitations, searchTerm, typeFilter, statusFilter]);

  const handleReview = (solicitation: DbSolicitation) => {
    const nextStatus: SolicitationDbStatus =
      solicitation.status === "DRAFT" ? "IN_REVIEW" : solicitation.status;
    if (nextStatus !== solicitation.status) {
      updateStatus.mutate({ id: solicitation.id, status: nextStatus });
      pushNotification({
        type: "status_change",
        title: "Solicitation moved to In Review",
        body: `"${solicitation.title}" is now under review.`,
        resourceType: "solicitation",
        resourceId: solicitation.id,
      });
    } else {
      toast({ title: "Review opened", description: `Reviewing "${solicitation.title}"` });
    }
  };

  const handleApprove = (solicitation: DbSolicitation) => {
    updateStatus.mutate({ id: solicitation.id, status: "APPROVED" });
    pushNotification({
      type: "status_change",
      title: "Solicitation approved",
      body: `"${solicitation.title}" has been approved.`,
      resourceType: "solicitation",
      resourceId: solicitation.id,
    });
  };

  const handleAddDemo = () => {
    createSolicitation.mutate({
      title: "Enterprise Cloud Migration Services",
      type: "RFP",
      description: "Migration of on-premise workloads to FedRAMP-authorized cloud environment with Zero Trust implementation.",
      due_date: new Date(Date.now() + 30 * 86_400_000).toISOString().split("T")[0],
      estimated_value: 2_500_000,
      created_by: "demo-user",
    });
  };

  return (
    <Container>
      <PageHeader
        title="Solicitation Review"
        description="Review and approve procurement solicitations for FAR/DFARS compliance."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Acquisition" },
          { label: "Solicitation Review" },
        ]}
        actions={
          <Button
            size="sm"
            variant="outline"
            className="border-white/10 text-xs"
            onClick={handleAddDemo}
            disabled={createSolicitation.isPending}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
            Add Demo
          </Button>
        }
      />

      {/* Filters */}
      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search by title or description…"
              className="pl-10 bg-white/5 border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search solicitations"
            />
          </div>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as SolicitationDocType | "all")}>
            <SelectTrigger className="w-full sm:w-36 border-white/10 bg-white/5" aria-label="Filter by type">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {(["RFI", "RFP", "RFQ", "SOW", "PWS"] as SolicitationDocType[]).map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as SolicitationDbStatus | "all")}>
            <SelectTrigger className="w-full sm:w-40 border-white/10 bg-white/5" aria-label="Filter by status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {(Object.keys(STATUS_LABELS) as SolicitationDbStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Results count */}
      {(searchTerm || typeFilter !== "all" || statusFilter !== "all") && !isLoading && (
        <p className="text-sm text-gray-400 mb-4" aria-live="polite">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Loading */}
      {isLoading && (
        <Grid columns={1} gap="lg">
          {[1, 2, 3].map((i) => <SolicitationSkeleton key={i} />)}
        </Grid>
      )}

      {/* Error */}
      {isError && (
        <Card className="p-8 flex flex-col items-center text-center gap-3">
          <AlertCircle className="h-8 w-8 text-red-400" aria-hidden="true" />
          <p className="text-sm text-red-300">{(error as Error).message}</p>
          <p className="text-xs text-gray-500">Make sure the solicitations table exists in your Supabase project.</p>
        </Card>
      )}

      {/* List */}
      {!isLoading && !isError && (
        filtered.length === 0 ? (
          <Card className="p-12 flex flex-col items-center justify-center text-center">
            <InboxIcon className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-gray-300">No solicitations found</h3>
            <p className="text-sm text-gray-500 mt-1">
              {searchTerm || typeFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search or filters."
                : "No solicitations yet. Click 'Add Demo' to create one."}
            </p>
          </Card>
        ) : (
          <Grid columns={1} gap="lg">
            {filtered.map((solicitation) => (
              <Card key={solicitation.id} className="hover:bg-white/5 transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <FileText className="h-6 w-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{solicitation.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={`text-xs border-0 ${DOC_TYPE_COLORS[solicitation.type]}`}
                        >
                          {solicitation.type}
                        </Badge>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[solicitation.status]}`}>
                          {STATUS_LABELS[solicitation.status]}
                        </span>
                        {solicitation.estimated_value && (
                          <span className="text-xs text-gray-500">
                            Est. ${solicitation.estimated_value.toLocaleString()}
                          </span>
                        )}
                        {solicitation.version > 1 && (
                          <span className="text-xs text-gray-600">v{solicitation.version}</span>
                        )}
                      </div>
                      {solicitation.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{solicitation.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm">{formatDate(solicitation.due_date)}</span>
                    </div>
                    <div className="flex gap-2">
                      {solicitation.status === "IN_REVIEW" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-xs"
                          onClick={() => handleApprove(solicitation)}
                          disabled={updateStatus.isPending}
                        >
                          Approve
                        </Button>
                      )}
                      <Button
                        onClick={() => handleReview(solicitation)}
                        className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
                        size="sm"
                        disabled={updateStatus.isPending}
                      >
                        Review
                      </Button>
                    </div>
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

export default SolicitationReview;
