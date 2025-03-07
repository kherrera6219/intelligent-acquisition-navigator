
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/universal/Container";
import { Mail, Phone, Clock, Shield, FileText, HelpCircle, Settings, Map, Home, BarChart2, FileSearch, Database } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: FileText },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/proposals", label: "Proposals", icon: FileSearch },
];

const resourceLinks = [
  { href: "/knowledge-base", label: "Knowledge Base", icon: Database },
  { href: "/help", label: "Documentation", icon: FileText },
  { href: "/help", label: "FAQs", icon: HelpCircle },
  { href: "/contact", label: "Support", icon: Mail },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy", icon: Shield },
  { href: "/terms", label: "Terms of Service", icon: FileText },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:support@procurityiq.com" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  support@procurityiq.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+12345678901" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  +1 (234) 567-8901
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  Mon-Fri, 9:00 AM - 5:00 PM EST
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} ProcurityIQ. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
