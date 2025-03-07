
import React, { useState } from 'react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { QrCode } from "lucide-react";

export function TwoFactorSettings() {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleToggle = () => {
    if (isEnabled) {
      // Disable 2FA flow
      setIsEnabled(false);
      toast({
        title: "Two-factor authentication disabled",
        description: "Your account is now less secure. We recommend enabling 2FA for better security.",
      });
    } else {
      // Enable 2FA flow - show QR code
      setShowQRCode(true);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (verificationCode === '123456') { // Demo code for testing
        setIsEnabled(true);
        setShowQRCode(false);
        toast({
          title: "Two-factor authentication enabled",
          description: "Your account is now more secure with 2FA.",
        });
      } else {
        toast({
          title: "Verification failed",
          description: "The code you entered is invalid. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error enabling 2FA",
        description: "There was a problem enabling two-factor authentication. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
        Two-Factor Authentication
      </h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable Two-Factor Authentication</p>
            <p className="text-sm text-gray-400 mt-1">
              Add an extra layer of security to your account by requiring both your password and
              authentication code from your mobile device.
            </p>
          </div>
          <Switch 
            checked={isEnabled} 
            onCheckedChange={handleToggle}
            aria-label="Toggle two-factor authentication"
          />
        </div>

        {showQRCode && !isEnabled && (
          <div className="border border-gray-700 rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <QrCode className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Setup Two-Factor Authentication</h3>
            </div>
            
            <div className="bg-white p-4 flex items-center justify-center rounded-md w-48 h-48 mx-auto">
              <p className="text-black">QR Code Placeholder</p>
            </div>
            
            <p className="text-sm text-gray-400">
              Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              and enter the verification code below.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="bg-white/5"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowQRCode(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleVerify}
                disabled={isVerifying || verificationCode.length !== 6}
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </div>
        )}

        {isEnabled && (
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="font-medium">Two-factor authentication is enabled</p>
            </div>
            <p className="text-sm text-gray-400">
              Your account is protected with two-factor authentication. You'll need to enter a code
              from your authenticator app each time you sign in.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
