
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "rgba(0,0,0,0.85)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#f9fafb",
};

const CONTRACT_COLORS: Record<string, string> = {
  "Fixed Price": "#8B5CF6",
  "Cost Plus":   "#EC4899",
  "T&M":         "#06B6D4",
  "IDIQ":        "#10B981",
  Other:         "#F59E0B",
};
const FALLBACK_COLOR = "#6B7280";

// ── Live data hooks ──────────────────────────────────────────────────────────

function useAnalyticsData() {
  return useQuery({
    queryKey: ["analytics-data"],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabase as any;

      // Fetch solicitations for volume + cycle time data
      const [solRes, propRes] = await Promise.allSettled([
        db.from("solicitations").select("status, type, created_at, updated_at"),
        db.from("proposals").select("contract_type, status, created_at, updated_at"),
      ]);

      const solicitations: Array<{ status: string; type: string; created_at: string; updated_at: string }> =
        solRes.status === "fulfilled" ? (solRes.value.data ?? []) : [];

      const proposals: Array<{ contract_type: string; status: string; created_at: string; updated_at: string }> =
        propRes.status === "fulfilled" ? (propRes.value.data ?? []) : [];

      // ── Build last-7-months labels ──
      const now = new Date();
      const months: string[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(d.toLocaleString("default", { month: "short" }));
      }

      // ── Acquisition volume per month ──
      const volumeMap: Record<string, { solicitations: number; awards: number; proposals: number }> = {};
      months.forEach((m) => { volumeMap[m] = { solicitations: 0, awards: 0, proposals: 0 }; });

      solicitations.forEach((s) => {
        const m = new Date(s.created_at).toLocaleString("default", { month: "short" });
        if (!volumeMap[m]) return;
        volumeMap[m].solicitations++;
        if (s.status === "APPROVED" || s.status === "PUBLISHED") volumeMap[m].awards++;
      });
      proposals.forEach((p) => {
        const m = new Date(p.created_at).toLocaleString("default", { month: "short" });
        if (!volumeMap[m]) return;
        volumeMap[m].proposals++;
      });

      const acquisitionVolume = months.map((month) => ({ month, ...volumeMap[month] }));

      // ── Cycle time per month (approved solicitations only) ──
      const cycleMap: Record<string, { total: number; count: number }> = {};
      months.forEach((m) => { cycleMap[m] = { total: 0, count: 0 }; });

      solicitations.forEach((s) => {
        if (s.status !== "APPROVED" && s.status !== "PUBLISHED") return;
        const m = new Date(s.created_at).toLocaleString("default", { month: "short" });
        if (!cycleMap[m]) return;
        const days = Math.round(
          (new Date(s.updated_at).getTime() - new Date(s.created_at).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (days >= 0) {
          cycleMap[m].total += days;
          cycleMap[m].count++;
        }
      });

      const cycleTimeTrend = months.map((month) => ({
        month,
        days: cycleMap[month].count > 0
          ? Math.round(cycleMap[month].total / cycleMap[month].count)
          : 0,
      }));

      // ── Contract type breakdown (proposals + solicitations combined) ──
      const typeCount: Record<string, number> = {};
      proposals.forEach((p) => {
        const t = p.contract_type || "Other";
        typeCount[t] = (typeCount[t] ?? 0) + 1;
      });
      solicitations.forEach((s) => {
        const t = s.type || "Other";
        typeCount[t] = (typeCount[t] ?? 0) + 1;
      });

      const totalTypes = Object.values(typeCount).reduce((a, b) => a + b, 0) || 1;
      const contractTypeBreakdown = Object.entries(typeCount).map(([name, count]) => ({
        name,
        value: Math.round((count / totalTypes) * 100),
        color: CONTRACT_COLORS[name] ?? FALLBACK_COLOR,
      }));

      // ── KPIs ──
      const activeSolicitations = solicitations.filter(
        (s) => s.status === "DRAFT" || s.status === "IN_REVIEW"
      ).length;
      const awardsThisMonth = solicitations.filter((s) => {
        const m = new Date(s.updated_at).toLocaleString("default", { month: "short" });
        const curMonth = now.toLocaleString("default", { month: "short" });
        return m === curMonth && (s.status === "APPROVED" || s.status === "PUBLISHED");
      }).length;
      const avgCycle = cycleTimeTrend.at(-1)?.days ?? 0;
      const approved = solicitations.filter((s) => s.status === "APPROVED" || s.status === "PUBLISHED").length;
      const complianceRate = solicitations.length > 0
        ? ((approved / solicitations.length) * 100).toFixed(1)
        : "0.0";

      return { acquisitionVolume, cycleTimeTrend, contractTypeBreakdown, activeSolicitations, awardsThisMonth, avgCycle, complianceRate };
    },
    retry: false,
  });
}

// ── Chart skeleton ───────────────────────────────────────────────────────────

function ChartSkeleton({ height = 240 }: { height?: number }) {
  return <Skeleton className="w-full bg-white/5 rounded-lg" style={{ height }} />;
}

// ── Analytics page ───────────────────────────────────────────────────────────

const Analytics = () => {
  const { data, isLoading } = useAnalyticsData();

  const kpis = data
    ? [
        { label: "Active Solicitations", value: String(data.activeSolicitations), delta: "live", positive: true },
        { label: "Awards This Month",    value: String(data.awardsThisMonth),      delta: "live", positive: true },
        { label: "Avg Cycle Time",       value: data.avgCycle ? `${data.avgCycle}d` : "—", delta: "live", positive: true },
        { label: "Approval Rate",        value: `${data.complianceRate}%`,          delta: "live", positive: true },
      ]
    : [
        { label: "Active Solicitations", value: "—", delta: "…", positive: true },
        { label: "Awards This Month",    value: "—", delta: "…", positive: true },
        { label: "Avg Cycle Time",       value: "—", delta: "…", positive: true },
        { label: "Approval Rate",        value: "—", delta: "…", positive: true },
      ];

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Live acquisition performance metrics — data pulled directly from the database."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Analytics" }]}
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-4 bg-white/5 border-white/10">
            <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
            {isLoading ? (
              <Skeleton className="h-8 w-20 bg-white/10 mt-1" />
            ) : (
              <>
                <p className="text-2xl font-bold text-white">{kpi.value}</p>
                <Badge
                  variant="outline"
                  className="mt-1 text-xs border-emerald-500/30 text-emerald-400"
                >
                  {kpi.delta}
                </Badge>
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Acquisition volume chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 p-5 bg-white/5 border-white/10">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Acquisition Volume (7 months)
          </h3>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data?.acquisitionVolume ?? []} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 11 }} />
                <Bar dataKey="solicitations" fill="#8B5CF6" radius={[3,3,0,0]} name="Solicitations" />
                <Bar dataKey="awards"        fill="#10B981" radius={[3,3,0,0]} name="Awards" />
                <Bar dataKey="proposals"     fill="#3B82F6" radius={[3,3,0,0]} name="Proposals" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card className="p-5 bg-white/5 border-white/10">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Contract Type Mix</h3>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={data?.contractTypeBreakdown ?? []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {(data?.contractTypeBreakdown ?? []).map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, ""]} />
                <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Cycle time trend */}
      <Card className="p-5 bg-white/5 border-white/10">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">
          Average Acquisition Cycle Time (days)
        </h3>
        {isLoading ? (
          <ChartSkeleton height={200} />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data?.cycleTimeTrend ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <YAxis domain={["auto", "auto"]} stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="days"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#8B5CF6" }}
                activeDot={{ r: 6 }}
                name="Cycle days"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>
    </>
  );
};

export default Analytics;
