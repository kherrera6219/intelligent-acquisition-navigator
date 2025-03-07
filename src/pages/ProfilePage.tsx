
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/universal/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Clock, FileText } from "lucide-react";

export default function ProfilePage() {
  const { user, userRole } = useAuth();

  return (
    <Container>
      <PageHeader
        title="User Profile"
        description="Manage your account and profile information"
        className="mb-4 sm:mb-6 md:mb-8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
              <AvatarImage src={user?.user_metadata?.avatar_url} alt="User avatar" />
              <AvatarFallback className="bg-gray-800 text-gray-200 text-2xl">
                {user?.email ? user.email.charAt(0).toUpperCase() : <User className="h-10 w-10" />}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mb-1">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</h2>
            <p className="text-gray-400 mb-2">{user?.email}</p>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}
            </span>
            
            <div className="mt-6 flex gap-2">
              <Button variant="outline" size="sm">Edit Profile</Button>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>
          </div>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2 p-6">
          <h3 className="text-xl font-bold mb-4">Account Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-md bg-gray-800/50">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Email Address</h4>
                <p className="text-gray-400">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-md bg-gray-800/50">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Account Role</h4>
                <p className="text-gray-400">{userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-md bg-gray-800/50">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Account Created</h4>
                <p className="text-gray-400">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-md bg-gray-800/50">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-gray-400">Not enabled</p>
                <Button variant="link" size="sm" className="px-0 text-primary">Enable 2FA</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="p-3 bg-gray-800/30 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Document {Math.floor(Math.random() * 1000)} reviewed</p>
                    <p className="text-xs text-gray-400">{Math.floor(Math.random() * 24)} hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Container>
  );
}
