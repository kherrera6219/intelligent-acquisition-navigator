
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Container } from '@/components/ui/universal/Container';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { DocumentSearchBar } from '@/components/documents/DocumentSearchBar';

const ApiDocsPage = () => {
  const title = "API Documentation";
  const description = "Learn how to integrate with the Procurity API";
  
  return (
    <MainLayout>
      <Container className="py-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <DocumentSearchBar placeholder="Search API docs..." />
          </div>
          
          <Card className="p-6">
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="authentication">Authentication</TabsTrigger>
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <h2 className="text-2xl font-bold">
                  API <MsGradientText>Overview</MsGradientText>
                </h2>
                <p>The Procurity API allows you to programmatically access our platform's capabilities, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access to the 4D Knowledge Framework</li>
                  <li>Document analysis and compliance checking</li>
                  <li>Automated procurement workflows</li>
                  <li>Data analytics and reporting</li>
                </ul>
                
                <h3 className="text-xl font-bold mt-6">Getting Started</h3>
                <p>To use the API, you'll need to:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Create an account on the Procurity platform</li>
                  <li>Generate an API key from the developer settings</li>
                  <li>Include the API key in your requests</li>
                </ol>
              </TabsContent>
              
              <TabsContent value="authentication" className="space-y-4">
                <h2 className="text-2xl font-bold">
                  <MsGradientText>Authentication</MsGradientText>
                </h2>
                <p>The Procurity API uses API keys for authentication. Include your API key in the headers of your requests.</p>
                
                <Card className="bg-muted p-4 my-4">
                  <pre className="text-xs md:text-sm overflow-x-auto">
                    <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
                  </pre>
                </Card>
              </TabsContent>
              
              <TabsContent value="endpoints" className="space-y-4">
                <h2 className="text-2xl font-bold">
                  API <MsGradientText>Endpoints</MsGradientText>
                </h2>
                <p>The Procurity API provides the following endpoints:</p>
                
                <div className="space-y-4 mt-4">
                  <Card className="p-4">
                    <h3 className="text-lg font-bold">GET /api/knowledge</h3>
                    <p className="text-muted-foreground">Access the 4D Knowledge Framework</p>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="text-lg font-bold">POST /api/documents/analyze</h3>
                    <p className="text-muted-foreground">Analyze documents for compliance</p>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="text-lg font-bold">GET /api/metrics</h3>
                    <p className="text-muted-foreground">Retrieve performance metrics</p>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="space-y-4">
                <h2 className="text-2xl font-bold">
                  Code <MsGradientText>Examples</MsGradientText>
                </h2>
                
                <Card className="bg-muted p-4 my-4">
                  <h3 className="text-lg font-bold mb-2">Example: Analyze a document</h3>
                  <pre className="text-xs md:text-sm overflow-x-auto">
                    <code>{`fetch('https://api.procurity.ai/documents/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    documentUrl: 'https://example.com/document.pdf',
    analyzeCompliance: true
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</code>
                  </pre>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </Container>
    </MainLayout>
  );
};

export default ApiDocsPage;
