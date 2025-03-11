
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const ExternalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/95 border-t border-gray-800 mt-auto py-12">
      <Container>
        <Row>
          <Col lg={4} className="mb-8 lg:mb-0">
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
          </Col>
          
          <Col lg={8}>
            <Row>
              <Col sm={6} md={4}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </Col>
              
              <Col sm={6} md={4}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/knowledge-base" className="text-gray-300 hover:text-white transition-colors">Knowledge Base</Link></li>
                  <li><Link to="/api-docs" className="text-gray-300 hover:text-white transition-colors">API Documentation</Link></li>
                  <li><Link to="/sitemap" className="text-gray-300 hover:text-white transition-colors">Sitemap</Link></li>
                </ul>
              </Col>
              
              <Col sm={6} md={4}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link to="/security" className="text-gray-300 hover:text-white transition-colors">Security</Link></li>
                  <li><Link to="/compliance" className="text-gray-300 hover:text-white transition-colors">Compliance</Link></li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        
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
