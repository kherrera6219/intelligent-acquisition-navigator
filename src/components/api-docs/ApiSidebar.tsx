
import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const ApiSidebar: React.FC = () => {
  const sections = [
    {
      title: 'Getting Started',
      links: [
        { label: 'Introduction', href: '#introduction' },
        { label: 'Authentication', href: '#authentication' },
        { label: 'Rate Limits', href: '#rate-limits' },
        { label: 'Errors', href: '#errors' },
      ]
    },
    {
      title: 'REST API',
      links: [
        { label: 'Overview', href: '#rest-overview' },
        { label: 'Compliance', href: '#compliance-api' },
        { label: 'Documents', href: '#documents-api' },
        { label: 'Vendors', href: '#vendors-api' },
        { label: 'Contracts', href: '#contracts-api' },
      ]
    },
    {
      title: 'GraphQL',
      links: [
        { label: 'Overview', href: '#graphql-overview' },
        { label: 'Queries', href: '#graphql-queries' },
        { label: 'Mutations', href: '#graphql-mutations' },
        { label: 'Subscriptions', href: '#graphql-subscriptions' },
      ]
    },
    {
      title: 'Webhooks',
      links: [
        { label: 'Overview', href: '#webhooks-overview' },
        { label: 'Events', href: '#webhook-events' },
        { label: 'Security', href: '#webhook-security' },
      ]
    },
    {
      title: 'SDKs & Libraries',
      links: [
        { label: 'JavaScript', href: '#sdk-javascript' },
        { label: 'Python', href: '#sdk-python' },
        { label: 'Java', href: '#sdk-java' },
        { label: '.NET', href: '#sdk-dotnet' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Link
          to="/contact"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'w-full justify-start'
          )}
        >
          Get API Keys
        </Link>
      </div>
      
      {sections.map((section, i) => (
        <div key={i} className="space-y-1">
          <h4 className="font-medium text-sm px-2 py-1">{section.title}</h4>
          <nav className="space-y-1">
            {section.links.map((link, j) => (
              <Link
                key={j}
                to={link.href}
                className="block text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded px-2 py-1 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ))}
      
      <div className="p-4 rounded-lg border border-border bg-muted/50 mt-6">
        <h4 className="font-medium text-sm mb-2">Need Help?</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Our developer support team is available to help with API integration.
        </p>
        <Link
          to="/contact"
          className="text-xs text-primary hover:underline"
        >
          Contact Developer Support
        </Link>
      </div>
    </div>
  );
};
