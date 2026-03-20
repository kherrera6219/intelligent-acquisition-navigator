
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
import { Search, Building2, BarChart2, TrendingUp, Star, InboxIcon } from "lucide-react";
import { MetricsChart } from "@/components/MetricsChart";
import { useToast } from "@/hooks/use-toast";

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
}

const mockVendors: Vendor[] = [
  { id: "1", name: "TechCorp Solutions",  category: "IT Services",    rating: 4.5, contracts: 12, performance: 92 },
  { id: "2", name: "Global Office Supply", category: "Office Supplies", rating: 4.2, contracts: 8,  performance: 88 },
  { id: "3", name: "SecureNet Systems",   category: "Cybersecurity",  rating: 4.8, contracts: 15, performance: 95 },
];

const categories = Array.from(new Set(mockVendors.map((v) => v.category)));

const MarketResearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredVendors = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return mockVendors.filter((v) => {
      const matchesSearch = !term || v.name.toLowerCase().includes(term) || v.category.toLowerCase().includes(term);
      const matchesCategory = categoryFilter === "all" || v.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const handleViewDetails = (vendor: Vendor) => {
    toast({ title: "Vendor Details", description: `Loading details for ${vendor.name}…` });
  };

  return (
    <Container>
      <PageHeader
        title="Market Research"
        description="Analyze market trends and vendor performance"
      />

      {/* Summary metrics */}
      <Grid columns={3} gap="lg" className="mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
              <Building2 className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Active Vendors</h3>
              <p className="text-2xl font-bold text-white">234</p>
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
              <p className="text-2xl font-bold text-white">91%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
              <TrendingUp className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Market Growth</h3>
              <p className="text-2xl font-bold text-white">+12.5%</p>
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
            <h2 className="text-xl font-semibold text-white">Top Vendors</h2>
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

          {/* Results count */}
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
                        onClick={() => handleViewDetails(vendor)}
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
    </Container>
  );
};

export default MarketResearch;
