
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/universal/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  User, Mail, Shield, Clock, FileText, Settings, Lock, 
  BellRing, CheckCircle, AlertCircle, Plus 
} from 'lucide-react';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';

const UserProfilePage: React.FC = () => {
  const { user, userRole } = useAuth();

  return (
    <>
      <UniversalInternalHeader />
      <ProtectedPageLayout
        title="User Profile"
        description="Manage your profile information and settings"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Profile', href: '/profile' }
        ]}
      >
        <Container>
          <PageHeader
            title="User Profile"
            description="Manage your account and profile information"
            className="mb-6 md:mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 p-6" variant="metal">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-6 border-2 border-primary shadow-lg">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt="User avatar" />
                  <AvatarFallback className="bg-gray-800 text-gray-200 text-2xl">
                    {user?.email ? user.email.charAt(0).toUpperCase() : <User className="h-10 w-10" />}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</h2>
                <p className="text-gray-400 mb-3">{user?.email}</p>
                <span className="inline-flex items-center rounded-full bg-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-400 mb-4">
                  {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}
                </span>
                
                <div className="flex gap-3 w-full mt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit Profile
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="ghost" className="justify-start w-full text-gray-300">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="ghost" className="justify-start w-full text-gray-300">
                    <Lock className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                  <Button variant="ghost" className="justify-start w-full text-gray-300">
                    <BellRing className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2 p-6" variant="metal">
              <h3 className="text-xl font-bold mb-6">Account Information</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-md bg-gray-800/70 border border-gray-700">
                  <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Email Address</h4>
                    <p className="text-gray-400">{user?.email}</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                      <span className="text-xs text-green-400">Verified</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-md bg-gray-800/70 border border-gray-700">
                  <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Account Role</h4>
                    <p className="text-gray-400">{userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}</p>
                    <p className="text-xs text-gray-500 mt-1">Your role determines what features you can access</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-md bg-gray-800/70 border border-gray-700">
                  <Clock className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Account Created</h4>
                    <p className="text-gray-400">{user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-md bg-gray-800/70 border border-gray-700">
                  <Lock className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Two-Factor Authentication</h4>
                    <p className="text-gray-400">Enhance your account security with 2FA</p>
                    <div className="flex items-center mt-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5" />
                      <span className="text-xs text-amber-400">Not enabled</span>
                    </div>
                  </div>
                  <Button variant="default" size="sm" className="whitespace-nowrap">Enable 2FA</Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6" variant="metal">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {[
                { action: 'Document Reviewed', time: '2 hours ago', icon: FileText },
                { action: 'Profile Updated', time: '1 day ago', icon: User },
                { action: 'Login from New Device', time: '3 days ago', icon: Shield }
              ].map((activity, index) => (
                <div key={index} className="p-4 bg-gray-800/40 rounded-md border border-gray-700/50 hover:bg-gray-800/60 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <activity.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Load More Activity
            </Button>
          </Card>
        </Container>
      </ProtectedPageLayout>
      <InternalFooter />
    </>
  );
};

export default UserProfilePage;
