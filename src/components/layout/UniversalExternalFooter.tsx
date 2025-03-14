
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/universal/Container';
import { Github, Twitter, Linkedin, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export const UniversalExternalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-12 bg-black/60 backdrop-blur-sm border-t border-gray-800">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                ProcurityIQ
              </h2>
            </Link>
            <p className="text-gray-300 mb-6">
              Advanced procurement intelligence platform streamlining acquisition processes for government and enterprise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Solutions</h3>
                <ul className="space-y-3">
                  <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors">All Features</Link></li>
                  <li><Link to="/federal-acquisition" className="text-gray-300 hover:text-white transition-colors">Federal Acquisition</Link></li>
                  <li><Link to="/compliance" className="text-gray-300 hover:text-white transition-colors">Compliance</Link></li>
                  <li><Link to="/market-research" className="text-gray-300 hover:text-white transition-colors">Market Research</Link></li>
                  <li><Link to="/document-control" className="text-gray-300 hover:text-white transition-colors">Document Control</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/knowledge-base" className="text-gray-300 hover:text-white transition-colors">Knowledge Base</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href="mailto:info@procurityiq.com" className="text-gray-300 hover:text-white transition-colors">info@procurityiq.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <a href="tel:+18005551234" className="text-gray-300 hover:text-white transition-colors">+1 (800) 555-1234</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">Washington, DC</span>
                  </li>
                </ul>
                
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mt-6 mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
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
              <Link to="/sitemap" className="text-xs text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link to="/accessibility" className="text-xs text-gray-400 hover:text-white transition-colors">
                Accessibility
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

export default UniversalExternalFooter;
