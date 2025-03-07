
import React, { useState } from 'react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SessionExpiryProgress } from './SessionExpiryProgress';
import { useAuth } from '@/hooks/useAuth';
import { Clock, LogOut, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

export function SessionSettings() {
  const { toast } = useToast();
  const { refreshSession, sessionTimeRemaining, signOut } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Session settings updated",
        description: `Session timeout set to ${sessionTimeout} minutes.`,
      });
    } catch (error) {
      toast({
        title: "Error updating settings",
        description: "There was a problem updating your session settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefreshSession = async () => {
    try {
      await refreshSession();
      toast({
        title: "Session refreshed",
        description: "Your session has been extended.",
      });
    } catch (error) {
      toast({
        title: "Error refreshing session",
        description: "There was a problem refreshing your session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        Session Management
      </h2>
      
      <div className="space-y-6">
        <SessionExpiryProgress className="mb-6" />

        <div className="space-y-2">
          <Label htmlFor="sessionTimeout">Session Timeout</Label>
          <p className="text-sm text-gray-400 mb-2">
            Specify how long your session stays active before requiring you to log in again.
          </p>
          <Select 
            value={sessionTimeout} 
            onValueChange={setSessionTimeout}
          >
            <SelectTrigger id="sessionTimeout" className="w-full sm:w-64 bg-white/5">
              <SelectValue placeholder="Select timeout period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
              <SelectItem value="240">4 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Active Sessions</Label>
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-medium">Current Browser Session</p>
                <p className="text-sm text-gray-400">
                  Started {format(new Date(Date.now() - 45 * 60 * 1000), 'h:mm a')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Active</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefreshSession}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Session
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Terminate Session
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
