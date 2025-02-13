
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Knowledge Graph Background */}
      <div 
        className="absolute inset-0 bg-[#0000001a]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='nodes' cx='50%25' cy='50%25' r='50%25' fx='50%25' fy='50%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFFFFF;stop-opacity:0.1'/%3E%3Cstop offset='100%25' style='stop-color:%23FFFFFF;stop-opacity:0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Canimate attributeName='opacity' values='0.5;1;0.5' dur='3s' repeatCount='indefinite'/%3E%3Cpath d='M0 0'%3E%3Canimate attributeName='d' dur='10s' repeatCount='indefinite' values='M0 0 L100 100;M50 50 L150 150;M0 0 L100 100'/%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center z-10">
        {/* Announcement Banner */}
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 
                      bg-gradient-to-r from-[#221F26]/80 to-[#333333]/80 
                      backdrop-blur-sm rounded-full border border-white/10 animate-fade-up">
          <Sparkles className="w-4 h-4 text-violet-400 mr-2" />
          <span className="text-sm text-violet-300 font-medium">
            Revolutionizing Federal Acquisition
          </span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up
                     bg-clip-text text-transparent bg-gradient-to-r 
                     from-violet-400 via-fuchsia-400 to-pink-400">
          Transform Acquisition Management with AI
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-up" 
           style={{ animationDelay: "0.2s" }}>
          Harness the power of our 4D Knowledge Framework to streamline processes, 
          ensure compliance, and make data-driven decisions.
        </p>
        
        {/* CTA Buttons */}
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
            className="bg-[#221F26]/40 backdrop-blur-sm border-white/10 
                     hover:bg-white/10 px-8 py-6 text-lg"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#221F26]/90 via-[#221F26]/50 to-transparent pointer-events-none" />
      
      {/* Animated Knowledge Graph Nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-violet-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
