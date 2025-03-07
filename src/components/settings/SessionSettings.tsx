
import React, { useState } from 'react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SessionSettings() {
  const { toast } = useToast();
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

  return (
    <Card className="p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
        Session Management
      </h2>
      
      <div className="space-y-6">
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
                <p className="text-sm text-gray-400">Started 45 minutes ago</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Active</span>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                toast({
                  title: "Feature coming soon",
                  description: "Session termination will be available in a future update.",
                });
              }}
            >
              Terminate Session
            </Button>
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
