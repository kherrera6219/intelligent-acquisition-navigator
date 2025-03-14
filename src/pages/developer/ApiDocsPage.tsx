
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

const ApiDocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isOnline } = useNetworkMonitor();

  return (
    <ProtectedPageLayout
      title="API Documentation"
      description="Learn how to integrate with our API services"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Developer', href: '/api-docs' },
        { label: 'API Documentation', href: '/api-docs' }
      ]}
    >
      {!isOnline && (
        <NetworkStatusBanner 
          isOffline={true} 
          message="You are currently offline. Some API features may not be available."
          variant="destructive"
        />
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="endpoints" className="flex-1">Endpoints</TabsTrigger>
          <TabsTrigger value="authentication" className="flex-1">Authentication</TabsTrigger>
          <TabsTrigger value="examples" className="flex-1">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Welcome to our comprehensive API documentation. Our RESTful API allows you to programmatically access and interact with the data and services provided by our platform.
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-medium">Base URL</h3>
                <code className="bg-gray-800/30 p-2 rounded-md block mt-2">
                  https://api.procurity.ai/v1
                </code>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">Response Format</h3>
                <p className="text-muted-foreground mt-2">
                  All responses are returned in JSON format with standard HTTP status codes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium">Available Endpoints</h3>
              <div className="mt-4 space-y-4">
                <div className="border border-gray-200 dark:border-gray-800 rounded-md p-4">
                  <h4 className="font-medium">GET /documents</h4>
                  <p className="text-muted-foreground mt-1">Retrieves a list of available documents</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 rounded-md p-4">
                  <h4 className="font-medium">GET /documents/:id</h4>
                  <p className="text-muted-foreground mt-1">Retrieves a specific document by ID</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 rounded-md p-4">
                  <h4 className="font-medium">POST /documents</h4>
                  <p className="text-muted-foreground mt-1">Creates a new document</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our API uses JWT (JSON Web Tokens) for authentication. You'll need to include the token in the Authorization header of your requests.
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-medium">Request Header</h3>
                <code className="bg-gray-800/30 p-2 rounded-md block mt-2">
                  Authorization: Bearer {'{your-jwt-token}'}
                </code>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium">JavaScript Example</h3>
              <pre className="bg-gray-800/30 p-3 rounded-md mt-2 overflow-auto">
                <code>
{`fetch('https://api.procurity.ai/v1/documents', {
  headers: {
    'Authorization': 'Bearer your-jwt-token',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                </code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ProtectedPageLayout>
  );
};

export default ApiDocsPage;
