
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/universal/Container";

const footerLinks = [
  { href: "/help", label: "Help" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
  { href: "/sitemap", label: "Sitemap" },
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
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
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
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
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
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
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
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  support@example.com
                </a>
              </li>
              <li>
                <span className="text-gray-400">
                  Mon-Fri, 9:00 AM - 5:00 PM EST
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Your Organization. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
