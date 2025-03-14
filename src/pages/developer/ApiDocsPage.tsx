
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { GradientText } from '@/components/ui/universal/GradientText';
import { MsCard, MsCardContent, MsCardHeader, MsCardTitle } from '@/components/ui/universal/MsCard';
import { Container } from '@/components/ui/universal/Container';
import { Badge } from '@/components/ui/badge';
import { Code, FileText, Key, Zap } from 'lucide-react';

const ApiDocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isOnline } = useNetworkMonitor();

  return (
    <ProtectedPageLayout
      title={
        <div className="flex items-center gap-2">
          <span>API</span>
          <GradientText variant="primary">Documentation</GradientText>
        </div>
      }
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

      <MsCard className="mb-6">
        <MsCardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
              <p className="text-muted-foreground mb-4">Our RESTful API lets you programmatically access and manage all resources on our platform.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
                  <Zap className="h-3 w-3" />
                  <span>REST API</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
                  <Key className="h-3 w-3" />
                  <span>JWT Auth</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
                  <FileText className="h-3 w-3" />
                  <span>JSON</span>
                </Badge>
              </div>
            </div>
            <div className="flex-shrink-0 bg-secondary/30 p-4 rounded-lg border border-border w-full md:w-auto">
              <h3 className="text-sm font-medium mb-2">Base URL</h3>
              <code className="bg-black/30 text-white px-3 py-2 rounded-md text-sm block whitespace-nowrap overflow-x-auto">
                https://api.procurity.ai/v1
              </code>
            </div>
          </div>
        </MsCardContent>
      </MsCard>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
          <TabsTrigger value="overview" className="flex-1">
            <span className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="flex-1">
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Endpoints</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="authentication" className="flex-1">
            <span className="flex items-center gap-1.5">
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">Authentication</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex-1">
            <span className="flex items-center gap-1.5">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Examples</span>
            </span>
          </TabsTrigger>
        </TabsList>

        <Container variant="default" padding="none" className="bg-transparent">
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card className="border border-border/50 shadow-md">
              <CardHeader>
                <CardTitle>API Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Welcome to our comprehensive API documentation. Our RESTful API allows you to programmatically access and interact with the data and services provided by our platform.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/30">
                  <h3 className="text-lg font-medium mb-2">Response Format</h3>
                  <p className="text-muted-foreground mb-3">
                    All responses are returned in JSON format with standard HTTP status codes.
                  </p>
                  <div className="bg-black/30 p-3 rounded-md overflow-auto">
                    <pre className="text-sm text-green-400">
{`{
  "data": { ... },      // Response data
  "meta": {             // Metadata about the request
    "status": 200,      // HTTP status code
    "requestId": "..." // Unique request identifier
  }
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-4 mt-4">
            <Card className="border border-border/50 shadow-md">
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-medium mb-4">Available Endpoints</h3>
                <div className="space-y-4">
                  <div className="bg-muted/20 hover:bg-muted/30 transition-colors border border-border rounded-md p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">GET</Badge>
                          <h4 className="font-medium">/documents</h4>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">Retrieves a list of available documents</p>
                      </div>
                      <Badge variant="secondary" className="bg-secondary/30">v1</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/20 hover:bg-muted/30 transition-colors border border-border rounded-md p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">GET</Badge>
                          <h4 className="font-medium">/documents/:id</h4>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">Retrieves a specific document by ID</p>
                      </div>
                      <Badge variant="secondary" className="bg-secondary/30">v1</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/20 hover:bg-muted/30 transition-colors border border-border rounded-md p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">POST</Badge>
                          <h4 className="font-medium">/documents</h4>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">Creates a new document</p>
                      </div>
                      <Badge variant="secondary" className="bg-secondary/30">v1</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-4 mt-4">
            <Card className="border border-border/50 shadow-md">
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Our API uses JWT (JSON Web Tokens) for authentication. You'll need to include the token in the Authorization header of your requests.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/30">
                  <h3 className="text-lg font-medium mb-2">Request Header</h3>
                  <div className="bg-black/30 p-3 rounded-md">
                    <code className="text-green-400 text-sm">
                      Authorization: Bearer {'{your-jwt-token}'}
                    </code>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/30">
                  <h3 className="text-lg font-medium mb-2">Obtaining a Token</h3>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 mt-0.5">POST</Badge>
                    <div>
                      <div className="font-medium">/auth/token</div>
                      <p className="text-muted-foreground text-sm mt-1">Send your credentials to receive a JWT token.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4 mt-4">
            <Card className="border border-border/50 shadow-md">
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">JavaScript Example</h3>
                    <div className="bg-black/30 p-4 rounded-md overflow-auto">
                      <pre className="text-sm text-green-400">
{`fetch('https://api.procurity.ai/v1/documents', {
  headers: {
    'Authorization': 'Bearer your-jwt-token',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Python Example</h3>
                    <div className="bg-black/30 p-4 rounded-md overflow-auto">
                      <pre className="text-sm text-green-400">
{`import requests

url = "https://api.procurity.ai/v1/documents"
headers = {
    "Authorization": "Bearer your-jwt-token",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Container>
      </Tabs>
    </ProtectedPageLayout>
  );
};

export default ApiDocsPage;
