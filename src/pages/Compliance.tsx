
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, XCircle, AlertTriangle, Search, ShieldCheck } from "lucide-react";

type ComplianceStatus = "compliant" | "non-compliant" | "pending";

interface ComplianceItem {
  id: string;
  regulation: string;
  reference: string;
  description: string;
  status: ComplianceStatus;
  lastChecked: string;
  category: string;
}

const mockItems: ComplianceItem[] = [
  { id: "1", regulation: "FAR Part 15", reference: "15.304", description: "Evaluation factors and significant subfactors", status: "compliant", lastChecked: "2026-03-18", category: "Source Selection" },
  { id: "2", regulation: "FAR Part 19", reference: "19.502-2", description: "Total small business set-asides", status: "compliant", lastChecked: "2026-03-17", category: "Small Business" },
  { id: "3", regulation: "DFARS 252.204", reference: "252.204-7012", description: "Safeguarding covered defense information", status: "pending", lastChecked: "2026-03-15", category: "Cybersecurity" },
  { id: "4", regulation: "FAR Part 4", reference: "4.1202", description: "Solicitation provision and contract clause", status: "compliant", lastChecked: "2026-03-19", category: "Contract Clauses" },
  { id: "5", regulation: "FAR Part 52", reference: "52.215-2", description: "Audit and records — negotiation", status: "non-compliant", lastChecked: "2026-03-10", category: "Audit" },
  { id: "6", regulation: "DFARS 212.301", reference: "212.301", description: "Solicitation provisions and contract clauses for commercial items", status: "compliant", lastChecked: "2026-03-18", category: "Commercial Items" },
  { id: "7", regulation: "FAR Part 9", reference: "9.104-1", description: "General standards for contractor responsibility", status: "pending", lastChecked: "2026-03-12", category: "Contractor Responsibility" },
  { id: "8", regulation: "FAR Part 22", reference: "22.1002-1", description: "Statutory requirements for minimum wages", status: "compliant", lastChecked: "2026-03-16", category: "Labor Standards" },
];

const statusConfig: Record<ComplianceStatus, { icon: typeof CheckCircle2; color: string; label: string; badge: string }> = {
  compliant: { icon: CheckCircle2, color: "text-emerald-400", label: "Compliant", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  "non-compliant": { icon: XCircle, color: "text-red-400", label: "Non-Compliant", badge: "bg-red-500/10 text-red-400 border-red-500/20" },
  pending: { icon: AlertTriangle, color: "text-amber-400", label: "Pending Review", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

const Compliance = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(mockItems.map((i) => i.category)));
    return ["all", ...cats];
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mockItems.filter((item) => {
      const matchesSearch =
        !q ||
        item.regulation.toLowerCase().includes(q) ||
        item.reference.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, statusFilter, categoryFilter]);

  const summary = useMemo(() => ({
    compliant: mockItems.filter((i) => i.status === "compliant").length,
    nonCompliant: mockItems.filter((i) => i.status === "non-compliant").length,
    pending: mockItems.filter((i) => i.status === "pending").length,
  }), []);

  return (
    <>
      <PageHeader
        title="Compliance"
        description="Monitor FAR/DFARS regulatory compliance across all acquisition activities."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Compliance" }]}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-emerald-500/5 border-emerald-500/20">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            <span className="text-xs text-gray-400">Compliant</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{summary.compliant}</p>
        </Card>
        <Card className="p-4 bg-red-500/5 border-red-500/20">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="h-4 w-4 text-red-400" aria-hidden="true" />
            <span className="text-xs text-gray-400">Non-Compliant</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{summary.nonCompliant}</p>
        </Card>
        <Card className="p-4 bg-amber-500/5 border-amber-500/20">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-amber-400" aria-hidden="true" />
            <span className="text-xs text-gray-400">Pending</span>
          </div>
          <p className="text-2xl font-bold text-amber-400">{summary.pending}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" aria-hidden="true" />
          <Input
            placeholder="Search regulations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            aria-label="Search compliance items"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44 bg-white/5 border-white/10 text-gray-300">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="compliant">Compliant</SelectItem>
            <SelectItem value="non-compliant">Non-Compliant</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-52 bg-white/5 border-white/10 text-gray-300">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c === "all" ? "All categories" : c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <p className="text-xs text-gray-500 mb-3" aria-live="polite">
        Showing {filtered.length} of {mockItems.length} items
      </p>

      <div className="space-y-3" role="list">
        {filtered.map((item) => {
          const { icon: Icon, color, label, badge } = statusConfig[item.status];
          return (
            <Card key={item.id} className="p-4 bg-white/5 border-white/10 hover:bg-white/[0.07] transition-colors" role="listitem">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${color}`} aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-200">{item.regulation}</span>
                      <code className="text-xs text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">{item.reference}</code>
                      <Badge variant="outline" className={`text-[10px] ${badge}`}>{label}</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mt-0.5">{item.description}</p>
                    <p className="text-[10px] text-gray-600 mt-1">
                      Category: {item.category} · Last checked: {new Date(item.lastChecked).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <ShieldCheck className="h-10 w-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
          <p className="text-sm">No compliance items match your filters.</p>
        </div>
      )}
    </>
  );
};

export default Compliance;
