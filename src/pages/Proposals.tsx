
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Search, Plus, Clock, CheckCircle, XCircle, InboxIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ProposalStatus = "pending" | "approved" | "rejected";

interface Proposal {
  id: string;
  title: string;
  vendor: string;
  amount: number;
  submittedDate: string;
  status: ProposalStatus;
}

const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "Office Supplies Procurement Q1",
    vendor: "SupplyTech Solutions",
    amount: 24500,
    submittedDate: "2024-02-10",
    status: "pending",
  },
  {
    id: "2",
    title: "IT Equipment Refresh",
    vendor: "TechVendor Pro",
    amount: 185000,
    submittedDate: "2024-02-08",
    status: "approved",
  },
  {
    id: "3",
    title: "Facility Maintenance Services",
    vendor: "MaintenanceCorp",
    amount: 95000,
    submittedDate: "2024-02-05",
    status: "rejected",
  },
];

const statusConfig: Record<ProposalStatus, { color: string; Icon: React.ComponentType<{ className?: string }> }> = {
  pending:  { color: "text-yellow-400 bg-yellow-400/20", Icon: Clock },
  approved: { color: "text-green-400 bg-green-400/20",  Icon: CheckCircle },
  rejected: { color: "text-red-400 bg-red-400/20",      Icon: XCircle },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | "all">("all");
  const { toast } = useToast();

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return mockProposals.filter((p) => {
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.vendor.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const handleReview = (proposal: Proposal) => {
    toast({
      title: "Review Opened",
      description: `Opening review workspace for "${proposal.title}"`,
    });
  };

  const handleNewProposal = () => {
    toast({
      title: "Coming Soon",
      description: "Proposal creation is not yet available.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
            Proposals
          </h1>
          <p className="text-gray-400 mt-1">Manage and review procurement proposals</p>
        </div>
        <Button
          onClick={handleNewProposal}
          className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 self-start sm:self-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Proposal
        </Button>
      </div>

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
            <SelectTrigger className="w-full sm:w-40 border-white/10 bg-white/5" aria-label="Filter by status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Results count */}
      {(searchTerm || statusFilter !== "all") && (
        <p className="text-sm text-gray-400" aria-live="polite">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Proposals list */}
      {filtered.length === 0 ? (
        <Card className="p-12 bg-black/40 backdrop-blur-sm border-white/5 flex flex-col items-center justify-center text-center">
          <InboxIcon className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-300">No proposals found</h3>
          <p className="text-sm text-gray-500 mt-1">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter."
              : "No proposals have been submitted yet."}
          </p>
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
                    <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
                      <FileText className="h-6 w-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{proposal.title}</h3>
                      <p className="text-sm text-gray-400">
                        {proposal.vendor} &bull; ${proposal.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Submitted {formatDate(proposal.submittedDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <span className={`px-3 py-1 rounded-full flex items-center gap-2 text-sm ${color}`} role="status">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="capitalize">{proposal.status}</span>
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleReview(proposal)}>
                      Review
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Proposals;
