
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardCard } from "@/components/layout/DashboardCard";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { supabase } from "@/integrations/supabase/client";
import { 
  FileText, 
  Shield, 
  Zap, 
  BarChart 
} from 'lucide-react';

type Proposal = {
  id: string;
  status: "pending" | "approved" | "rejected";
  review_time_minutes?: number;
};

type Solicitation = {
  id: string;
  status: string;
  title: string;
  dueDate: string;
  department: string;
};

type AnalysisRecord = {
  confidence_score: number;
};

type TaskItem = {
  id: string;
  title: string;
  priority: string;
  status: string;
};

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: async () => {
      const [proposalsResult, solicitationsResult, analysisResult, tasksResult] = await Promise.all([
        supabase.from("proposals").select("*"),
        supabase.from("solicitations").select("*"),
        supabase.from("ai_analysis_records").select("*"),
        supabase.from("task_queue").select("*"),
      ]);

      if (proposalsResult.error || solicitationsResult.error || analysisResult.error || tasksResult.error) {
        throw new Error("Failed to load dashboard metrics.");
      }

      return {
        proposals: (proposalsResult.data ?? []) as Proposal[],
        solicitations: (solicitationsResult.data ?? []) as Solicitation[],
        analyses: (analysisResult.data ?? []) as AnalysisRecord[],
        tasks: (tasksResult.data ?? []) as TaskItem[],
      };
    },
  });

  const metrics = useMemo(() => {
    const proposals = data?.proposals ?? [];
    const solicitations = data?.solicitations ?? [];
    const analyses = data?.analyses ?? [];
    const tasks = data?.tasks ?? [];

    const pendingReviews = solicitations.filter((s) => s.status === "pending" || s.status === "review").length;
    const complianceRate = analyses.length
      ? Math.round(
          (analyses.reduce((sum, record) => sum + (record.confidence_score || 0), 0) / analyses.length) * 100
        )
      : 0;

    const averageReviewMinutes = proposals.length
      ? Math.round(
          proposals.reduce((sum, proposal) => sum + (proposal.review_time_minutes || 0), 0) / proposals.length
        )
      : 0;

    const completedTasks = tasks.filter((task) => task.status === "completed").length;

    return [
      {
        icon: <FileText className="h-6 w-6 text-violet-400" />,
        title: "Pending Reviews",
        value: String(pendingReviews),
        change: `${solicitations.length} total solicitations`,
      },
      {
        icon: <Shield className="h-6 w-6 text-emerald-400" />,
        title: "Compliance Rate",
        value: `${complianceRate}%`,
        change: `${analyses.length} analysis records`,
      },
      {
        icon: <Zap className="h-6 w-6 text-blue-400" />,
        title: "Avg. Review Time",
        value: `${averageReviewMinutes}m`,
        change: `${proposals.length} proposals tracked`,
      },
      {
        icon: <BarChart className="h-6 w-6 text-amber-400" />,
        title: "Tasks Completed",
        value: String(completedTasks),
        change: `${tasks.length} total tasks`,
      },
    ];
  }, [data]);

  const pendingTasks = (data?.tasks ?? []).filter((task) => task.status !== "completed");
  const upcomingSolicitations = [...(data?.solicitations ?? [])]
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5);

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        description="Welcome to your acquisition workflow management system"
      />

      <Grid columns={4} gap="lg" className="mb-8">
        {metrics.map((metric, index) => (
          <DashboardCard
            key={index}
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

      <Grid columns={2} gap="lg">
        <Card className="spacing-module-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Task Queue</h2>
          {pendingTasks.length === 0 ? (
            <div className="flex items-center justify-center h-48 bg-white/5 rounded-lg">
              <p className="text-gray-400">No pending tasks</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="bg-white/5 rounded-lg p-3">
                  <p className="text-sm text-white">{task.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Priority: {task.priority} • Status: {task.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="spacing-module-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Solicitations</h2>
          {upcomingSolicitations.length === 0 ? (
            <div className="flex items-center justify-center h-48 bg-white/5 rounded-lg">
              <p className="text-gray-400">No upcoming solicitations</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingSolicitations.map((solicitation) => (
                <div key={solicitation.id} className="bg-white/5 rounded-lg p-3">
                  <p className="text-sm text-white">{solicitation.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Due {solicitation.dueDate} • {solicitation.department}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </Grid>
    </Container>
  );
};

export default Dashboard;
