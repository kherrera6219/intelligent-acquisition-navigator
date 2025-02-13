
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Shield, 
  BarChart2, 
  Settings, 
  HelpCircle 
} from 'lucide-react';
import { Card } from "@/components/ui/card";

const navigationItems = [
  { 
    icon: Home, 
    label: 'Dashboard', 
    route: '/dashboard' 
  },
  { 
    icon: FileText, 
    label: 'Solicitation Review', 
    route: '/solicitation-review' 
  },
  { 
    icon: Shield, 
    label: 'Compliance', 
    route: '/compliance' 
  },
  { 
    icon: BarChart2, 
    label: 'Analytics', 
    route: '/analytics' 
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    route: '/settings' 
  },
  { 
    icon: HelpCircle, 
    label: 'Help', 
    route: '/help' 
  }
];

const Navigation = () => {
  const [activeRoute, setActiveRoute] = useState('/dashboard');

  return (
    <Card className="fixed left-0 top-0 bottom-0 w-64 bg-background/80 backdrop-blur-sm border-r border-white/10 p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-primary">ProcurityIQ</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.route}
            variant={activeRoute === item.route ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => setActiveRoute(item.route)}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>

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
