
import React, { useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ImprovementChecklist } from '@/components/ui/checklist/ImprovementChecklist';
import { GlobalErrorBoundary } from '@/components/error/GlobalErrorBoundary';
import { ImprovementProvider } from '@/contexts/ImprovementContext';
import { QueryProvider } from '@/providers/QueryProvider';
import { Helmet } from 'react-helmet';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

const ImproveApp: React.FC = () => {
  const { isOnline } = useNetworkMonitor();

  useEffect(() => {
    // Add PWA install prompt handler
    let deferredPrompt: any;
    
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      
      // Show install button or notification if needed
      const installButton = document.getElementById('install-button');
      if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', () => {
          // Show the install prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult: {outcome: string}) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
          });
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <GlobalErrorBoundary>
      <Helmet>
        <title>Application Improvement | Procurity</title>
        <meta name="description" content="Track progress on application improvements and provide feedback" />
        <meta name="theme-color" content="#0066CC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/app.webmanifest" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Helmet>
      <QueryProvider>
        <ImprovementProvider>
          <div className="container mx-auto px-4 py-8">
            <PageHeader
              title="Application Improvement"
              description="Track progress on application improvements and provide feedback"
            />
            
            {!isOnline && (
              <Alert variant="destructive" className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-4 rounded" role="alert">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="font-bold">You are currently offline</AlertDescription>
                <p>Some features may be limited. Changes will sync when you're back online.</p>
              </Alert>
            )}
            
            <div className="mt-8">
              <ImprovementChecklist />
            </div>
            
            <button 
              id="install-button" 
              style={{ display: 'none' }}
              className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg"
            >
              Install App
            </button>
          </div>
        </ImprovementProvider>
      </QueryProvider>
    </GlobalErrorBoundary>
  );
};

export default ImproveApp;
