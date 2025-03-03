
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/universal/Container";
import { Mail, Phone, Clock, Shield, FileText, HelpCircle, Settings, Map } from "lucide-react";

const footerLinks = [
  { href: "/help", label: "Help", icon: HelpCircle },
  { href: "/analytics", label: "Analytics", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/sitemap", label: "Sitemap", icon: Map },
];

export const Footer = () => {
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
              <li>
                <Link 
                  to="/help" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  <HelpCircle className="h-4 w-4" />
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:support@example.com" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  support@example.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+1234567890" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  +1 (234) 567-890
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
          <p>© {new Date().getFullYear()} ProcurityIQ. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
