
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/universal/Container";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from "lucide-react";

export const Footer = () => {
  // Create distinct route groups
  const mainRoutes = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/pricing", label: "Pricing" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const resourceRoutes = [
    { path: "/help", label: "Help Center" },
    { path: "/knowledge-base", label: "Knowledge Base" },
    { path: "/privacy", label: "Privacy Policy" },
    { path: "/sitemap", label: "Sitemap" },
    { path: "/api-docs", label: "API Documentation" },
    { path: "/component-library", label: "Component Library" },
  ];

  const appRoutes = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/solicitation-review", label: "Solicitation Review" },
    { path: "/document-control", label: "Document Control" },
    { path: "/compliance", label: "Compliance" },
    { path: "/quality-assurance", label: "Quality Assurance" },
    { path: "/contract-management", label: "Contract Management" },
  ];

  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-800 mt-auto shadow-lg">
      {/* Top Footer - Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1 - About and Contact */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link to="/" className="inline-block">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">ProcurityIQ</h2>
              </Link>
              <p className="mt-4 text-gray-300 max-w-md">
                Advanced procurement intelligence platform that streamlines acquisition processes across federal, state, and local levels.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-300">
                  1234 Government Plaza, Suite 500<br />
                  Washington, DC 20001
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <p className="text-gray-300">(202) 555-0123</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@procurityiq.com" className="text-gray-300 hover:text-primary transition-colors">
                  info@procurityiq.com
                </a>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                <a 
                  href="https://twitter.com/procurityiq"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/procurityiq"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://github.com/procurityiq"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Main Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {mainRoutes.map((route, index) => (
                <li key={`main-${index}`}>
                  <Link 
                    to={route.path} 
                    className="text-gray-300 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 text-gray-500" />
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceRoutes.map((route, index) => (
                <li key={`resource-${index}`}>
                  <Link 
                    to={route.path} 
                    className="text-gray-300 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 text-gray-500" />
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Application */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Application</h3>
            <ul className="space-y-3">
              {appRoutes.map((route, index) => (
                <li key={`app-${index}`}>
                  <Link 
                    to={route.path} 
                    className="text-gray-300 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 text-gray-500" />
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer - Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} ProcurityIQ. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-xs text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-xs text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-xs text-gray-400 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
