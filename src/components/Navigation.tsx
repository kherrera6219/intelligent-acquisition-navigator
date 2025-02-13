import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Shield, 
  BarChart2, 
  Settings, 
  HelpCircle,
  AlertCircle, 
  Map
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { accessControl } from '@/lib/security/accessControl';
import { errorTracker } from '@/lib/security/errorTracking';
import { auditLogger } from '@/lib/audit';

const navigationItems = [
  { 
    icon: Home, 
    label: 'Dashboard', 
    route: '/dashboard',
    permission: null
  },
  { 
    icon: FileText, 
    label: 'Solicitation Review', 
    route: '/solicitation-review',
    permission: 'READ_SOLICITATIONS' as const
  },
  { 
    icon: Shield, 
    label: 'Compliance', 
    route: '/compliance',
    permission: 'VIEW_AUDIT_LOGS' as const
  },
  { 
    icon: BarChart2, 
    label: 'Analytics', 
    route: '/analytics',
    permission: 'EXPORT_DATA' as const
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    route: '/settings',
    permission: 'MANAGE_USERS' as const
  },
  { 
    icon: HelpCircle, 
    label: 'Help', 
    route: '/help',
    permission: null
  },
  {
    icon: Map,
    label: 'Sitemap',
    route: '/sitemap',
    permission: null
  }
];

const Navigation = () => {
  const [activeRoute, setActiveRoute] = useState('/dashboard');
  const [errors, setErrors] = useState<number>(0);

  // Monitor system errors
  useEffect(() => {
    const checkErrors = () => {
      const recentErrors = errorTracker.getRecentErrors();
      setErrors(recentErrors.length);
    };

    checkErrors();
    const interval = setInterval(checkErrors, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = async (route: string) => {
    setActiveRoute(route);
    await auditLogger.log({
      action: 'NAVIGATION',
      resourceType: 'ROUTE',
      resourceId: route,
      details: { previousRoute: activeRoute }
    });
  };

  return (
    <Card className="fixed left-0 top-0 bottom-0 w-64 bg-background/80 backdrop-blur-sm border-r border-white/10 p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-primary">ProcurityIQ</h1>
      </div>

      <nav className="flex-1 space-y-2" role="navigation" aria-label="Main navigation">
        {navigationItems.map((item) => {
          const isVisible = !item.permission || accessControl.hasPermission(item.permission);
          
          if (!isVisible) return null;

          return (
            <Button
              key={item.route}
              variant={activeRoute === item.route ? 'default' : 'ghost'}
              className="w-full justify-start gap-3"
              onClick={() => handleNavigation(item.route)}
              aria-current={activeRoute === item.route ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {errors > 0 && (
        <Button 
          variant="destructive" 
          className="mb-4 gap-2"
          onClick={() => handleNavigation('/system-status')}
        >
          <AlertCircle className="h-4 w-4" />
          System Errors ({errors})
        </Button>
      )}

      <div className="mt-auto space-y-2">
        <Button variant="outline" className="w-full">
          User Profile
        </Button>
        <Button variant="destructive" className="w-full">
          Logout
        </Button>
      </div>
    </Card>
  );
};

export default Navigation;
