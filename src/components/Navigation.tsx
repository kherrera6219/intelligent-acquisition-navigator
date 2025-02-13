
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
  Map,
  UserCircle,
  LogOut
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { accessControl } from '@/lib/security/accessControl';
import { errorTracker } from '@/lib/security/errorTracking';
import { auditLogger } from '@/lib/audit';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const navigationItems = [
  { 
    icon: Home, 
    label: 'Dashboard', 
    route: '/dashboard',
    permission: null,
    description: 'View your personalized dashboard'
  },
  { 
    icon: FileText, 
    label: 'Solicitation Review', 
    route: '/solicitation-review',
    permission: 'READ_SOLICITATIONS' as const,
    description: 'Review and manage solicitations'
  },
  { 
    icon: Shield, 
    label: 'Compliance', 
    route: '/compliance',
    permission: 'VIEW_AUDIT_LOGS' as const,
    description: 'Monitor compliance and audit logs'
  },
  { 
    icon: BarChart2, 
    label: 'Analytics', 
    route: '/analytics',
    permission: 'EXPORT_DATA' as const,
    description: 'View system analytics and reports'
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    route: '/settings',
    permission: 'MANAGE_USERS' as const,
    description: 'Manage system settings'
  },
  { 
    icon: HelpCircle, 
    label: 'Help', 
    route: '/help',
    permission: null,
    description: 'Access help and documentation'
  },
  {
    icon: Map,
    label: 'Sitemap',
    route: '/sitemap',
    permission: null,
    description: 'View complete site structure'
  }
];

const Navigation = () => {
  const [activeRoute, setActiveRoute] = useState('/dashboard');
  const [errors, setErrors] = useState<number>(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkErrors = () => {
      const recentErrors = errorTracker.getRecentErrors();
      setErrors(recentErrors.length);
      
      // Show toast for critical errors
      const criticalErrors = recentErrors.filter(error => error.severity === 'CRITICAL');
      if (criticalErrors.length > 0) {
        toast({
          variant: "destructive",
          title: "Critical System Errors Detected",
          description: "Please contact system administrator."
        });
      }
    };

    checkErrors();
    const interval = setInterval(checkErrors, 30000);
    return () => clearInterval(interval);
  }, [toast]);

  const handleNavigation = async (route: string) => {
    try {
      setActiveRoute(route);
      await auditLogger.log({
        action: 'NAVIGATION',
        resourceType: 'ROUTE',
        resourceId: route,
        details: { previousRoute: activeRoute }
      });
      navigate(route);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Navigation Failed",
        description: "Please try again or contact support."
      });
    }
  };

  const handleLogout = async () => {
    try {
      await auditLogger.log({
        action: 'USER_LOGOUT',
        resourceType: 'AUTH',
        resourceId: 'user',
        severity: 'INFO'
      });
      accessControl.logout();
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Please try again or contact support."
      });
    }
  };

  return (
    <Card className="fixed left-0 top-0 bottom-0 w-64 bg-background/80 backdrop-blur-sm border-r border-white/10 p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-primary">ProcurityIQ</h1>
      </div>

      <nav 
        className="flex-1 space-y-2" 
        role="navigation" 
        aria-label="Main navigation"
      >
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
              aria-label={item.description}
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
          aria-label={`${errors} system errors detected`}
        >
          <AlertCircle className="h-4 w-4" />
          System Errors ({errors})
        </Button>
      )}

      <div className="mt-auto space-y-2">
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={() => handleNavigation('/profile')}
        >
          <UserCircle className="h-4 w-4" />
          User Profile
        </Button>
        <Button 
          variant="destructive" 
          className="w-full gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </Card>
  );
};

export default Navigation;
