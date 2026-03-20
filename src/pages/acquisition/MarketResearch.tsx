
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Search, Building2, BarChart2, TrendingUp, Star, InboxIcon, ExternalLink, Award, FileCheck } from "lucide-react";
import { MetricsChart } from "@/components/MetricsChart";

const mockData = [
  { month: "Jan", efficiency: 85, compliance: 90, risk: 15 },
  { month: "Feb", efficiency: 88, compliance: 92, risk: 12 },
  { month: "Mar", efficiency: 92, compliance: 95, risk: 8  },
];

interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  contracts: number;
  performance: number;
  cage?: string;
  uei?: string;
  naics?: string[];
  setAsides?: string[];
  activeContracts?: number;
  totalValue?: string;
  pastPerformanceSummary?: string;
}

const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    category: "IT Services",
    rating: 4.5,
    contracts: 12,
    performance: 92,
    cage: "3TK21",
    uei: "ABCDEF123456",
    naics: ["541512", "541511", "541519"],
    setAsides: ["Small Business", "8(a)"],
    activeContracts: 4,
    totalValue: "$14.2M",
    pastPerformanceSummary:
      "Consistently delivered IT support services on time across DoD and civilian agency contracts. CPARS ratings average 'Very Good' with no significant deficiencies.",
  },
  {
    id: "2",
    name: "Global Office Supply",
    category: "Office Supplies",
    rating: 4.2,
    contracts: 8,
    performance: 88,
    cage: "7HK93",
    uei: "GHIJKL789012",
    naics: ["424120", "453210"],
    setAsides: ["Small Business", "HUBZone"],
    activeContracts: 2,
    totalValue: "$3.8M",
    pastPerformanceSummary:
      "Reliable GSA Schedule vendor for office supplies. Minor delivery delays recorded in FY24 Q2 but resolved through corrective action plan.",
  },
  {
    id: "3",
    name: "SecureNet Systems",
    category: "Cybersecurity",
    rating: 4.8,
    contracts: 15,
    performance: 95,
    cage: "5MR40",
    uei: "MNOPQR345678",
    naics: ["541512", "541690", "518210"],
    setAsides: ["Small Business", "SDVOSB"],
    activeContracts: 6,
    totalValue: "$28.6M",
    pastPerformanceSummary:
      "Top-rated cybersecurity contractor with CMMC Level 3 certification. Holds active FedRAMP authorization. Exceptional performance on DHS and DoD SIEM implementation contracts.",
  },
];

const categories = Array.from(new Set(mockVendors.map((v) => v.category)));

const MarketResearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filteredVendors = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return mockVendors.filter((v) => {
      const matchesSearch = !term || v.name.toLowerCase().includes(term) || v.category.toLowerCase().includes(term);
      const matchesCategory = categoryFilter === "all" || v.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <Container>
      <PageHeader
        title="Market Research"
        description="Analyze market trends and evaluate vendor performance for informed procurement decisions."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Acquisition" },
          { label: "Market Research" },
        ]}
      />

      {/* Summary metrics */}
      <Grid columns={3} gap="lg" className="mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
              <Building2 className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Tracked Vendors</h3>
              <p className="text-2xl font-bold text-white">{mockVendors.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-fuchsia-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
              <BarChart2 className="h-6 w-6 text-fuchsia-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Avg Performance</h3>
              <p className="text-2xl font-bold text-white">
                {Math.round(mockVendors.reduce((a, v) => a + v.performance, 0) / mockVendors.length)}%
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
              <TrendingUp className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Total Contracts</h3>
              <p className="text-2xl font-bold text-white">
                {mockVendors.reduce((a, v) => a + v.contracts, 0)}
              </p>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Performance chart */}
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Performance Trends</h2>
          <MetricsChart data={mockData} type="line" />
        </div>
      </Card>

      {/* Vendor list */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-white">Vendors</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  placeholder="Search vendors…"
                  className="pl-10 bg-white/5 border-white/10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search vendors"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-44 border-white/10 bg-white/5" aria-label="Filter by category">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchTerm || categoryFilter !== "all") && (
            <p className="text-sm text-gray-400 mb-4" aria-live="polite">
              {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""} found
            </p>
          )}

          {filteredVendors.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <InboxIcon className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
              <h3 className="text-lg font-medium text-gray-300">No vendors found</h3>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="space-y-4" role="list" aria-label="Vendor list">
              {filteredVendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  role="listitem"
                  className="hover:bg-white/5 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">{vendor.name}</h3>
                      <p className="text-sm text-gray-400">{vendor.category}</p>
                    </div>
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="text-center">
                        <p className="text-xs text-gray-400 mb-0.5">Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                          <p className="text-lg font-semibold text-white">{vendor.rating}</p>
                          <span className="sr-only">out of 5</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400 mb-0.5">Contracts</p>
                        <p className="text-lg font-semibold text-white">{vendor.contracts}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400 mb-0.5">Performance</p>
                        <p className="text-lg font-semibold text-white">{vendor.performance}%</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10"
                        onClick={() => setSelectedVendor(vendor)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Vendor detail sheet */}
      <Sheet open={!!selectedVendor} onOpenChange={(open) => { if (!open) setSelectedVendor(null); }}>
        <SheetContent className="bg-gray-900 border-white/10 w-full sm:max-w-lg overflow-y-auto">
          {selectedVendor && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-white text-xl">{selectedVendor.name}</SheetTitle>
                <SheetDescription className="text-gray-400">{selectedVendor.category}</SheetDescription>
              </SheetHeader>

              {/* Identifiers */}
              <section className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Identifiers</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {selectedVendor.cage && (
                    <div>
                      <p className="text-gray-500 text-xs">CAGE Code</p>
                      <p className="text-gray-200 font-mono">{selectedVendor.cage}</p>
                    </div>
                  )}
                  {selectedVendor.uei && (
                    <div>
                      <p className="text-gray-500 text-xs">UEI</p>
                      <p className="text-gray-200 font-mono">{selectedVendor.uei}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Set-asides */}
              {selectedVendor.setAsides && selectedVendor.setAsides.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Socioeconomic / Set-Asides</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.setAsides.map((s) => (
                      <Badge key={s} variant="outline" className="border-violet-500/30 text-violet-400 text-xs">{s}</Badge>
                    ))}
                  </div>
                </section>
              )}

              {/* NAICS codes */}
              {selectedVendor.naics && selectedVendor.naics.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">NAICS Codes</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.naics.map((n) => (
                      <Badge key={n} variant="outline" className="border-white/10 text-gray-300 text-xs font-mono">{n}</Badge>
                    ))}
                  </div>
                </section>
              )}

              {/* Metrics */}
              <section className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Award className="h-4 w-4 text-yellow-400 mx-auto mb-1" aria-hidden="true" />
                    <p className="text-lg font-bold text-white">{selectedVendor.rating}/5</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <FileCheck className="h-4 w-4 text-emerald-400 mx-auto mb-1" aria-hidden="true" />
                    <p className="text-lg font-bold text-white">{selectedVendor.performance}%</p>
                    <p className="text-xs text-gray-500">Performance</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Building2 className="h-4 w-4 text-violet-400 mx-auto mb-1" aria-hidden="true" />
                    <p className="text-lg font-bold text-white">{selectedVendor.activeContracts ?? "—"}</p>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                </div>
                {selectedVendor.totalValue && (
                  <p className="text-sm text-gray-400 mt-3">
                    Total contract value: <span className="text-white font-medium">{selectedVendor.totalValue}</span>
                  </p>
                )}
              </section>

              {/* Past performance */}
              {selectedVendor.pastPerformanceSummary && (
                <section className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Past Performance Summary</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedVendor.pastPerformanceSummary}</p>
                </section>
              )}

              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/10 text-gray-300 hover:text-white mt-2"
                onClick={() => window.open(`https://sam.gov/entity/${selectedVendor.uei}`, "_blank", "noopener,noreferrer")}
              >
                <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                View on SAM.gov
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Container>
  );
};

export default MarketResearch;
