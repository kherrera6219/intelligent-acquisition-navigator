
import React from 'react';
import { Link } from 'react-router-dom';
import { appRoutes } from '@/routes/AppRoutes';
import { PageHeader } from '@/components/layout/PageHeader';

const SitemapPage: React.FC = () => {
  // Organize routes by category
  const categories = {
    main: ['/', '/about', '/features', '/pricing', '/contact', '/help', '/privacy'],
    dashboard: ['/dashboard', '/analytics', '/improve', '/profile', '/settings'],
    acquisition: [
      '/market-research',
      '/document-control',
      '/solicitation-review',
      '/federal-acquisition',
      '/texas-acquisition',
      '/compliance',
      '/source-selection',
      '/contract-management',
      '/legal-review',
      '/small-business',
      '/quality-assurance'
    ],
    knowledge: ['/knowledge-base', '/chat'],
    developer: ['/api-docs', '/component-library', '/validation'],
  };

  const formatPathName = (path: string) => {
    if (path === '/') return 'Home';
    return path
      .replace(/-/g, ' ')
      .replace(/\//g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Sitemap"
        description="Complete list of all pages on our site"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {Object.entries(categories).map(([category, paths]) => (
          <div key={category} className="rounded-lg border border-gray-300 dark:border-gray-700 p-4">
            <h2 className="text-xl font-semibold mb-4 capitalize">{category} Pages</h2>
            <ul className="space-y-2">
              {paths.map((path) => (
                <li key={path} className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  <Link
                    to={path}
                    className="block px-3 py-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {formatPathName(path)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/sitemap"
            className="block p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            HTML Sitemap
          </Link>
          <a
            href="/sitemap.xml"
            className="block p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            XML Sitemap
          </a>
          <Link
            to="/help"
            className="block p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Help Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
