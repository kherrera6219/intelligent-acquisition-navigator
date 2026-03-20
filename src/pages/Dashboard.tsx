
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardCard } from "@/components/layout/DashboardCard";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Shield, Clock, CheckCircle } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart as ReBarChart,
  Bar,
} from "recharts";

const chartTooltipStyle = {
  backgroundColor: "rgba(0,0,0,0.8)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#fff",
};

// ── Supabase data hooks ──────────────────────────────────────────────────────

function useDashboardKPIs() {
  return useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sol = supabase as any;

      const [pendingRes, approvedRes, complianceRes] = await Promise.allSettled([
        sol.from("solicitations").select("id", { count: "exact", head: true })
          .in("status", ["DRAFT", "IN_REVIEW"]),
        sol.from("solicitations").select("id", { count: "exact", head: true })
          .in("status", ["APPROVED", "PUBLISHED"]),
        sol.from("solicitations").select("id", { count: "exact", head: true }),
      ]);

      const pending  = pendingRes.status  === "fulfilled" ? (pendingRes.value.count  ?? 0) : 0;
      const approved = approvedRes.status === "fulfilled" ? (approvedRes.value.count ?? 0) : 0;
      const total    = complianceRes.status === "fulfilled" ? (complianceRes.value.count ?? 0) : 0;
      const complianceRate = total > 0 ? Math.round((approved / total) * 100) : 0;

      return { pending, approved, complianceRate, total };
    },
    retry: false,
  });
}

function useDashboardChartData() {
  return useQuery({
    queryKey: ["dashboard-chart"],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from("solicitations")
        .select("status, created_at")
        .order("created_at", { ascending: true });

      if (error || !data) return { taskQueueData: [], performanceLine: [] };

      // Group by month for last 6 months
      const now = new Date();
      const months: string[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(d.toLocaleString("default", { month: "short" }));
      }

      type Row = { status: string; created_at: string };
      const grouped: Record<string, { pending: number; inReview: number; approved: number }> = {};
      months.forEach((m) => {
        grouped[m] = { pending: 0, inReview: 0, approved: 0 };
      });

      data.forEach((row: Row) => {
        const m = new Date(row.created_at).toLocaleString("default", { month: "short" });
        if (!grouped[m]) return;
        if (row.status === "DRAFT") grouped[m].pending++;
        else if (row.status === "IN_REVIEW") grouped[m].inReview++;
        else if (row.status === "APPROVED" || row.status === "PUBLISHED") grouped[m].approved++;
      });

      const taskQueueData = months.map((month) => ({ month, ...grouped[month] }));

      // Simple performance line derived from approval ratio per month
      const performanceLine = taskQueueData.map((d) => {
        const rowTotal = d.pending + d.inReview + d.approved;
        const efficiency = rowTotal > 0 ? Math.round((d.approved / rowTotal) * 100) : 0;
        const compliance = Math.min(efficiency + 5, 100);
        const risk = Math.max(100 - efficiency - 10, 0);
        return { month: d.month, efficiency, compliance, risk };
      });

      return { taskQueueData, performanceLine };
    },
    retry: false,
  });
}

// ── KPI card skeleton ────────────────────────────────────────────────────────

function KPISkeleton() {
  return (
    <div className="mt-4 space-y-2">
      <Skeleton className="h-8 w-24 bg-white/10" />
      <Skeleton className="h-4 w-36 bg-white/5" />
    </div>
  );
}

// ── Dashboard page ───────────────────────────────────────────────────────────

const Dashboard = () => {
  const { data: kpis, isLoading: kpisLoading } = useDashboardKPIs();
  const { data: chartData, isLoading: chartLoading } = useDashboardChartData();

  const metrics = [
    {
      icon: <FileText className="h-6 w-6 text-violet-400" aria-hidden="true" />,
      title: "Pending Reviews",
      value: kpis ? String(kpis.pending) : "—",
      change: kpis ? `${kpis.total} total solicitations` : "Loading…",
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-400" aria-hidden="true" />,
      title: "Approval Rate",
      value: kpis ? `${kpis.complianceRate}%` : "—",
      change: kpis ? `${kpis.approved} approved` : "Loading…",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-400" aria-hidden="true" />,
      title: "In Review",
      value: kpis
        ? String(kpis.total - kpis.pending - kpis.approved)
        : "—",
      change: "Active workflow items",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-amber-400" aria-hidden="true" />,
      title: "Completed",
      value: kpis ? String(kpis.approved) : "—",
      change: "Approved & published",
    },
  ];

  const taskQueueData  = chartData?.taskQueueData  ?? [];
  const performanceLine = chartData?.performanceLine ?? [];

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        description="Your acquisition workflow at a glance — live counts from the database."
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      {/* KPI cards */}
      <Grid columns={4} gap="lg" className="mb-8">
        {metrics.map((metric) => (
          <DashboardCard
            key={metric.title}
            icon={metric.icon}
            title={metric.title}
            className="hover:bg-white/5 transition-colors"
          >
            {kpisLoading ? (
              <KPISkeleton />
            ) : (
              <div className="mt-4">
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="text-sm text-gray-400">{metric.change}</p>
              </div>
            )}
          </DashboardCard>
        ))}
      </Grid>

      {/* Charts row */}
      {chartLoading ? (
        <Grid columns={2} gap="lg">
          <Card className="spacing-module-lg">
            <Skeleton className="h-6 w-32 bg-white/10 mb-4" />
            <Skeleton className="h-[220px] w-full bg-white/5" />
          </Card>
          <Card className="spacing-module-lg">
            <Skeleton className="h-6 w-40 bg-white/10 mb-4" />
            <Skeleton className="h-[220px] w-full bg-white/5" />
          </Card>
        </Grid>
      ) : (
        <Grid columns={2} gap="lg">
          {/* Task Queue — bar chart */}
          <Card className="spacing-module-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Task Queue</h2>
            <ResponsiveContainer width="100%" height={220}>
              <ReBarChart data={taskQueueData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend wrapperStyle={{ color: "#9ca3af", fontSize: "12px" }} />
                <Bar dataKey="pending"  fill="#a78bfa" radius={[4, 4, 0, 0]} name="Pending" />
                <Bar dataKey="inReview" fill="#f59e0b" radius={[4, 4, 0, 0]} name="In Review" />
                <Bar dataKey="approved" fill="#34d399" radius={[4, 4, 0, 0]} name="Approved" />
              </ReBarChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance Metrics — line chart */}
          <Card className="spacing-module-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Performance Metrics</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={performanceLine} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend wrapperStyle={{ color: "#9ca3af", fontSize: "12px" }} />
                <Line type="monotone" dataKey="efficiency"  stroke="#a78bfa" strokeWidth={2} dot={false} name="Efficiency %" />
                <Line type="monotone" dataKey="compliance"  stroke="#34d399" strokeWidth={2} dot={false} name="Compliance %" />
                <Line type="monotone" dataKey="risk"        stroke="#f87171" strokeWidth={2} dot={false} name="Risk %" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
