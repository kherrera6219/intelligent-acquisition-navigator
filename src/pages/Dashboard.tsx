
import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardCard } from "@/components/layout/DashboardCard";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { FileText, Shield, Zap, BarChart } from "lucide-react";
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
import { performanceData } from "@/data/performanceData";

const metrics = [
  {
    icon: <FileText className="h-6 w-6 text-violet-400" aria-hidden="true" />,
    title: "Pending Reviews",
    value: "24",
    change: "+5 from last week",
  },
  {
    icon: <Shield className="h-6 w-6 text-emerald-400" aria-hidden="true" />,
    title: "Compliance Rate",
    value: "95%",
    change: "+2% improvement",
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-400" aria-hidden="true" />,
    title: "Avg. Review Time",
    value: "12m 34s",
    change: "-3m from last week",
  },
  {
    icon: <BarChart className="h-6 w-6 text-amber-400" aria-hidden="true" />,
    title: "Tasks Completed",
    value: "156",
    change: "+22 this week",
  },
];

// Derive task queue data from performance metrics
const taskQueueData = performanceData.map((d) => ({
  month: d.month,
  pending:  Math.round((100 - d.efficiency) * 0.6),
  inReview: Math.round((100 - d.efficiency) * 0.3),
  approved: Math.round(d.efficiency * 0.2),
}));

const chartTooltipStyle = {
  backgroundColor: "rgba(0,0,0,0.8)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#fff",
};

const Dashboard = () => {
  return (
    <Container>
      <PageHeader
        title="Dashboard"
        description="Welcome to your acquisition workflow management system"
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
            <div className="mt-4">
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <p className="text-sm text-gray-400">{metric.change}</p>
            </div>
          </DashboardCard>
        ))}
      </Grid>

      {/* Charts row */}
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
            <LineChart data={performanceData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
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
    </Container>
  );
};

export default Dashboard;
