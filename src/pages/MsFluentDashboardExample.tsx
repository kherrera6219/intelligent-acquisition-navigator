
import React from 'react';
import { MsFluentDashboardLayout } from '@/components/layout/MsFluentDashboardLayout';
import { MsDashboardSection } from '@/components/layout/MsDashboardSection';
import { MsDashboardGrid } from '@/components/layout/MsDashboardGrid';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { MsStatsCard } from '@/components/layout/MsStatsCard';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  PieChart, 
  Users, 
  HelpCircle, 
  Briefcase, 
  Clock, 
  BarChart3, 
  DollarSign, 
  CheckCircle,
  AlertTriangle,
  MoveRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MsFluentDashboardExample() {
  // Example recent activity data
  const recentActivities = [
    { 
      title: "Document 'RFP-2023-001' updated", 
      time: "2 hours ago", 
      icon: <FileText className="h-4 w-4 text-blue-400" />, 
    },
    { 
      title: "New proposal submitted", 
      time: "Yesterday", 
      icon: <Briefcase className="h-4 w-4 text-green-400" />, 
    },
    { 
      title: "Analytics report generated", 
      time: "2 days ago", 
      icon: <PieChart className="h-4 w-4 text-purple-400" />, 
    },
    { 
      title: "Knowledge base article viewed", 
      time: "3 days ago", 
      icon: <HelpCircle className="h-4 w-4 text-amber-400" />, 
    },
    { 
      title: "Meeting scheduled: Project Review", 
      time: "5 days ago", 
      icon: <Clock className="h-4 w-4 text-indigo-400" />, 
    }
  ];

  return (
    <MsFluentDashboardLayout title="Microsoft Fluent Dashboard">
      <div className="mx-auto max-w-screen-2xl">
        {/* Stats Overview */}
        <MsDashboardSection title="Overview" variant="borderless">
          <MsDashboardGrid columns={4} gap="md">
            <MsStatsCard 
              title="Active Projects" 
              value="12" 
              trend={{ value: 8, label: "vs last month" }}
              icon={<Briefcase className="h-5 w-5 text-blue-400" />}
            />
            <MsStatsCard 
              title="Pending Proposals" 
              value="4" 
              trend={{ value: -2, label: "vs last month" }}
              icon={<FileText className="h-5 w-5 text-indigo-400" />}
            />
            <MsStatsCard 
              title="Documents Created" 
              value="23" 
              trend={{ value: 15, label: "vs last month" }}
              icon={<CheckCircle className="h-5 w-5 text-green-400" />}
            />
            <MsStatsCard 
              title="Issues Flagged" 
              value="7" 
              trend={{ value: 3, label: "vs last month" }}
              icon={<AlertTriangle className="h-5 w-5 text-amber-400" />}
            />
          </MsDashboardGrid>
        </MsDashboardSection>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions Section */}
            <MsDashboardSection 
              title="Quick Actions" 
              variant="card" 
              action={{ label: "View All", href: "/actions" }}
            >
              <MsDashboardGrid columns={4} gap="sm">
                <MsDashboardCard
                  href="/acquisition/document-control"
                  icon={<FileText className="h-5 w-5 text-blue-400" />}
                  title="Documents"
                  subtitle="Manage documents"
                />
                <MsDashboardCard
                  href="/analytics"
                  icon={<PieChart className="h-5 w-5 text-purple-400" />}
                  title="Analytics"
                  subtitle="View reports"
                />
                <MsDashboardCard
                  href="/proposals"
                  icon={<Users className="h-5 w-5 text-green-400" />}
                  title="Proposals"
                  subtitle="Review submissions"
                />
                <MsDashboardCard
                  href="/knowledge-base"
                  icon={<HelpCircle className="h-5 w-5 text-amber-400" />}
                  title="Knowledge Base"
                  subtitle="Access guides"
                />
              </MsDashboardGrid>
            </MsDashboardSection>

            {/* Key Performance Metrics Section */}
            <MsDashboardSection 
              title="Performance Metrics" 
              variant="card"
              action={{ label: "View Report", href: "/analytics" }}
            >
              <div className="h-64 flex items-center justify-center bg-white/5 rounded-md border border-border/20">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white/5 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">$42.5k</p>
                  <div className="flex items-center mt-1 text-xs text-green-400">
                    <span className="mr-1">+12%</span>
                    <MoveRight className="h-3 w-3" />
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">Contracts</p>
                  <p className="text-2xl font-bold">18</p>
                  <div className="flex items-center mt-1 text-xs text-green-400">
                    <span className="mr-1">+3</span>
                    <MoveRight className="h-3 w-3" />
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="text-2xl font-bold">94%</p>
                  <div className="flex items-center mt-1 text-xs text-green-400">
                    <span className="mr-1">+2%</span>
                    <MoveRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </MsDashboardSection>

            {/* Projects Section */}
            <MsDashboardSection
              title="Recent Projects"
              variant="card"
              action={{ label: "View All", href: "/projects" }}
            >
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-md border border-border/20 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Project Alpha {i}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Last updated 2 days ago</p>
                      </div>
                      <div className="ms-badge ms-badge-primary">Active</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="font-medium">${40 + i * 5}k</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Tasks</p>
                        <p className="font-medium">{8 + i}/12</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Deadline</p>
                        <p className="font-medium">Jun {10 + i * 5}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex">
                      <Button variant="outline" size="sm" className="ml-auto">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </MsDashboardSection>
          </div>

          {/* Right Sidebar (1 column) */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <MsDashboardCard
              title="Alex Morgan"
              subtitle="Department Manager"
              badge={{ text: "Premium", variant: "success" }}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary mb-2">
                  AM
                </div>
                <p className="text-sm text-center text-muted-foreground">Logged in since 09:45 AM</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className="p-2 rounded bg-white/5">
                  <p className="font-medium">18</p>
                  <p className="text-xs text-muted-foreground">Tasks</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-medium">5</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-between">
                <Button variant="outline" size="sm">Profile</Button>
                <Button variant="outline" size="sm">Settings</Button>
              </div>
            </MsDashboardCard>

            {/* Activity Feed */}
            <MsDashboardCard
              title="Recent Activity"
              footer={
                <Link to="/activity" className="text-primary text-sm flex items-center hover:underline">
                  View All Activity
                  <MoveRight className="ml-1 h-4 w-4" />
                </Link>
              }
            >
              <div className="ms-timeline">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="ms-timeline-item">
                    <div className="ms-timeline-icon">
                      {activity.icon}
                    </div>
                    <div className="ms-timeline-content">
                      <p className="ms-timeline-title">{activity.title}</p>
                      <p className="ms-timeline-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MsDashboardCard>

            {/* Upcoming Deadlines */}
            <MsDashboardCard
              title="Upcoming Deadlines"
            >
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 rounded bg-white/5">
                    <div>
                      <p className="font-medium text-sm">Proposal #{i} Review</p>
                      <p className="text-xs text-muted-foreground">Due in {i} day{i !== 1 ? 's' : ''}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border/20">
                <Link to="/calendar" className="text-sm text-primary hover:underline flex items-center">
                  View Calendar
                  <MoveRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </MsDashboardCard>
          </div>
        </div>
      </div>
    </MsFluentDashboardLayout>
  );
}
