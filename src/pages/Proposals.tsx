
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { FileText, Search, Filter, Plus, Clock, CheckCircle, XCircle } from "lucide-react";

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

const getStatusIcon = (status: ProposalStatus) => {
  switch (status) {
    case "pending":
      return Clock;
    case "approved":
      return CheckCircle;
    case "rejected":
      return XCircle;
  }
};

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <div className="pl-64">
        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                Proposals
              </h1>
              <p className="text-gray-400">Manage and review procurement proposals</p>
            </div>
            <Button className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
              <Plus className="h-5 w-5 mr-2" />
              New Proposal
            </Button>
          </div>

          <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5 mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search proposals..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            {mockProposals.map((proposal) => {
              const StatusIcon = getStatusIcon(proposal.status);
              return (
                <Card 
                  key={proposal.id}
                  className="p-6 bg-black/40 backdrop-blur-sm border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
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
                        <StatusIcon className="h-4 w-4" />
                        <span className="text-sm capitalize">{proposal.status}</span>
                      </div>
                      <Button variant="outline">Review</Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proposals;
