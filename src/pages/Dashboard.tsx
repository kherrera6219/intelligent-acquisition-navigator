
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Clock 
} from 'lucide-react';

const DashboardCard = ({ 
  icon: Icon, 
  title, 
  value, 
  change 
}: { 
  icon: React.ElementType, 
  title: string, 
  value: string, 
  change: string 
}) => (
  <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
    <div className="flex justify-between items-center">
      <Icon className="h-8 w-8 text-primary" />
      <span className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </span>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="ml-64 flex-1 p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your acquisition workflow management system</p>
        </header>

        <section className="grid grid-cols-4 gap-6">
          <DashboardCard 
            icon={FileText}
            title="Pending Reviews"
            value="24"
            change="+5 from last week"
          />
          <DashboardCard 
            icon={ShieldCheck}
            title="Compliance Rate"
            value="95%"
            change="+2% improvement"
          />
          <DashboardCard 
            icon={TrendingUp}
            title="Avg. Review Time"
            value="12m 34s"
            change="-3m from last week"
          />
          <DashboardCard 
            icon={Clock}
            title="Tasks Completed"
            value="156"
            change="+22 this week"
          />
        </section>

        <section className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Task Queue</h2>
            {/* Task Queue Table Placeholder */}
            <div className="text-center text-muted-foreground">
              Task queue visualization coming soon
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            {/* Performance Metrics Chart Placeholder */}
            <div className="text-center text-muted-foreground">
              Performance metrics visualization coming soon
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
