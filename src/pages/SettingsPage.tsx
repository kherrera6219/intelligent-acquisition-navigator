
import React, { useState } from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { TwoFactorSettings } from "@/components/settings/TwoFactorSettings";
import { SessionSettings } from "@/components/settings/SessionSettings";
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { DisplaySettings } from '@/components/settings/DisplaySettings';
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { SessionExpiryManager } from '@/components/settings/SessionExpiryManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UniversalHeader } from "@/components/ui/universal/UniversalHeader";
import { 
  Shield, 
  User, 
  Clock, 
  Bell, 
  Settings, 
  PanelLeft, 
  Palette
} from 'lucide-react';
import { Card } from "@/components/ui/universal/Card";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("security");

  const tabIcons = {
    security: <Shield className="h-4 w-4 mr-2" />,
    profile: <User className="h-4 w-4 mr-2" />,
    session: <Clock className="h-4 w-4 mr-2" />,
    notifications: <Bell className="h-4 w-4 mr-2" />,
    display: <Palette className="h-4 w-4 mr-2" />
  };

  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Container>
          <div className="space-y-6 py-6">
            <PageHeader
              title={<div className="flex items-center"><Settings className="h-5 w-5 mr-2 text-primary" /> Settings</div>}
              description="Manage your account settings and preferences"
            />
            
            <SessionExpiryManager />
            
            <UniversalHeader className="mb-6" />
            
            <Card className="p-0 overflow-hidden fluent-acrylic">
              <div className="sm:grid sm:grid-cols-5 sm:divide-x sm:divide-gray-800">
                {/* Sidebar Navigation */}
                <div className="p-4 border-b sm:border-b-0 border-gray-800">
                  <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                    {Object.entries(tabIcons).map(([key, icon]) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          activeTab === key 
                            ? "bg-primary/10 text-primary" 
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        )}
                        aria-selected={activeTab === key}
                        role="tab"
                      >
                        {icon}
                        <span className="capitalize">{key}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="col-span-4 p-6">
                  <div className="space-y-6">
                    {activeTab === "security" && (
                      <>
                        <SecuritySettings />
                        <TwoFactorSettings />
                      </>
                    )}
                    
                    {activeTab === "profile" && (
                      <ProfileSettings />
                    )}
                    
                    {activeTab === "session" && (
                      <SessionSettings />
                    )}
                    
                    {activeTab === "notifications" && (
                      <NotificationSettings />
                    )}
                    
                    {activeTab === "display" && (
                      <DisplaySettings />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </div>
    </PageErrorBoundary>
  );
};

export default SettingsPage;

// Helper function to conditionally join class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
