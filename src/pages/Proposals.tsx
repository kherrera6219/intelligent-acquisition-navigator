
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Filter, Plus, Clock, CheckCircle, XCircle, FolderOpen } from "lucide-react";

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
    status: "pending"
  },
  {
    id: "2",
    title: "IT Equipment Refresh",
    vendor: "TechVendor Pro",
    amount: 185000,
    submittedDate: "2024-02-08",
    status: "approved"
  },
  {
    id: "3",
    title: "Facility Maintenance Services",
    vendor: "MaintenanceCorp",
    amount: 95000,
    submittedDate: "2024-02-05",
    status: "rejected"
  }
];

const getStatusColor = (status: ProposalStatus) => {
  switch (status) {
    case "pending":
      return "text-yellow-400 bg-yellow-400/20";
    case "approved":
      return "text-green-400 bg-green-400/20";
    case "rejected":
      return "text-red-400 bg-red-400/20";
  }
};

const StatusIcon = ({ status }: { status: ProposalStatus }) => {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" aria-label={`Status: ${label}`} />;
    case "approved":
      return <CheckCircle className="h-4 w-4" aria-label={`Status: ${label}`} />;
    case "rejected":
      return <XCircle className="h-4 w-4" aria-label={`Status: ${label}`} />;
  }
};

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockProposals.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              Proposals
            </h1>
            <p className="text-gray-400">Manage and review procurement proposals</p>
          </div>
          <Button
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
            aria-label="Create new proposal"
          >
            <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
            New Proposal
          </Button>
        </div>

        <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5 mb-8">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <Input
                placeholder="Search proposals..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search proposals"
              />
            </div>
            <Button variant="outline" aria-label="Open filter options">
              <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
              Filters
            </Button>
          </div>
        </Card>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
            <FolderOpen className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-gray-300 mb-1">No proposals found</h3>
            <p className="text-sm text-gray-500">
              {searchTerm
                ? `No results for "${searchTerm}". Try adjusting your search.`
                : 'No proposals have been submitted yet. Create one to get started.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4" role="list" aria-label="Proposals list">
            {filtered.map((proposal) => (
              <Card
                key={proposal.id}
                className="p-6 bg-black/40 backdrop-blur-sm border-white/5 hover:bg-white/5 transition-colors"
                role="listitem"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
                      <FileText className="h-6 w-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{proposal.title}</h3>
                      <p className="text-sm text-gray-400">
                        {proposal.vendor} • ${proposal.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(proposal.status)}`}>
                      <StatusIcon status={proposal.status} />
                      <span className="text-sm capitalize">{proposal.status}</span>
                    </div>
                    <Button variant="outline" aria-label={`Review proposal: ${proposal.title}`}>
                      Review
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Proposals;
