
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GlassCard } from '@/components/ui/universal/GlassCard';
import { Webhook, Code, Database, FileJson } from 'lucide-react';

const ApiDocsPage: React.FC = () => {
  const apiEndpoints = [
    {
      name: "Authentication",
      description: "Endpoints for user authentication and authorization",
      icon: <Webhook className="h-5 w-5 text-blue-400" />,
      endpoints: [
        { path: "/api/auth/login", method: "POST", description: "Authenticate a user" },
        { path: "/api/auth/register", method: "POST", description: "Register a new user" },
        { path: "/api/auth/refresh", method: "POST", description: "Refresh authentication token" }
      ]
    },
    {
      name: "Proposals",
      description: "Endpoints for managing proposal data",
      icon: <FileJson className="h-5 w-5 text-green-400" />,
      endpoints: [
        { path: "/api/proposals", method: "GET", description: "List all proposals" },
        { path: "/api/proposals/:id", method: "GET", description: "Get a specific proposal" },
        { path: "/api/proposals", method: "POST", description: "Create a new proposal" }
      ]
    },
    {
      name: "Knowledge Base",
      description: "Endpoints for accessing knowledge base resources",
      icon: <Database className="h-5 w-5 text-purple-400" />,
      endpoints: [
        { path: "/api/knowledge", method: "GET", description: "Search knowledge resources" },
        { path: "/api/knowledge/:id", method: "GET", description: "Get a specific resource" }
      ]
    }
  ];

  return (
    <main className="flex-grow">
      <Container>
        <div className="space-y-8 py-6">
          <PageHeader
            title="API Documentation"
            description="Reference documentation for ProcurityIQ API endpoints"
          />

          <div className="space-y-8">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Getting Started</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  The ProcurityIQ API provides programmatic access to procurement data and workflows.
                  All API calls require authentication using JWT tokens.
                </p>
                <div className="bg-gray-800/60 p-4 rounded-md">
                  <pre className="text-sm text-gray-200 overflow-x-auto">
                    <code>{`# Example API request
curl -X GET https://api.procurityiq.com/api/proposals \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \\
  -H "Content-Type: application/json"
`}</code>
                  </pre>
                </div>
              </div>
            </GlassCard>

            {apiEndpoints.map((section, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold">{section.name}</h2>
                </div>
                <p className="text-gray-300 mb-6">{section.description}</p>
                
                <div className="space-y-4">
                  {section.endpoints.map((endpoint, idx) => (
                    <div key={idx} className="border border-gray-700 rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm bg-gray-800 px-2 py-1 rounded text-white">
                          {endpoint.path}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          endpoint.method === "GET" ? "bg-blue-900/60 text-blue-300" :
                          endpoint.method === "POST" ? "bg-green-900/60 text-green-300" :
                          endpoint.method === "PUT" ? "bg-yellow-900/60 text-yellow-300" :
                          "bg-red-900/60 text-red-300"
                        }`}>
                          {endpoint.method}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{endpoint.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ApiDocsPage;
