
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const SessionTimeoutWarning: React.FC = () => {
  const { sessionTimeRemaining, showSessionWarning, refreshSession, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    setOpen(showSessionWarning);
    
    if (sessionTimeRemaining !== null && sessionTimeRemaining > 0) {
      const minutes = Math.floor(sessionTimeRemaining / 60000);
      const seconds = Math.floor((sessionTimeRemaining % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  }, [showSessionWarning, sessionTimeRemaining]);

  const handleStayLoggedIn = async () => {
    await refreshSession();
    setOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Session Timeout Warning</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p>Your session will expire in {timeLeft}.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Would you like to stay logged in or log out?
          </p>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
          <Button onClick={handleStayLoggedIn}>
            Stay Logged In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
