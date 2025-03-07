
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/universal/Container";
import { 
  Mail, Phone, Clock, Shield, FileText, HelpCircle, 
  Settings, Map, Home, BarChart2, FileSearch, Database,
  Github, Twitter, Linkedin, Facebook
} from "lucide-react";

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
    <footer className="border-t border-gray-800 bg-black/70 backdrop-blur-md py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Database className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl text-white">ProcurityIQ</span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Advanced procurement management solutions powered by AI to streamline your acquisition processes.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-200"
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
                    className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-200"
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
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:support@procurityiq.com" 
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  <Mail className="h-4 w-4" />
                  support@procurityiq.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+12345678901" 
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-200"
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

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© {currentYear} ProcurityIQ. All rights reserved.</p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href}
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
