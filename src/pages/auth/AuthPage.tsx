
import React from 'react';
import SignUpForm from '@/components/auth/SignUpForm';
import PasswordReset from '@/components/auth/PasswordReset';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface AuthPageProps {}

export const AuthPage: React.FC<AuthPageProps> = () => {
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  const breadcrumbItems = [
    { label: "Authentication", href: "/auth" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />
        
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to continue to your account</p>
          </div>

          <div 
            className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl 
                      backdrop-blur-sm space-y-6 
                      sm:p-8 md:backdrop-blur-md"
            role="form"
            aria-label="Authentication form"
          >
            <SignUpForm />
            <div className="border-t border-gray-700 pt-6">
              <PasswordReset />
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Press ? for keyboard shortcuts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
