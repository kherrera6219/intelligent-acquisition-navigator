
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { accessControl } from '@/lib/security/accessControl';
import { errorTracker } from '@/lib/security/errorTracking';
import { auditLogger } from '@/lib/audit';
import { navigationItems } from '@/config/navigationItems';
import { NavigationItem } from './navigation/NavigationItem';
import { NavigationFooter } from './navigation/NavigationFooter';
import { SystemStatus } from './navigation/SystemStatus';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

interface NavigationProps {
  onClose?: () => void;
  onOpenCommand?: () => void;
}

const Navigation = ({ onClose, onOpenCommand }: NavigationProps) => {
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

  // Group navigation items
  const coreNavItems = navigationItems.slice(0, 4);
  const acquisitionNavItems = navigationItems.slice(4, 7);
  const systemNavItems = navigationItems.slice(7);

  return (
    <Card className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900/95 backdrop-blur-sm border-r border-white/10 flex flex-col rounded-none">
      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-2 border-b border-white/5">
        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-xs">P</span>
        </div>
        <h1 className="text-base font-semibold text-white tracking-tight">ProcurityIQ</h1>
      </div>

      {/* Command palette trigger */}
      {onOpenCommand && (
        <div className="px-3 py-3 border-b border-white/5">
          <Button
            variant="ghost"
            onClick={onOpenCommand}
            className="w-full justify-between text-gray-400 hover:text-gray-200 bg-white/5 hover:bg-white/10 text-xs h-8 px-3 rounded-md"
            aria-label="Open command palette"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              Search…
            </span>
            <kbd className="flex items-center gap-0.5 rounded border border-white/10 bg-black/30 px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </Button>
        </div>
      )}

      <nav
        className="flex-1 overflow-y-auto py-3 px-3 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Core Navigation */}
        <div className="space-y-0.5">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold px-2 mb-1.5">
            Core
          </p>
          {coreNavItems.map((item) => {
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

        <Separator className="bg-white/5" />

        {/* Acquisition */}
        <div className="space-y-0.5">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold px-2 mb-1.5">
            Acquisition
          </p>
          {acquisitionNavItems.map((item) => {
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

        <Separator className="bg-white/5" />

        {/* System */}
        <div className="space-y-0.5">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold px-2 mb-1.5">
            System
          </p>
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

      <div className="px-3 py-3 border-t border-white/5 space-y-2">
        <SystemStatus
          errors={errors}
          onClick={() => handleNavigation('/system-status')}
        />
        <NavigationFooter
          onProfileClick={() => handleNavigation('/profile')}
          onLogout={handleLogout}
        />
      </div>
    </Card>
  );
};

export default Navigation;
