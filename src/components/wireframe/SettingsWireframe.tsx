
import React from 'react';
import { WireframeBase, WireframePlaceholder } from './WireframeBase';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard, 
  HelpCircle,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsWireframeProps {
  className?: string;
  withPlaceholders?: boolean;
  title?: string;
}

export const SettingsWireframe: React.FC<SettingsWireframeProps> = ({
  className,
  withPlaceholders = true,
  title = 'Settings',
}) => {
  return (
    <WireframeBase className={cn('ms-settings-wireframe', className)}>
      <div className="ms-header-wireframe mb-6">
        <h1 className="ms-heading-3 font-semibold flex items-center gap-2">
          <Settings size={20} className="text-primary" />
          {title}
        </h1>
        <p className="ms-text-muted text-sm mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="ms-settings-layout grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <div className="ms-settings-sidebar">
          <div className="ms-settings-nav border border-border rounded-md overflow-hidden">
            <div className="ms-settings-nav-item py-2 px-3 border-b border-border bg-primary/5 text-primary font-medium flex items-center gap-2">
              <User size={16} />
              <span>Profile</span>
            </div>
            {[
              { icon: Bell, label: 'Notifications' },
              { icon: Shield, label: 'Security' },
              { icon: Globe, label: 'Preferences' },
              { icon: CreditCard, label: 'Billing' },
              { icon: HelpCircle, label: 'Help & Support' },
            ].map((item, i) => (
              <div key={i} className="ms-settings-nav-item py-2 px-3 border-b last:border-b-0 border-border text-foreground hover:bg-accent/10 flex items-center gap-2">
                <item.icon size={16} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ms-settings-content border border-border rounded-md bg-card/30 p-5">
          <div className="ms-settings-section mb-6">
            <h2 className="text-lg font-medium mb-4">Profile Information</h2>
            
            {withPlaceholders && (
              <div className="grid grid-cols-1 gap-4 max-w-2xl">
                <div className="flex items-center gap-4">
                  <WireframePlaceholder height="h-16" width="w-16" className="rounded-full" />
                  <button className="ms-button ms-button-outline flex items-center gap-1 h-9 px-4 rounded-md border border-border bg-transparent text-foreground text-sm">
                    Change Avatar
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <WireframePlaceholder height="h-9" text="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <WireframePlaceholder height="h-9" text="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <WireframePlaceholder height="h-9" text="john.doe@example.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <WireframePlaceholder height="h-9" text="Product Manager" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <WireframePlaceholder height="h-24" />
                </div>
              </div>
            )}
          </div>
          
          <div className="ms-settings-section">
            <h2 className="text-lg font-medium mb-4">Contact Information</h2>
            
            {withPlaceholders && (
              <div className="grid grid-cols-1 gap-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <WireframePlaceholder height="h-9" text="+1 (555) 123-4567" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <WireframePlaceholder height="h-9" text="123 Main St" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <WireframePlaceholder height="h-9" text="San Francisco" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <WireframePlaceholder height="h-9" text="California" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <WireframePlaceholder height="h-9" text="94103" />
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="ms-button ms-button-primary flex items-center gap-1 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm">
                    <Save size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </WireframeBase>
  );
};
