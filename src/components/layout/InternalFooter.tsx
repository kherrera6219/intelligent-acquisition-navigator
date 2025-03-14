
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { FileText, Book, HelpCircle, Shield, Users, Settings } from 'lucide-react';

export const InternalFooter = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer sections with links
  const footerSections = [
    {
      title: "Resources",
      links: [
        { label: "Knowledge Base", href: "/knowledge-base", icon: Book },
        { label: "Federal Knowledge Base", href: "/federal-knowledge-base", icon: Book },
        { label: "Documentation", href: "/documentation", icon: FileText },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help", icon: HelpCircle },
        { label: "Support Tickets", href: "/support", icon: Users },
        { label: "FAQs", href: "/faqs", icon: FileText },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "Privacy Policy", href: "/privacy", icon: Shield },
        { label: "Terms of Service", href: "/terms", icon: FileText },
        { label: "Settings", href: "/settings", icon: Settings },
      ]
    }
  ];
  
  return (
    <footer className="bg-gray-900/95 border-t border-gray-800 py-6 mt-auto">
      <Container>
        <Row className="mb-6">
          {footerSections.map((section, i) => (
            <Col key={i} md={4} className="mb-6 md:mb-0">
              <h3 className="text-sm font-medium text-gray-300 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <link.icon className="h-3.5 w-3.5" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
        
        <Row className="pt-4 border-t border-gray-800">
          <Col md={6} className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} ProcurityIQ. All rights reserved.
            </p>
          </Col>
          <Col md={6}>
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-start md:justify-end">
              <Link to="/sitemap" className="text-xs text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link to="/accessibility" className="text-xs text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
              <Link to="/contact" className="text-xs text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
