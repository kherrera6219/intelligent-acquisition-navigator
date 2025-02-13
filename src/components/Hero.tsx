
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
          Transform Acquisition Management with AI
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Harness the power of our 4D Knowledge Framework to streamline processes, ensure compliance, and make data-driven decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90">
            Request Demo
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
