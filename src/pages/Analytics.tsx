
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const acquisitionVolume = [
  { month: "Sep", solicitations: 12, awards: 8, proposals: 22 },
  { month: "Oct", solicitations: 18, awards: 11, proposals: 31 },
  { month: "Nov", solicitations: 15, awards: 14, proposals: 27 },
  { month: "Dec", solicitations: 9,  awards: 7,  proposals: 18 },
  { month: "Jan", solicitations: 21, awards: 16, proposals: 38 },
  { month: "Feb", solicitations: 24, awards: 19, proposals: 44 },
  { month: "Mar", solicitations: 28, awards: 22, proposals: 51 },
];

const cycleTimeTrend = [
  { month: "Sep", days: 72 },
  { month: "Oct", days: 68 },
  { month: "Nov", days: 65 },
  { month: "Dec", days: 70 },
  { month: "Jan", days: 61 },
  { month: "Feb", days: 58 },
  { month: "Mar", days: 54 },
];

const contractTypeBreakdown = [
  { name: "Fixed Price", value: 48, color: "#8B5CF6" },
  { name: "Cost Plus",   value: 22, color: "#EC4899" },
  { name: "T&M",         value: 18, color: "#06B6D4" },
  { name: "IDIQ",        value: 12, color: "#10B981" },
];

const tooltipStyle = {
  backgroundColor: "rgba(0,0,0,0.85)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#f9fafb",
};

const kpis = [
  { label: "Active Solicitations", value: "28", delta: "+4", positive: true },
  { label: "Awards This Month", value: "22", delta: "+3", positive: true },
  { label: "Avg Cycle Time", value: "54 days", delta: "-4d", positive: true },
  { label: "Compliance Rate", value: "97.2%", delta: "+0.8%", positive: true },
];

const Analytics = () => {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Acquisition performance metrics, cycle times, and workflow trends."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Analytics" }]}
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-4 bg-white/5 border-white/10">
            <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <Badge
              variant="outline"
              className={`mt-1 text-xs ${kpi.positive ? "border-emerald-500/30 text-emerald-400" : "border-red-500/30 text-red-400"}`}
            >
              {kpi.delta} vs last month
            </Badge>
          </Card>
        ))}
      </div>

      {/* Acquisition volume chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 p-5 bg-white/5 border-white/10">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Acquisition Volume (7 months)
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={acquisitionVolume} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 11 }} />
              <Bar dataKey="solicitations" fill="#8B5CF6" radius={[3,3,0,0]} name="Solicitations" />
              <Bar dataKey="awards" fill="#10B981" radius={[3,3,0,0]} name="Awards" />
              <Bar dataKey="proposals" fill="#3B82F6" radius={[3,3,0,0]} name="Proposals" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 bg-white/5 border-white/10">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Contract Type Mix</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={contractTypeBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {contractTypeBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, ""]} />
              <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Cycle time trend */}
      <Card className="p-5 bg-white/5 border-white/10">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">
          Average Acquisition Cycle Time (days)
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={cycleTimeTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <YAxis domain={[40, 80]} stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 11 }} />
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
      </Card>
    </>
  );
};

export default Analytics;
