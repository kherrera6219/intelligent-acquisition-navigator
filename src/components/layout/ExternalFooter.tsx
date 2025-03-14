
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/universal/Container';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const ExternalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-12 bg-black/50 backdrop-blur-sm border-t border-gray-800">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                ProcurityIQ
              </h2>
            </Link>
            <p className="text-gray-300 mb-6">
              Advanced procurement intelligence platform streamlining acquisition processes across federal, state, and local levels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/knowledge-base" className="text-gray-300 hover:text-white transition-colors">Knowledge Base</Link></li>
                  <li><Link to="/api-docs" className="text-gray-300 hover:text-white transition-colors">API Documentation</Link></li>
                  <li><Link to="/sitemap" className="text-gray-300 hover:text-white transition-colors">Sitemap</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link to="/security" className="text-gray-300 hover:text-white transition-colors">Security</Link></li>
                  <li><Link to="/compliance" className="text-gray-300 hover:text-white transition-colors">Compliance</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} ProcurityIQ. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/cookies" className="text-xs text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
