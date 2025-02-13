
import { useState } from 'react';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/5 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Procurity.AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="text-white/80 hover:text-white transition-colors">Benefits</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            <Button variant="default">Request Demo</Button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/80 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/5 backdrop-blur-md border-b border-white/10">
            <a href="#features" className="block px-3 py-2 text-white/80 hover:text-white">Features</a>
            <a href="#benefits" className="block px-3 py-2 text-white/80 hover:text-white">Benefits</a>
            <a href="#about" className="block px-3 py-2 text-white/80 hover:text-white">About</a>
            <Button variant="default" className="w-full mt-2">Request Demo</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
