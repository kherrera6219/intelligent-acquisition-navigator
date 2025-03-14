
import React from 'react';
import { Link } from 'react-router-dom';

const SitemapPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="text-blue-500 hover:underline">Home</Link></li>
            <li><Link to="/about" className="text-blue-500 hover:underline">About</Link></li>
            <li><Link to="/features" className="text-blue-500 hover:underline">Features</Link></li>
            <li><Link to="/contact" className="text-blue-500 hover:underline">Contact</Link></li>
            <li><Link to="/pricing" className="text-blue-500 hover:underline">Pricing</Link></li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">User Account</h2>
          <ul className="space-y-2">
            <li><Link to="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link></li>
            <li><Link to="/profile" className="text-blue-500 hover:underline">Profile</Link></li>
            <li><Link to="/settings" className="text-blue-500 hover:underline">Settings</Link></li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Acquisition</h2>
          <ul className="space-y-2">
            <li><Link to="/federal-acquisition" className="text-blue-500 hover:underline">Federal Acquisition</Link></li>
            <li><Link to="/texas-acquisition" className="text-blue-500 hover:underline">Texas Acquisition</Link></li>
            <li><Link to="/market-research" className="text-blue-500 hover:underline">Market Research</Link></li>
            <li><Link to="/solicitation-review" className="text-blue-500 hover:underline">Solicitation Review</Link></li>
            <li><Link to="/document-control" className="text-blue-500 hover:underline">Document Control</Link></li>
            <li><Link to="/compliance" className="text-blue-500 hover:underline">Compliance</Link></li>
            <li><Link to="/source-selection" className="text-blue-500 hover:underline">Source Selection</Link></li>
            <li><Link to="/contract-management" className="text-blue-500 hover:underline">Contract Management</Link></li>
            <li><Link to="/legal-review" className="text-blue-500 hover:underline">Legal Review</Link></li>
            <li><Link to="/small-business" className="text-blue-500 hover:underline">Small Business</Link></li>
            <li><Link to="/quality-assurance" className="text-blue-500 hover:underline">Quality Assurance</Link></li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Help & Resources</h2>
          <ul className="space-y-2">
            <li><Link to="/help" className="text-blue-500 hover:underline">Help Center</Link></li>
            <li><Link to="/knowledge-base" className="text-blue-500 hover:underline">Knowledge Base</Link></li>
            <li><Link to="/api-docs" className="text-blue-500 hover:underline">API Documentation</Link></li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Legal</h2>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link></li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Developer Resources</h2>
          <ul className="space-y-2">
            <li><Link to="/component-library" className="text-blue-500 hover:underline">Component Library</Link></li>
            <li><Link to="/validation" className="text-blue-500 hover:underline">Validation</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
