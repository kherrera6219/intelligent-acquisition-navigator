
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/universal/Container";
import { routes } from "@/routes";

export const Footer = () => {
  // Create distinct route groups
  const mainRoutes = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/pricing", label: "Pricing" },
    { path: "/about", label: "About" },
  ];

  const resourceRoutes = [
    { path: "/help", label: "Help Center" },
    { path: "/knowledge-base", label: "Knowledge Base" },
    { path: "/privacy", label: "Privacy Policy" },
    { path: "/contact", label: "Contact Support" },
  ];

  const appRoutes = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/acquisition/federal-acquisition", label: "Federal Acquisition" },
    { path: "/acquisition/texas-acquisition", label: "Texas Acquisition" },
    { path: "/sitemap", label: "Sitemap" },
  ];

  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900/50 backdrop-blur-md border-t border-gray-800 mt-auto py-8">
      <Container size="full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">ProcurityIQ</h3>
            <ul className="space-y-2">
              {mainRoutes.map((route, index) => (
                <li key={`main-${index}`}>
                  <Link 
                    to={route.path} 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceRoutes.map((route, index) => (
                <li key={`resource-${index}`}>
                  <Link 
                    to={route.path} 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Application</h3>
            <ul className="space-y-2">
              {appRoutes.map((route, index) => (
                <li key={`app-${index}`}>
                  <Link 
                    to={route.path} 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} ProcurityIQ. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://twitter.com/procurityiq" className="text-gray-500 hover:text-primary">
              Twitter
            </a>
            <a href="https://linkedin.com/company/procurityiq" className="text-gray-500 hover:text-primary">
              LinkedIn
            </a>
            <a href="https://github.com/procurityiq" className="text-gray-500 hover:text-primary">
              GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
