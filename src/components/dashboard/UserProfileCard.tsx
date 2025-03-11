
import React, { useState } from 'react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import type { UserProfile } from '@/types/dashboard';

export const UserProfileCard: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock user data
  const user: UserProfile = {
    displayName: "Alex Morgan",
    role: "Department Manager",
    tasks: 18,
    projects: 5,
    loginTime: "09:45 AM",
    isPremium: true
  };

  // This would be replaced with a real data fetch in the future
  const handleRefresh = (): void => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // Simulate random error for demonstration
      const success = Math.random() > 0.2;
      
      if (success) {
        setIsLoading(false);
      } else {
        setError("Could not update profile data.");
        setIsLoading(false);
      }
    }, 1000);
  };
  
  // Create initials from display name
  const getInitials = (name: string): string => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <MsDashboardCard
      title={user.displayName}
      subtitle={user.role}
      badge={user.isPremium ? { text: "Premium", variant: "success" } : undefined}
    >
      {error && (
        <div className="bg-red-500/10 text-red-500 p-2 rounded-md mb-3 text-sm flex items-center" role="alert">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center mb-4">
        {isLoading ? (
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" aria-hidden="true" />
          </div>
        ) : (
          <div 
            className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary mb-2"
            aria-label={`${user.displayName}'s profile picture`}
            aria-hidden="true"
          >
            {getInitials(user.displayName)}
          </div>
        )}
        <p className="text-sm text-center text-muted-foreground">
          Logged in since {user.loginTime}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-center text-sm" aria-label="User statistics">
        <div className="p-2 rounded bg-white/5">
          <p className="font-medium">{user.tasks}</p>
          <p className="text-xs text-muted-foreground">Tasks</p>
        </div>
        <div className="p-2 rounded bg-white/5">
          <p className="font-medium">{user.projects}</p>
          <p className="text-xs text-muted-foreground">Projects</p>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          aria-label="View profile"
          onClick={() => handleRefresh()}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3 w-3 mr-1 animate-spin" aria-hidden="true" />
              Loading...
            </>
          ) : (
            "Profile"
          )}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          aria-label="Open settings"
        >
          Settings
        </Button>
      </div>
    </MsDashboardCard>
  );
};
