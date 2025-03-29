
import React from 'react';
import { Link } from 'react-router-dom';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

export const UniversalExternalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Testimonials', href: '/testimonials' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Help Center', href: '/help' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Knowledge Base', href: '/knowledge-base' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/blog' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Security', href: '/security' },
      ]
    }
  ];
  
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
  ];

  return (
    <footer className="ms-external-footer bg-background border-t border-border/20 pt-12 pb-6">
      <div className="ms-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo and About Section - takes 2 columns */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <MsGradientText className="text-xl font-bold" gradient="primary">
                ProcurityIQ
              </MsGradientText>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              Revolutionizing public sector procurement with intuitive digital solutions. Streamline your acquisition process with our comprehensive platform.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  href={social.href} 
                  key={social.label}
                  aria-label={social.label}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Links Sections - 1 column each */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom section with copyright */}
        <div className="mt-12 pt-6 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} ProcurityIQ. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-4 justify-center sm:justify-end">
            <Link to="/accessibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Accessibility
            </Link>
            <Link to="/sitemap" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </Link>
            <Link to="/status" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              System Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UniversalExternalFooter;
