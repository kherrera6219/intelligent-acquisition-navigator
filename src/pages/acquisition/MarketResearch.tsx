import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Building2, BarChart2, TrendingUp, FolderOpen } from "lucide-react";
import { MetricsChart } from "@/components/MetricsChart";
import { supabase } from "@/integrations/supabase/client";

type Vendor = {
  id: string;
  name: string;
  category: string;
  rating: number;
  contracts: number;
  performance: number;
};

type MarketMetric = {
  id: string;
  month: string;
  efficiency: number;
  compliance: number;
  risk: number;
};

const MarketResearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useQuery({
    queryKey: ["market-research"],
    queryFn: async () => {
      const [vendorsResult, metricsResult] = await Promise.all([
        supabase.from("vendors").select("*"),
        supabase.from("market_metrics").select("*"),
      ]);

      if (vendorsResult.error || metricsResult.error) {
        throw new Error("Failed to load market research data.");
      }

      return {
        vendors: (vendorsResult.data ?? []) as Vendor[],
        metrics: (metricsResult.data ?? []) as MarketMetric[],
      };
    },
  });

  const vendors = data?.vendors ?? [];
  const metricsData = data?.metrics ?? [];

  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averagePerformance = vendors.length
    ? Math.round(vendors.reduce((sum, vendor) => sum + vendor.performance, 0) / vendors.length)
    : 0;

  const marketGrowth = metricsData.length > 1
    ? Math.round(((metricsData[metricsData.length - 1].efficiency - metricsData[0].efficiency) / metricsData[0].efficiency) * 1000) / 10
    : 0;

  return (
    <Container>
      <PageHeader
        title="Market Research"
        description="Analyze market trends and vendor performance"
      />

      <Grid columns={3} gap="lg" className="mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
              <Building2 className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Active Vendors</h3>
              <p className="text-2xl font-bold text-white">{vendors.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-fuchsia-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
              <BarChart2 className="h-6 w-6 text-fuchsia-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">
                Avg Performance
              </h3>
              <p className="text-2xl font-bold text-white">{averagePerformance}%</p>
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
              <p className="text-2xl font-bold text-white">
                {marketGrowth >= 0 ? "+" : ""}
                {marketGrowth}%
              </p>
            </div>
          </div>
        </Card>
      </Grid>

      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Performance Trends
          </h2>
          <MetricsChart data={metricsData} type="line" />
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Top Vendors</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  placeholder="Search vendors..."
                  className="pl-10 bg-white/5 border-white/10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search vendors"
                />
              </div>
              <Button variant="outline" className="border-white/10" aria-label="Open vendor filters">
                <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
                Filters
              </Button>
            </div>
          </div>

          {filteredVendors.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center" role="status">
              <FolderOpen className="h-10 w-10 text-gray-600 mb-3" aria-hidden="true" />
              <p className="text-gray-300 font-medium">No vendors found</p>
              <p className="text-sm text-gray-500 mt-1">
                {searchTerm ? `No results for "${searchTerm}".` : "No vendor data available."}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {filteredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {vendor.name}
                    </h3>
                    <p className="text-sm text-gray-400">{vendor.category}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Rating</p>
                      <p className="text-lg font-semibold text-white">
                        {vendor.rating}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Contracts</p>
                      <p className="text-lg font-semibold text-white">
                        {vendor.contracts}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Performance</p>
                      <p className="text-lg font-semibold text-white">
                        {vendor.performance}%
                      </p>
                    </div>
                    <Button variant="outline" className="border-white/10">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default MarketResearch;
