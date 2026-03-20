
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { accessControl } from '@/lib/security/accessControl';
import { errorTracker } from '@/lib/security/errorTracking';
import { auditLogger } from '@/lib/audit';
import { navigationItems } from '@/config/navigationItems';
import { NavigationItem } from './navigation/NavigationItem';
import { NavigationFooter } from './navigation/NavigationFooter';
import { SystemStatus } from './navigation/SystemStatus';
import { Separator } from '@/components/ui/separator';

interface NavigationProps {
  onClose?: () => void;
}

const Navigation = ({ onClose }: NavigationProps) => {
  const [errors, setErrors] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const activeRoute = location.pathname;
  const { toast } = useToast();

  useEffect(() => {
    const checkErrors = () => {
      const recentErrors = errorTracker.getRecentErrors();
      setErrors(recentErrors.length);
      
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
    onClose?.();
    try {
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

  // Group navigation items by category
  const primaryNavItems = navigationItems.slice(0, 4);
  const complianceNavItems = navigationItems.slice(4, 8);
  const systemNavItems = navigationItems.slice(8);

  return (
    <Card className="fixed left-0 top-0 bottom-0 w-64 bg-background/80 backdrop-blur-sm border-r border-white/10 p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-primary">ProcurityIQ</h1>
      </div>

      <nav 
        className="flex-1 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10" 
        role="navigation" 
        aria-label="Main navigation"
      >
        {/* Primary Navigation */}
        <div className="space-y-2">
          <h2 className="text-xs uppercase text-muted-foreground font-semibold px-2">
            Core Functions
          </h2>
          {primaryNavItems.map((item) => {
            const isVisible = !item.permission || accessControl.hasPermission(item.permission);
            if (!isVisible) return null;
            return (
              <NavigationItem
                key={item.route}
                {...item}
                isActive={activeRoute === item.route}
                onClick={() => handleNavigation(item.route)}
              />
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Compliance & Review */}
        <div className="space-y-2">
          <h2 className="text-xs uppercase text-muted-foreground font-semibold px-2">
            Compliance & Review
          </h2>
          {complianceNavItems.map((item) => {
            const isVisible = !item.permission || accessControl.hasPermission(item.permission);
            if (!isVisible) return null;
            return (
              <NavigationItem
                key={item.route}
                {...item}
                isActive={activeRoute === item.route}
                onClick={() => handleNavigation(item.route)}
              />
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* System */}
        <div className="space-y-2">
          <h2 className="text-xs uppercase text-muted-foreground font-semibold px-2">
            System
          </h2>
          {systemNavItems.map((item) => {
            const isVisible = !item.permission || accessControl.hasPermission(item.permission);
            if (!isVisible) return null;
            return (
              <NavigationItem
                key={item.route}
                {...item}
                isActive={activeRoute === item.route}
                onClick={() => handleNavigation(item.route)}
              />
            );
          })}
        </div>
      </nav>

      <SystemStatus 
        errors={errors}
        onClick={() => handleNavigation('/system-status')}
      />

      <NavigationFooter 
        onProfileClick={() => handleNavigation('/profile')}
        onLogout={handleLogout}
      />
    </Card>
  );
};

export default Navigation;
