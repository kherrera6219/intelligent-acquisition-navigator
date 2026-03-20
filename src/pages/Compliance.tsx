import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  ShieldCheck,
  ScanLine,
  Loader2,
  Sparkles,
} from "lucide-react";
import { getAICompletion } from "@/services/azure/aiService";
import { useToast } from "@/hooks/use-toast";
import { pushNotification } from "@/hooks/useNotifications";

type ComplianceStatus = "compliant" | "non-compliant" | "pending";

interface ComplianceItem {
  id: string;
  regulation: string;
  reference: string;
  description: string;
  status: ComplianceStatus;
  lastChecked: string;
  category: string;
  source?: "manual" | "ai_scan";
}

const initialItems: ComplianceItem[] = [
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

// Parse AI-generated compliance analysis into ComplianceItem list
function parseAIScanResults(aiText: string): ComplianceItem[] {
  const items: ComplianceItem[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Extract lines that look like regulation findings
  const lines = aiText.split("\n").filter((l) => l.trim().length > 10);

  // Find references like "FAR 52.xxx", "DFARS 252.xxx", etc.
  const refPattern = /(FAR|DFARS|GSAM|HHSAR|DEARS)\s+[\d.]+(-[\w]+)*/gi;

  let id = Date.now();
  const seen = new Set<string>();

  for (const line of lines) {
    const matches = line.match(refPattern);
    if (!matches) continue;

    for (const ref of matches) {
      const normalizedRef = ref.toUpperCase().replace(/\s+/g, " ");
      if (seen.has(normalizedRef)) continue;
      seen.add(normalizedRef);

      // Determine status based on keywords in surrounding context
      const lower = line.toLowerCase();
      let status: ComplianceStatus = "pending";
      if (lower.includes("compliant") && !lower.includes("non") && !lower.includes("not") && !lower.includes("fail")) {
        status = "compliant";
      } else if (
        lower.includes("non-compliant") ||
        lower.includes("noncompliant") ||
        lower.includes("violation") ||
        lower.includes("missing") ||
        lower.includes("fail") ||
        lower.includes("does not")
      ) {
        status = "non-compliant";
      }

      const parts = normalizedRef.split(" ");
      const regulation = parts[0];
      const reference = parts.slice(1).join(" ");

      // Category heuristic
      let category = "General";
      if (/19\./i.test(reference)) category = "Small Business";
      else if (/252\.204/i.test(reference)) category = "Cybersecurity";
      else if (/15\./i.test(reference)) category = "Source Selection";
      else if (/52\./i.test(reference)) category = "Contract Clauses";
      else if (/22\./i.test(reference)) category = "Labor Standards";
      else if (/9\./i.test(reference)) category = "Contractor Responsibility";

      items.push({
        id: String(id++),
        regulation,
        reference,
        description: line.replace(refPattern, "").replace(/[•\-*:]+/g, "").trim().slice(0, 120) || "See analysis",
        status,
        lastChecked: today,
        category,
        source: "ai_scan",
      });
    }
  }

  return items;
}

// ── AI Compliance Scanner Modal ─────────────────────────────────────────────
interface ScannerModalProps {
  open: boolean;
  onClose: () => void;
  onResults: (items: ComplianceItem[]) => void;
}

function ComplianceScannerModal({ open, onClose, onResults }: ScannerModalProps) {
  const [documentText, setDocumentText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const handleScan = async () => {
    if (documentText.trim().length < 50) {
      toast({ title: "Too short", description: "Paste at least 50 characters of document text.", variant: "destructive" });
      return;
    }

    setIsScanning(true);
    try {
      const systemPrompt = `You are a federal acquisition compliance expert specializing in FAR and DFARS.
Analyze the provided document text and identify all FAR/DFARS compliance issues, citations, and requirements.
For each finding, clearly state:
1. The specific regulation reference (e.g., FAR 52.215-2, DFARS 252.204-7012)
2. Whether it is compliant, non-compliant, or pending review
3. A brief description of the requirement or issue found
Format each finding on its own line starting with the regulation reference.
Be specific and actionable. Reference actual FAR/DFARS clause numbers.`;

      const response = await getAICompletion([
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Analyze the following acquisition document for FAR/DFARS compliance:\n\n${documentText}`,
        },
      ]);

      const content = response.choices[0]?.message?.content ?? "";
      const parsed = parseAIScanResults(content);

      if (parsed.length === 0) {
        toast({
          title: "No regulations detected",
          description: "The AI found no specific FAR/DFARS references. Try pasting a solicitation or contract clause section.",
        });
      } else {
        onResults(parsed);
        pushNotification({
          type: "compliance_alert",
          title: "Compliance scan complete",
          body: `AI found ${parsed.length} regulatory reference${parsed.length !== 1 ? "s" : ""} in your document.`,
          resourceType: "compliance",
        });
        onClose();
      }
    } catch {
      toast({ title: "Scan failed", description: "The AI service could not process the document.", variant: "destructive" });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-xl bg-gray-900 border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5 text-violet-400" aria-hidden="true" />
            AI Compliance Scanner
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Paste solicitation text, contract clauses, or a Statement of Work. The AI will identify FAR/DFARS
            compliance issues and relevant regulatory citations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <Label htmlFor="scan-text" className="text-sm text-gray-400">Document Text *</Label>
          <Textarea
            id="scan-text"
            placeholder="Paste your solicitation, SOW, or contract clause text here…"
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            className="bg-white/5 border-white/10 min-h-48 text-sm text-gray-200 resize-y"
            disabled={isScanning}
          />
          <p className="text-xs text-gray-600">{documentText.length} characters</p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onClose} disabled={isScanning}>
            Cancel
          </Button>
          <Button
            onClick={handleScan}
            disabled={isScanning || documentText.trim().length < 50}
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
          >
            {isScanning ? (
              <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" aria-hidden="true" /> Scanning…</>
            ) : (
              <><ScanLine className="h-4 w-4 mr-1.5" aria-hidden="true" /> Scan Document</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
const Compliance = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [items, setItems] = useState<ComplianceItem[]>(initialItems);

  const handleScanResults = (newItems: ComplianceItem[]) => {
    setItems((prev) => [...newItems, ...prev]);
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category)));
    return ["all", ...cats];
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        !q ||
        item.regulation.toLowerCase().includes(q) ||
        item.reference.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [items, search, statusFilter, categoryFilter]);

  const summary = useMemo(() => ({
    compliant: items.filter((i) => i.status === "compliant").length,
    nonCompliant: items.filter((i) => i.status === "non-compliant").length,
    pending: items.filter((i) => i.status === "pending").length,
  }), [items]);

  return (
    <>
      <ComplianceScannerModal
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onResults={handleScanResults}
      />

      <PageHeader
        title="Compliance"
        description="Monitor FAR/DFARS regulatory compliance across all acquisition activities."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Compliance" }]}
        actions={
          <Button
            onClick={() => setScannerOpen(true)}
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
          >
            <ScanLine className="h-4 w-4 mr-2" aria-hidden="true" />
            Scan Document
          </Button>
        }
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
        Showing {filtered.length} of {items.length} items
      </p>

      <div className="space-y-3" role="list">
        {filtered.map((item) => {
          const { icon: Icon, color, label, badge } = statusConfig[item.status];
          return (
            <Card
              key={item.id}
              className="p-4 bg-white/5 border-white/10 hover:bg-white/[0.07] transition-colors"
              role="listitem"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${color}`} aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-200">{item.regulation}</span>
                      <code className="text-xs text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">
                        {item.reference}
                      </code>
                      <Badge variant="outline" className={`text-[10px] ${badge}`}>{label}</Badge>
                      {item.source === "ai_scan" && (
                        <Badge variant="outline" className="text-[10px] border-fuchsia-500/30 text-fuchsia-400">
                          <Sparkles className="h-2.5 w-2.5 mr-1" aria-hidden="true" />
                          AI Scan
                        </Badge>
                      )}
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
