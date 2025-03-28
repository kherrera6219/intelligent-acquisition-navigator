
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  ShoppingCart, 
  BarChart, 
  Settings,
  Plus,
  ChevronRight
} from 'lucide-react';
import { MsGradientButton } from '@/components/ui/universal/MsGradientButton';

interface ProcurityIQSidebarProps {
  currentSection?: string;
}

export const ProcurityIQSidebar: React.FC<ProcurityIQSidebarProps> = ({ 
  currentSection 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { id: 'proposal', label: 'Proposal', path: '/proposals', icon: FileText },
    { id: 'vendors', label: 'Vendors', path: '/vendors', icon: Users },
    { id: 'purchase-order', label: 'Purchase Order', path: '/purchase-orders', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', path: '/analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="ms-sidebar h-[calc(100vh-4rem)] border-r border-border/30 w-64 flex flex-col">
      <div className="ms-sidebar-header p-4 border-b border-border/30">
        <MsGradientButton 
          variant="primary" 
          size="md"
          className="w-full"
          icon={<Plus size={16} />}
        >
          Create Proposal
        </MsGradientButton>
      </div>
      
      <nav className="ms-sidebar-content p-2 flex-grow overflow-y-auto">
        <ul className="ms-nav-list space-y-1">
          {navItems.map((item) => (
            <li key={item.id} className="ms-nav-item">
              <Link 
                to={item.path}
                className={`ms-nav-link flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  currentSection === item.id 
                    ? 'ms-nav-item-active bg-accent/80 text-accent-foreground font-medium' 
                    : 'ms-nav-item-inactive text-muted-foreground hover:bg-accent/20 hover:text-foreground'
                }`}
              >
                <item.icon size={20} className="ms-nav-icon flex-shrink-0" />
                <span className="ms-nav-label flex-grow">{item.label}</span>
                {currentSection === item.id && <ChevronRight size={16} className="text-accent-foreground/70" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="ms-sidebar-footer p-4 border-t border-border/30 mt-auto">
        <Link to="/logout" className="ms-link-subtle block text-center text-muted-foreground hover:text-foreground transition-colors">
          Log Out
        </Link>
      </div>
    </aside>
  );
};
