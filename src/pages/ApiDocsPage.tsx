
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ApiEndpoint } from '@/components/api-docs/ApiEndpoint';
import { CodeBlock } from '@/components/api-docs/CodeBlock';
import { ApiSidebar } from '@/components/api-docs/ApiSidebar';

export default function ApiDocsPage() {
  return (
    <ExternalPageLayout
      showHeader={true}
      showFooter={true}
    >
      <Helmet>
        <title>API Documentation | ProcurityIQ</title>
        <meta name="description" content="Comprehensive API documentation for integrating with the ProcurityIQ platform." />
      </Helmet>
      
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <ApiSidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">ProcurityIQ API Documentation</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Integrate acquisition intelligence and compliance checking into your applications.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Card className="flex-1 min-w-[200px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Getting Started</CardTitle>
                    <CardDescription>Quick setup guide</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="flex-1 min-w-[200px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Authentication</CardTitle>
                    <CardDescription>API keys and OAuth</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="flex-1 min-w-[200px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Rate Limits</CardTitle>
                    <CardDescription>Usage tiers and quotas</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
            
            <Tabs defaultValue="rest" className="mb-10">
              <TabsList className="mb-4">
                <TabsTrigger value="rest">REST API</TabsTrigger>
                <TabsTrigger value="graphql">GraphQL</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="rest">
                <Card>
                  <CardHeader>
                    <CardTitle>REST API Reference</CardTitle>
                    <CardDescription>
                      Our REST API provides programmatic access to compliance checking, document analysis, and acquisition data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Authentication</h3>
                    <p className="mb-4">All API requests require authentication using API keys.</p>
                    
                    <CodeBlock language="bash">
{`curl -X GET \\
  https://api.procurityiq.com/v1/compliance/check \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                    </CodeBlock>
                    
                    <h3 className="text-lg font-medium mt-8 mb-4">Endpoints</h3>
                    
                    <div className="space-y-6">
                      <ApiEndpoint 
                        method="GET" 
                        endpoint="/v1/compliance/rules" 
                        description="Retrieve all compliance rules or filter by category"
                      />
                      
                      <ApiEndpoint 
                        method="POST" 
                        endpoint="/v1/compliance/check" 
                        description="Check document or text against compliance rules"
                      />
                      
                      <ApiEndpoint 
                        method="GET" 
                        endpoint="/v1/vendors" 
                        description="List vendors with optional filtering"
                      />
                      
                      <ApiEndpoint 
                        method="POST" 
                        endpoint="/v1/documents/analyze" 
                        description="Analyze procurement documents for risks and recommendations"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="graphql">
                <Card>
                  <CardHeader>
                    <CardTitle>GraphQL API</CardTitle>
                    <CardDescription>
                      Our GraphQL API provides a flexible way to query exactly the data you need.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">GraphQL endpoint: <code>https://api.procurityiq.com/graphql</code></p>
                    
                    <h3 className="text-lg font-medium mb-4">Example Query</h3>
                    
                    <CodeBlock language="graphql">
{`query GetComplianceRules($category: String) {
  complianceRules(category: $category) {
    id
    title
    description
    category
    severity
    references {
      title
      url
    }
  }
}`}
                    </CodeBlock>
                    
                    <h3 className="text-lg font-medium mt-8 mb-4">Example Mutation</h3>
                    
                    <CodeBlock language="graphql">
{`mutation CheckCompliance($input: ComplianceCheckInput!) {
  checkCompliance(input: $input) {
    id
    status
    timestamp
    results {
      ruleId
      passed
      details
      severity
    }
  }
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="webhooks">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>
                      Receive real-time notifications about events in your ProcurityIQ account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">
                      Webhooks allow your application to receive real-time notifications when events occur in your ProcurityIQ account.
                    </p>
                    
                    <h3 className="text-lg font-medium mb-4">Available Events</h3>
                    
                    <ul className="list-disc list-inside space-y-2 mb-6">
                      <li>document.created - A new document is uploaded</li>
                      <li>document.analyzed - Document analysis is complete</li>
                      <li>compliance.checked - Compliance check is complete</li>
                      <li>compliance.rule.updated - A compliance rule is updated</li>
                      <li>vendor.added - A new vendor is added to the system</li>
                      <li>contract.statusChanged - A contract status changes</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mb-4">Webhook Payload Example</h3>
                    
                    <CodeBlock language="json">
{`{
  "event": "compliance.checked",
  "timestamp": "2023-05-10T15:30:45Z",
  "data": {
    "checkId": "chk_1234567890",
    "documentId": "doc_0987654321",
    "status": "completed",
    "passedRules": 42,
    "failedRules": 3,
    "warningRules": 5
  }
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
