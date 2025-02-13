
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 
                      bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 
                      backdrop-blur-sm rounded-full animate-fade-up">
          <Sparkles className="w-4 h-4 text-violet-400 mr-2" />
          <span className="text-sm text-violet-300 font-medium">
            Revolutionizing Federal Acquisition
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up
                     bg-clip-text text-transparent bg-gradient-to-r 
                     from-violet-400 via-fuchsia-400 to-pink-400">
          Transform Acquisition Management with AI
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-up" 
           style={{ animationDelay: "0.2s" }}>
          Harness the power of our 4D Knowledge Framework to streamline processes, 
          ensure compliance, and make data-driven decisions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" 
             style={{ animationDelay: "0.4s" }}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                     hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 
                     group px-8 py-6 text-lg shadow-lg shadow-violet-500/25"
          >
            Request Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-white/20 hover:bg-white/10 px-8 py-6 text-lg"
          >
            Learn More
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
