
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, PieChart, FilePlus, Users, Settings, FileText } from 'lucide-react';
import { Card } from '@/components/ui/universal/Card';
import { Button } from '@/components/ui/button';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Proposals',
      description: 'Manage and review all proposals',
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      path: '/proposals',
      count: '24'
    },
    {
      title: 'Analytics',
      description: 'View proposal statistics and metrics',
      icon: <PieChart className="h-8 w-8 text-purple-500" />,
      path: '/analytics',
      count: '5'
    },
    {
      title: 'Document Control',
      description: 'Manage procurement documents',
      icon: <FilePlus className="h-8 w-8 text-green-500" />,
      path: '/acquisition/document-control',
      count: '12'
    },
    {
      title: 'User Management',
      description: 'Manage user access and roles',
      icon: <Users className="h-8 w-8 text-amber-500" />,
      path: '/settings',
      count: '7'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Procurement Dashboard</h1>
        <p className="text-muted-foreground">Manage your procurement processes efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboardItems.map((item) => (
          <Card 
            key={item.title} 
            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="rounded-lg p-2 bg-gray-100 dark:bg-gray-800">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium mr-2">
                  {item.count}
                </span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate('/proposals')}>
              View All Proposals
            </Button>
            <Button variant="outline" onClick={() => navigate('/acquisition/document-control')}>
              Manage Documents
            </Button>
            <Button variant="outline" onClick={() => navigate('/settings')}>
              System Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
