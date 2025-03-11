
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Card } from '@/components/ui/universal/Card';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { NetworkErrorHandler } from '@/components/ui/universal/NetworkErrorHandler';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApiDocsPage: React.FC = () => {
  const { isOnline } = useNetworkMonitor();

  return (
    <main className="flex-grow">
      <Container>
        <NetworkErrorHandler
          errorMessage={!isOnline ? "You are currently offline. API documentation may be limited." : undefined}
        >
          <div className="space-y-8 py-6 bg-noise"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
                radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
              `,
              backgroundAttachment: 'fixed',
              backgroundColor: 'var(--background)'
            }}
          >
            <PageHeader
              title={<GradientText>API Documentation</GradientText>}
              description="Resources for developers integrating with our platform"
            />
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="authentication">Authentication</TabsTrigger>
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card variant="metal" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">API Overview</h2>
                  <p className="text-gray-400 mb-4">
                    Our RESTful API allows you to programmatically access and manage acquisition data.
                    All API requests use JSON for request and response bodies and require authentication.
                  </p>
                  <p className="text-gray-400 mb-4">
                    Base URL: <code className="bg-gray-800 px-2 py-1 rounded">https://api.procurity.ai/v1</code>
                  </p>
                  <h3 className="text-lg font-medium mb-2 mt-6">Getting Started</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-400">
                    <li>Register for an API key in your account settings</li>
                    <li>Review the authentication requirements</li>
                    <li>Explore available endpoints</li>
                    <li>Test with our interactive examples</li>
                  </ol>
                </Card>
              </TabsContent>
              
              <TabsContent value="authentication">
                <Card variant="metal" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Authentication</h2>
                  <p className="text-gray-400 mb-4">
                    All API requests require authentication using Bearer tokens.
                  </p>
                  <div className="bg-gray-800 p-4 rounded-md mb-6">
                    <pre>
                      <code>
                        {`// Example request with authentication
fetch('https://api.procurity.ai/v1/proposals', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})`}
                      </code>
                    </pre>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Token Management</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    <li>Tokens expire after 24 hours</li>
                    <li>Refresh tokens using the <code>/auth/refresh</code> endpoint</li>
                    <li>Revoke tokens using the <code>/auth/revoke</code> endpoint</li>
                  </ul>
                </Card>
              </TabsContent>
              
              <TabsContent value="endpoints">
                <Card variant="metal" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Authentication</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li><code>/auth/login</code> - Obtain authentication tokens</li>
                        <li><code>/auth/refresh</code> - Refresh an expired token</li>
                        <li><code>/auth/logout</code> - Invalidate current token</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Proposals</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li><code>/proposals</code> - List all proposals</li>
                        <li><code>/proposals/{'{id}'}</code> - Get proposal details</li>
                        <li><code>/proposals/{'{id}'}/evaluations</code> - Get proposal evaluations</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Documents</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li><code>/documents</code> - List all documents</li>
                        <li><code>/documents/{'{id}'}</code> - Get document details</li>
                        <li><code>/documents/upload</code> - Upload a new document</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="examples">
                <Card variant="metal" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Example Code</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">JavaScript/TypeScript</h3>
                      <div className="bg-gray-800 p-4 rounded-md">
                        <pre>
                          <code>
                            {`// Initialize client
const api = new ProcurityClient({ 
  apiKey: 'YOUR_API_KEY' 
});

// Get all proposals
api.proposals.list()
  .then(proposals => {
    console.log(proposals);
  })
  .catch(error => {
    console.error(error);
  });

// Get proposal details
api.proposals.get('proposal-id-123')
  .then(proposal => {
    console.log(proposal);
  });`}
                          </code>
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Python</h3>
                      <div className="bg-gray-800 p-4 rounded-md">
                        <pre>
                          <code>
                            {`# Initialize client
from procurity import ProcurityClient

client = ProcurityClient(api_key='YOUR_API_KEY')

# Get all proposals
proposals = client.proposals.list()
print(proposals)

# Get proposal details
proposal = client.proposals.get('proposal-id-123')
print(proposal)`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Link to="/sitemap">
                      <button className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded">
                        <Code className="mr-2 h-4 w-4" />
                        View All Documentation
                      </button>
                    </Link>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </NetworkErrorHandler>
      </Container>
    </main>
  );
};

export default ApiDocsPage;
