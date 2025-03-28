
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  ShoppingCart, 
  BarChart, 
  Settings,
  Plus
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
    <aside className="ms-sidebar h-[calc(100vh-4rem)] border-r border-border/30 w-64">
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
      
      <nav className="ms-sidebar-content p-2">
        <ul className="ms-nav-list space-y-1">
          {navItems.map((item) => (
            <li key={item.id} className="ms-nav-item">
              <Link 
                to={item.path}
                className={`ms-nav-link ms-nav-item ${currentSection === item.id ? 'ms-nav-item-active' : 'ms-nav-item-inactive'}`}
              >
                <item.icon size={20} className="ms-nav-icon" />
                <span className="ms-nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="ms-sidebar-footer p-4 border-t border-border/30 mt-auto">
        <Link to="/logout" className="ms-link-subtle block text-center">
          Log Out
        </Link>
      </div>
    </aside>
  );
};
