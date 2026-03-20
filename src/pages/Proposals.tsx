import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
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
import { FileText, Search, Plus, Clock, CheckCircle, XCircle, InboxIcon, AlertCircle, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProposals, useUpdateProposalStatus, type Proposal, type ProposalStatus } from "@/hooks/useProposals";
import { pushNotification } from "@/hooks/useNotifications";

const statusConfig: Record<ProposalStatus, { color: string; Icon: React.ComponentType<{ className?: string }> }> = {
  draft:          { color: "text-gray-400 bg-gray-400/20",    Icon: Edit2 },
  pending_review: { color: "text-yellow-400 bg-yellow-400/20", Icon: Clock },
  in_review:      { color: "text-blue-400 bg-blue-400/20",    Icon: Clock },
  approved:       { color: "text-green-400 bg-green-400/20",   Icon: CheckCircle },
  rejected:       { color: "text-red-400 bg-red-400/20",       Icon: XCircle },
};

const STATUS_LABELS: Record<ProposalStatus, string> = {
  draft: "Draft",
  pending_review: "Pending Review",
  in_review: "In Review",
  approved: "Approved",
  rejected: "Rejected",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

function ProposalSkeleton() {
  return (
    <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5">
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-8 w-24 shrink-0" />
      </div>
    </Card>
  );
}

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | "all">("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: proposals, isLoading, isError, error } = useProposals();
  const updateStatus = useUpdateProposalStatus();

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return (proposals ?? []).filter((p) => {
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.vendor.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [proposals, searchTerm, statusFilter]);

  const handleReview = (proposal: Proposal) => {
    const nextStatus: ProposalStatus = proposal.status === "pending_review" ? "in_review" : proposal.status;
    if (nextStatus !== proposal.status) {
      updateStatus.mutate({ id: proposal.id, status: nextStatus });
      pushNotification({
        type: "status_change",
        title: "Proposal status updated",
        body: `"${proposal.title}" moved to In Review`,
        resourceType: "proposal",
        resourceId: proposal.id,
      });
    } else {
      toast({ title: "Review opened", description: `Viewing "${proposal.title}"` });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Proposals"
        description="Manage and review procurement proposals through the evaluation lifecycle."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Proposals" },
        ]}
        actions={
          <Button
            onClick={() => navigate("/proposals/new")}
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            New Proposal
          </Button>
        }
      />

      {/* Filters */}
      <Card className="p-4 bg-black/40 backdrop-blur-sm border-white/5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search by title or vendor…"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search proposals"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ProposalStatus | "all")}>
            <SelectTrigger className="w-full sm:w-48 border-white/10 bg-white/5" aria-label="Filter by status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {(Object.keys(STATUS_LABELS) as ProposalStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Results count */}
      {(searchTerm || statusFilter !== "all") && !isLoading && (
        <p className="text-sm text-gray-400" aria-live="polite">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <ProposalSkeleton key={i} />)}
        </div>
      )}

      {/* Error */}
      {isError && (
        <Card className="p-8 bg-red-500/5 border-red-500/20 flex flex-col items-center text-center gap-3">
          <AlertCircle className="h-8 w-8 text-red-400" aria-hidden="true" />
          <p className="text-sm text-red-300">{(error as Error).message}</p>
        </Card>
      )}

      {/* Proposals list */}
      {!isLoading && !isError && (
        filtered.length === 0 ? (
          <Card className="p-12 bg-black/40 backdrop-blur-sm border-white/5 flex flex-col items-center justify-center text-center">
            <InboxIcon className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-gray-300">No proposals found</h3>
            <p className="text-sm text-gray-500 mt-1">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter."
                : "No proposals yet — create your first with AI."}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button
                className="mt-4 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
                onClick={() => navigate("/proposals/new")}
              >
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Create with AI
              </Button>
            )}
          </Card>
        ) : (
          <div className="space-y-4" role="list" aria-label="Proposals">
            {filtered.map((proposal) => {
              const { color, Icon } = statusConfig[proposal.status];
              return (
                <Card
                  key={proposal.id}
                  role="listitem"
                  className="p-6 bg-black/40 backdrop-blur-sm border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      <div
                        className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <FileText className="h-6 w-6 text-violet-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{proposal.title}</h3>
                        <p className="text-sm text-gray-400">
                          {proposal.vendor}
                          {proposal.amount > 0 && ` · $${proposal.amount.toLocaleString()}`}
                          {proposal.contract_type && ` · ${proposal.contract_type}`}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Created {formatDate(proposal.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                      <span className={`px-3 py-1 rounded-full flex items-center gap-2 text-sm ${color}`} role="status">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{STATUS_LABELS[proposal.status]}</span>
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReview(proposal)}
                        disabled={updateStatus.isPending}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default Proposals;
