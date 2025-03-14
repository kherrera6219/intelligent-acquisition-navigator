
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
    <aside className="procurity-sidebar">
      <div className="procurity-sidebar-header">
        <button className="procurity-create-button">
          <Plus size={16} />
          <span>Create Proposal</span>
        </button>
      </div>
      
      <nav className="procurity-sidebar-nav">
        <ul className="procurity-nav-list">
          {navItems.map((item) => (
            <li key={item.id} className="procurity-nav-item">
              <Link 
                to={item.path}
                className={`procurity-nav-link ${currentSection === item.id ? 'active' : ''}`}
              >
                <item.icon size={20} className="procurity-nav-icon" />
                <span className="procurity-nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="procurity-sidebar-footer">
        <Link to="/logout" className="procurity-logout-link">
          Log Out
        </Link>
      </div>
    </aside>
  );
};
