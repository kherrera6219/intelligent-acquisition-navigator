
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { Wifi, WifiOff } from 'lucide-react';

interface HeaderProps {
  variant?: string;
  isScrolled?: boolean;
  isHomePage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  variant = 'default',
  isScrolled = false,
  isHomePage = false
}) => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isOnline } = useNetworkMonitor();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Apply conditional styling based on variant and scroll state
  const headerClasses = isScrolled 
    ? "bg-gray-900/95 border-b border-gray-800 backdrop-blur-sm shadow-md"
    : isHomePage && variant === 'default'
    ? "bg-transparent border-b border-gray-800/30"
    : "bg-gray-900/95 border-b border-gray-800 backdrop-blur-sm";

  return (
    <header className={`sticky top-0 z-50 ${headerClasses} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              ProcurityIQ
            </Link>
            
            {/* Status Indicator */}
            {!isOnline && (
              <div className="ml-3 flex items-center gap-1 text-yellow-400 text-xs py-0.5 px-2 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                <WifiOff className="h-3 w-3" />
                <span>Offline</span>
              </div>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/about" className="text-gray-200 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-gray-200 hover:text-white transition-colors">Contact</Link>
            <Link to="/pricing" className="text-gray-200 hover:text-white transition-colors">Pricing</Link>
            <Link to="/sitemap" className="text-gray-200 hover:text-white transition-colors">Sitemap</Link>
            <Link to="/knowledge-base" className="text-gray-200 hover:text-white transition-colors">Knowledge Base</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/home" className="text-gray-200 hover:text-white transition-colors">Home</Link>
                <Link to="/profile" className="text-gray-200 hover:text-white transition-colors">Profile</Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>Sign Out</Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')} variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/about" 
                className="text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/sitemap" 
                className="text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sitemap
              </Link>
              <Link 
                to="/knowledge-base" 
                className="text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Knowledge Base
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/home" 
                    className="text-gray-200 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-200 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="mt-2 border-gray-600 text-white hover:bg-gray-800"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => {
                    navigate('/auth');
                    setIsMenuOpen(false);
                  }} 
                  variant="default" 
                  size="sm"
                  className="mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
