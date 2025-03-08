
import React, { useState } from 'react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RefreshCw, LogOut, Clock, Shield } from 'lucide-react';
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
    <Card className="p-6 mb-6 glass-morphism">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <div className="p-2 rounded-full bg-violet-500/10">
            <Clock className="h-5 w-5 text-violet-400" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            Session Management
          </h2>
        </div>
        
        <div className="flex items-center text-xs text-gray-400 gap-1">
          <Shield className="h-3 w-3" />
          <span>Security Feature</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="sessionDuration" className="text-sm text-gray-300 font-medium">
            Session Timeout Duration
          </Label>
          <div className="flex gap-4 items-start">
            <Select
              value={sessionDuration}
              onValueChange={setSessionDuration}
              disabled={!isOnline}
            >
              <SelectTrigger className="w-full bg-white/5 border-white/10">
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
              className="min-w-[80px]"
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
            className="flex items-center gap-2 bg-white/5 border-white/10 hover:bg-white/10"
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
        
        <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
          <p className="text-xs text-blue-300">
            <strong>Security Notice:</strong> For your protection, your session will automatically expire after the configured timeout period of inactivity. This helps protect your data if you leave your device unattended.
          </p>
        </div>
      </div>
    </Card>
  );
}
