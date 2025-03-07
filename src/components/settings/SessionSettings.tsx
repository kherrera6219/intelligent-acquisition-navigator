
import React, { useState } from 'react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RefreshCw, LogOut } from 'lucide-react';
import { SessionExpiryProgress } from './SessionExpiryProgress';

export function SessionSettings() {
  const { toast } = useToast();
  const { refreshSession, signOut, isOnline } = useAuth();
  const [sessionDuration, setSessionDuration] = useState('30');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings saved",
      description: `Session timeout set to ${sessionDuration} minutes.`,
    });
    
    setIsSaving(false);
  };

  const handleRefreshSession = () => {
    refreshSession();
    toast({
      title: "Session refreshed",
      description: "Your session has been extended.",
    });
  };

  return (
    <Card className="p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
        Session Management
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="sessionDuration">Session Timeout</Label>
          <div className="flex gap-4 items-start">
            <Select
              value={sessionDuration}
              onValueChange={setSessionDuration}
              disabled={!isOnline}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select timeout duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes (default)</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleSaveSettings}
              disabled={isSaving || !isOnline}
              size="sm"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            This setting controls how long your session remains active without interaction.
          </p>
        </div>
        
        <SessionExpiryProgress className="mt-4" />
        
        <div className="pt-4 flex flex-wrap gap-3">
          <Button 
            onClick={handleRefreshSession}
            variant="outline"
            className="flex items-center gap-2"
            disabled={!isOnline}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Session</span>
          </Button>
          
          <Button 
            onClick={signOut}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
