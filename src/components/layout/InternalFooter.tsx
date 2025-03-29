
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, HelpCircle, FileText, Shield } from 'lucide-react';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

export const InternalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Proposals', href: '/proposals' },
        { label: 'Knowledge Base', href: '/knowledge-base' },
        { label: 'Documents', href: '/documents' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/help/documentation' },
        { label: 'FAQs', href: '/help/faqs' },
        { label: 'Training', href: '/help/training' },
        { label: 'Release Notes', href: '/help/releases' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Support', href: '/help/contact' },
        { label: 'Report Issue', href: '/help/report-issue' },
        { label: 'Feature Request', href: '/help/feature-request' },
      ]
    }
  ];

  return (
    <footer className="ms-internal-footer bg-muted/30 border-t border-border/20 py-6">
      <div className="ms-container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo and Copyright */}
          <div className="md:max-w-xs">
            <Link to="/dashboard" className="inline-block mb-2">
              <MsGradientText className="text-lg font-medium" gradient="primary">
                ProcurityIQ
              </MsGradientText>
            </Link>
            <p className="text-xs text-muted-foreground mb-4">
              &copy; {currentYear} ProcurityIQ. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Privacy Policy</span>
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>Terms of Service</span>
              </Link>
            </div>
          </div>
          
          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-medium text-foreground mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.href} 
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom section with additional links */}
        <div className="mt-8 pt-4 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <button className="flex items-center hover:text-foreground transition-colors">
              <HelpCircle className="h-3 w-3 mr-1" />
              <span>Need help?</span>
            </button>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://example.com/docs" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              User Manual
              <ExternalLink className="h-3 w-3" />
            </a>
            <Link to="/status" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              System Status
            </Link>
            <Link to="/settings/accessibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default InternalFooter;
