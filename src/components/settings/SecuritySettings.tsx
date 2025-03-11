
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/universal/Card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, RefreshCw, Save } from 'lucide-react';
import { generateCsrfToken } from '@/utils/csrfProtection';
import { rateLimitManager } from '@/utils/rateLimitManager';
import { clearExpiredCache } from '@/utils/offlineStorage';
import { isStrongPassword } from '@/utils/inputSanitization';

export function SecuritySettings() {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeoutEnabled, setSessionTimeoutEnabled] = useState(true);
  const [inputValidationEnabled, setInputValidationEnabled] = useState(true);
  const [csrfProtectionEnabled, setCsrfProtectionEnabled] = useState(true);
  const [offlineCacheEnabled, setOfflineCacheEnabled] = useState(true);
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Current password is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!newPassword) {
      toast({
        title: "Error",
        description: "New password is required",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // Check password strength
    if (!isStrongPassword(newPassword)) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
        variant: "destructive",
      });
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Your password has been updated successfully",
      });
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  const refreshCsrfToken = () => {
    generateCsrfToken();
    toast({
      title: "Success",
      description: "CSRF token has been refreshed",
    });
  };
  
  const clearRateLimits = () => {
    rateLimitManager.reset();
    toast({
      title: "Success",
      description: "Rate limits have been reset",
    });
  };
  
  const clearCache = async () => {
    try {
      const count = await clearExpiredCache();
      toast({
        title: "Success",
        description: `Cleared ${count} expired cache items`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cache. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-gray-400">
          Manage your account security preferences and password
        </p>
      </div>
      
      <Separator />
      
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Change Password
        </h4>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
          className="w-full sm:w-auto"
        >
          {isChangingPassword ? 'Changing...' : 'Change Password'}
        </Button>
      </form>
      
      <Separator />
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Security Features
        </h4>
        
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-xs text-gray-400">
                Secure your account with two-factor authentication
              </p>
            </div>
            <Switch
              id="two-factor"
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="session-timeout">Session Timeout</Label>
              <p className="text-xs text-gray-400">
                Automatically log out after period of inactivity
              </p>
            </div>
            <Switch
              id="session-timeout"
              checked={sessionTimeoutEnabled}
              onCheckedChange={setSessionTimeoutEnabled}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="input-validation">Input Validation & Sanitization</Label>
              <p className="text-xs text-gray-400">
                Protect against XSS and injection attacks
              </p>
            </div>
            <Switch
              id="input-validation"
              checked={inputValidationEnabled}
              onCheckedChange={setInputValidationEnabled}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="csrf-protection">CSRF Protection</Label>
              <p className="text-xs text-gray-400">
                Prevent cross-site request forgery attacks
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={refreshCsrfToken}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Refresh</span>
              </Button>
              <Switch
                id="csrf-protection"
                checked={csrfProtectionEnabled}
                onCheckedChange={setCsrfProtectionEnabled}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="offline-cache">Offline Data Caching</Label>
              <p className="text-xs text-gray-400">
                Store data locally for offline access
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={clearCache}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Clear Cache</span>
              </Button>
              <Switch
                id="offline-cache"
                checked={offlineCacheEnabled}
                onCheckedChange={setOfflineCacheEnabled}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Rate Limiting Status</Label>
              <p className="text-xs text-gray-400">
                Protects against API abuse and service overload
              </p>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={clearRateLimits}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset Limits</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
