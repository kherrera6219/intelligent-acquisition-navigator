
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
import { FileText, Search, Clock, InboxIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type RiskLevel = "low" | "medium" | "high";
type SolicitationStatus = "pending" | "review" | "approved";

interface Solicitation {
  id: string;
  title: string;
  status: SolicitationStatus;
  riskLevel: RiskLevel;
  dueDate: string;
  department: string;
}

const mockSolicitations: Solicitation[] = [
  {
    id: "1",
    title: "IT Services Support",
    status: "pending",
    riskLevel: "low",
    dueDate: "2024-03-15",
    department: "Information Technology",
  },
  {
    id: "2",
    title: "Office Equipment Procurement",
    status: "review",
    riskLevel: "medium",
    dueDate: "2024-03-20",
    department: "Facilities",
  },
  {
    id: "3",
    title: "Security Services Contract",
    status: "pending",
    riskLevel: "high",
    dueDate: "2024-03-25",
    department: "Security",
  },
];

const riskColors: Record<RiskLevel, string> = {
  low:    "bg-green-400/20 text-green-400",
  medium: "bg-yellow-400/20 text-yellow-400",
  high:   "bg-red-400/20 text-red-400",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const SolicitationReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [statusFilter, setStatusFilter] = useState<SolicitationStatus | "all">("all");
  const { toast } = useToast();

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return mockSolicitations.filter((s) => {
      const matchesSearch =
        !term ||
        s.title.toLowerCase().includes(term) ||
        s.department.toLowerCase().includes(term);
      const matchesRisk = riskFilter === "all" || s.riskLevel === riskFilter;
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesSearch && matchesRisk && matchesStatus;
    });
  }, [searchTerm, riskFilter, statusFilter]);

  const handleReview = (solicitation: Solicitation) => {
    toast({
      title: "Review Started",
      description: `Opening review workspace for "${solicitation.title}"`,
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
      />

      {/* Filters */}
      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search by title or department…"
              className="pl-10 bg-white/5 border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search solicitations"
            />
          </div>
          <Select value={riskFilter} onValueChange={(v) => setRiskFilter(v as RiskLevel | "all")}>
            <SelectTrigger className="w-full sm:w-36 border-white/10 bg-white/5" aria-label="Filter by risk level">
              <SelectValue placeholder="All risks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All risks</SelectItem>
              <SelectItem value="low">Low risk</SelectItem>
              <SelectItem value="medium">Medium risk</SelectItem>
              <SelectItem value="high">High risk</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as SolicitationStatus | "all")}>
            <SelectTrigger className="w-full sm:w-36 border-white/10 bg-white/5" aria-label="Filter by status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="review">In review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Results count */}
      {(searchTerm || riskFilter !== "all" || statusFilter !== "all") && (
        <p className="text-sm text-gray-400 mb-4" aria-live="polite">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center">
          <InboxIcon className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-300">No solicitations found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
        </Card>
      ) : (
        <Grid columns={1} gap="lg">
          {filtered.map((solicitation) => (
            <Card
              key={solicitation.id}
              className="hover:bg-white/5 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
                    <FileText className="h-6 w-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{solicitation.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400">{solicitation.department}</span>
                      <span className="text-gray-600" aria-hidden="true">&bull;</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${riskColors[solicitation.riskLevel]}`}
                        role="status"
                        aria-label={`Risk level: ${solicitation.riskLevel}`}
                      >
                        {solicitation.riskLevel.toUpperCase()} RISK
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-gray-300 capitalize"
                        role="status"
                      >
                        {solicitation.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span className="text-sm">Due {formatDate(solicitation.dueDate)}</span>
                  </div>
                  <Button
                    onClick={() => handleReview(solicitation)}
                    className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
                    size="sm"
                  >
                    Review
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

export default SolicitationReview;
